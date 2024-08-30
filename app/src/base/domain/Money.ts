export interface MoneyInterface {
  /**
   * The amount of money in cents
   * @isint we would kindly ask you to provide a number here
   * @required true
   * @example 2000000
   */
  amount: number;

  /**
   * The currency of money
   * @required true
   * @example "USD"
   */
  currency: string;

  /**
   * The string representation of money
   * @required false
   * @example $20K
   */
  str?: string;

  plus: (other: Money) => Money;
  minus: (other: Money) => Money;
  equal: (other: Money) => boolean;
  lessThanOrEqual: (other: Money) => boolean;
  greater: (other: Money) => boolean;
  positive: () => boolean;
  negative: () => boolean;
  abs: () => Money;
  multiply: (multiple: number) => Money;
  divide: (multiple: number) => Money;
  nearestK: (rounded: number) => Money;
  round: () => Money;
  percent: (percent: number) => Money;
  asJSON: () => {
    amount: number;
    currency: string;
    str?: string;
  };
}

export class Money implements MoneyInterface {
  // ...
}

export const MONEY = (amount: number, currency: string): Money => new Money(amount, currency);
