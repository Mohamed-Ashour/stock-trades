import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateTradeDto } from './dto/create-trade.dto';
import { TradesService } from './trades.service';

@Controller()
export class TradesController {
  constructor(private readonly tradesService: TradesService) {}

  @Post('/trades')
  create(@Body() createTradeDto: CreateTradeDto) {
    return this.tradesService.create(createTradeDto);
  }

  @Get('/trades')
  findAll() {
    return this.tradesService.findAll();
  }

  @Get('/trades/users/:userId')
  findByUser(@Param('userId') userId: number) {
    return this.tradesService.findByUser(userId);
  }

  @Delete('/erase')
  removeAll() {
    return this.tradesService.removeAll();
  }
}
