import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TRADE_EXPOSED_FIELDS } from '../common/constants';
import { CreateTradeDto } from './dto/create-trade.dto';
import { Trade, TradeDocument } from './schemas/trade.schema';

@Injectable()
export class TradesService {
  constructor(@InjectModel(Trade.name) private tradeModel: Model<TradeDocument>) {}

  create(createTradeDto: CreateTradeDto): Promise<Trade> {
    return this.tradeModel.create(createTradeDto);
  }

  findAll(): Promise<Trade[]> {
    return this.tradeModel.find({}, TRADE_EXPOSED_FIELDS, { sort: { id: 1 } }).exec();
  }

  async findByUser(userId: number): Promise<Trade[]> {
    const results = await this.tradeModel
      .find({ 'user.id': userId }, TRADE_EXPOSED_FIELDS, { sort: { id: 1 } })
      .exec();

    if (!results.length) throw new NotFoundException('User is not found');

    return results;
  }

  findByTradeId(tradeId: number): Promise<Trade> {
    return this.tradeModel.findOne({ id: tradeId }).exec();
  }

  removeAll() {
    return this.tradeModel.deleteMany({});
  }
}
