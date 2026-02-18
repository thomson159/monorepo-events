import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { GetEventsDto } from '../dto/get-events.dto';

@ValidatorConstraint({ name: 'DateRangeConstraint', async: false })
export class DateRangeConstraint implements ValidatorConstraintInterface {
  validate(_value: unknown, args: ValidationArguments): boolean {
    const obj = args.object as GetEventsDto;
    if (!obj.fromDate || !obj.toDate) return true;

    const from = Date.parse(obj.fromDate);
    const to = Date.parse(obj.toDate);

    if (Number.isNaN(from) || Number.isNaN(to)) return false;

    return from <= to;
  }

  defaultMessage(): string {
    return 'fromDate must be before or equal to toDate';
  }
}
