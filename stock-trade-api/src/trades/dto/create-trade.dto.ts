import { Type } from 'class-transformer';
import { IsNumber, IsString, IsDate, IsEnum, ValidateNested, Min, Max, Validate } from 'class-validator';
import { MAX_PRICE, MAX_SHARES, MIN_PRICE, MIN_SHARES, TradeType } from '../../common/constants';
import { IsTradeExist } from '../decorators/is-trade-exists.decorator';

class User {
  @IsNumber()
  id: number;

  @IsString()
  name: string;
}

export class CreateTradeDto {
  @IsNumber()
  @Validate(IsTradeExist, {
    message: 'Trade with the same id already exists.',
  })
  id: number;

  @IsEnum(TradeType)
  type: string;

  @Type(() => User)
  @ValidateNested()
  user: User;

  @IsString()
  symbol: string;

  @IsNumber()
  @Min(MIN_SHARES)
  @Max(MAX_SHARES)
  shares: number;

  @IsNumber()
  @Min(MIN_PRICE)
  @Max(MAX_PRICE)
  price: number;

  @Type(() => Date)
  @IsDate()
  timestamp: Date;
}
