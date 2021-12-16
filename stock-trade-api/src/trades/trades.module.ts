import { Module } from '@nestjs/common';
import { TradesService } from './trades.service';
import { TradesController } from './trades.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Trade, TradeSchema } from './schemas/trade.schema';
import { IsTradeExist } from './decorators/is-trade-exists.decorator';

@Module({
  imports: [MongooseModule.forFeature([{ name: Trade.name, schema: TradeSchema }])],
  controllers: [TradesController],
  providers: [IsTradeExist, TradesService],
  exports: [MongooseModule],
})
export class TradesModule {}
