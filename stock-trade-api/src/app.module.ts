import { Module } from '@nestjs/common';
import { TradesModule } from './trades/trades.module';
import { StocksModule } from './stocks/stocks.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `.env.${process.env.NODE_ENV}` }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    TradesModule,
    StocksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
