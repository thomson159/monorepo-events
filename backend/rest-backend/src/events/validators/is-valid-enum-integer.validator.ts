import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'IsValidEnumInteger', async: false })
export class IsValidEnumIntegerConstraint implements ValidatorConstraintInterface {
  validate(value: unknown, args?: ValidationArguments): boolean {
    if (!args) return false;
    const enumObj = args.constraints[0] as object;
    if (typeof value !== 'string' && typeof value !== 'number') return false;
    const num = Number(value);
    return Number.isInteger(num) && Object.values(enumObj).includes(num);
  }

  defaultMessage(): string {
    return 'Value must be an integer from enum';
  }
}
