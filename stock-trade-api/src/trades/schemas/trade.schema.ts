import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import moment from 'moment';
import { Document } from 'mongoose';
import { MAX_PRICE, MAX_SHARES, MIN_PRICE, MIN_SHARES, TradeType } from '../../common/constants';

export type TradeDocument = Trade & Document;

class User {
  @Prop()
  id: number;

  @Prop()
  name: string;
}

@Schema({ toJSON: { getters: true } })
export class Trade {
  @Prop({ unique: true })
  id: number;

  @Prop({ enum: TradeType })
  type: string;

  @Prop(User)
  user: User;

  @Prop()
  symbol: string;

  @Prop({ get: (date) => moment(date).format('yyyy-MM-DD HH:mm:ss') })
  timestamp: Date;

  @Prop({ min: MIN_SHARES, max: MAX_SHARES })
  shares: number;

  @Prop({ min: MIN_PRICE, max: MAX_PRICE })
  price: number;
}

export const TradeSchema = SchemaFactory.createForClass(Trade);
