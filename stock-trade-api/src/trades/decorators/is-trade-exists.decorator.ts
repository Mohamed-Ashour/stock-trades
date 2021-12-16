import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { TradesService } from '../trades.service';

@ValidatorConstraint({ name: 'IsTradeExist', async: true })
@Injectable()
export class IsTradeExist implements ValidatorConstraintInterface {
  constructor(private readonly tradesService: TradesService) {}

  validate(id: any, args: ValidationArguments) {
    return this.tradesService.findByTradeId(id).then((trade) => {
      if (trade) return false;
      return true;
    });
  }
}
