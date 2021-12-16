import { Controller, Get, Param, Query } from '@nestjs/common';
import { PeriodQueryDto } from './dto/period-query.dto';
import { StocksService } from './stocks.service';

@Controller()
export class StocksController {
  constructor(private readonly stocksService: StocksService) {}

  @Get('/stocks/:stockSymbol/price')
  getStockPrices(@Query() periodQueryDto: PeriodQueryDto, @Param('stockSymbol') stockSymbol: string) {
    return this.stocksService.getStockPrices(periodQueryDto, stockSymbol);
  }

  @Get('/stocks/stats')
  getStocksStats(@Query() periodQueryDto: PeriodQueryDto) {
    return this.stocksService.getStocksStats(periodQueryDto);
  }
}
