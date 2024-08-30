import { MONEY, type Money } from '../Money.js';
import { type ValidationArguments, ValidatorConstraint, type ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'positiveMoney', async: false })
export class PositiveMoney implements ValidatorConstraintInterface {
  validate(amount?: Money): boolean {
    return MONEY(amount?.amount ?? 0, amount?.currency).positive();
  }

  defaultMessage(args: ValidationArguments): string {
    return `amount ${args?.value} should be positive`;
  }
}
