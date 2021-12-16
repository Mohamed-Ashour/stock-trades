import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NO_TRADES_RESPONSE } from '../common/constants';
import { Trade, TradeDocument } from '../trades/schemas/trade.schema';
import { PeriodQueryDto } from './dto/period-query.dto';

@Injectable()
export class StocksService {
  constructor(@InjectModel(Trade.name) private tradeModel: Model<TradeDocument>) {}

  async getStockPrices(period: PeriodQueryDto, stockSymbol: string) {
    const tradesCount = await this.tradeModel.count({ symbol: stockSymbol });
    if (tradesCount === 0) throw new NotFoundException('Stock is not found');

    const [aggregationResult] = await this.tradeModel.aggregate([
      {
        $match: {
          symbol: stockSymbol,
          timestamp: { $gte: period.start, $lte: period.end },
        },
      },
      {
        $group: {
          _id: { symbol: '$symbol' },
          highest: { $max: '$price' },
          lowest: { $min: '$price' },
        },
      },
      {
        $project: {
          _id: 0,
          symbol: '$_id.symbol',
          highest: 1,
          lowest: 1,
        },
      },
    ]);

    return aggregationResult || NO_TRADES_RESPONSE;
  }

  async getStocksStats(period: PeriodQueryDto) {
    const aggregationResults = await this.tradeModel.aggregate([
      {
        $sort: { timestamp: 1 },
      },
      {
        $group: {
          _id: { symbol: '$symbol' },
          prices: {
            $push: {
              $cond: {
                if: {
                  $and: [
                    { $gte: ['$timestamp', period.start] },
                    { $lte: ['$timestamp', period.end] },
                  ],
                },
                then: '$price',
                else: '$$REMOVE',
              },
            },
          },
        },
      },
      {
        $sort: { _id: 1 },
      },
      {
        $project: {
          symbol: '$_id.symbol',
          prices: 1,
        },
      },
    ]);

    const results = aggregationResults.map(({ symbol, prices }) => {
      if (!prices.length) return { symbol, ...NO_TRADES_RESPONSE };

      let fluctuations = prices.reduce(this.fluctuationsReducer.bind(this), 0);
      let maxRise = prices.reduce(this.maxRiseReducer, 0);
      let maxFall = prices.reduce(this.maxFallReducer, 0);

      return {
        symbol,
        fluctuations,
        max_rise: parseFloat(maxRise.toFixed(2)),
        max_fall: parseFloat(maxFall.toFixed(2)),
      };
    });

    return results;
  }

  private fluctuationsReducer(
    fluctuations: number,
    price: number,
    index: number,
    prices: number[],
  ) {
    const nextPrice = this.getNextUnique(prices, index);
    const prevPrice = prices[index - 1];

    if (
      nextPrice &&
      prevPrice &&
      ((price < prevPrice && price < nextPrice) || (price > prevPrice && price > nextPrice))
    ) {
      return fluctuations + 1;
    }

    return fluctuations;
  }

  private getNextUnique(array: number[], index: number) {
    const current = array[index];

    for (const item of array.slice(index + 1)) {
      if (item !== current) return item;
    }

    return null;
  }

  private maxRiseReducer(maxRise: number, price: number, index: number, prices: number[]) {
    const prevPrice = prices[index - 1];

    if (prevPrice && price > prevPrice) {
      const raise = price - prevPrice;
      return Math.max(raise, maxRise);
    }

    return maxRise;
  }

  private maxFallReducer(maxFall: number, price: number, index: number, prices: number[]) {
    const prevPrice = prices[index - 1];

    if (prevPrice && price < prevPrice) {
      const fall = prevPrice - price;
      return Math.max(fall, maxFall);
    }

    return maxFall;
  }
}
