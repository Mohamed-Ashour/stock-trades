import { Transform } from 'class-transformer';
import { IsDate } from 'class-validator';
import moment from 'moment';

export class PeriodQueryDto {
  @Transform(({ value }) => moment(value).toDate())
  @IsDate()
  start: Date;

  @Transform(({ value }) => moment(value).endOf('day').toDate())
  @IsDate()
  end: Date;
}
