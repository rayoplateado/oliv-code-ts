import { type UUID } from 'uuid';
import { IsDefined, Validate } from 'class-validator';

import { type Money } from '../../../base/domain/Money.js';
import { PositiveMoney } from '../../../base/domain/validations/PositiveMoney.js';
import { Model } from '../../../base/domain/models/Model.js';
import { BusinessType } from './BusinessType.js';

export enum PreDealStatus {
  inbox = 'inbox',
  sent = 'sent',
  discarded = 'discarded',
}

export class PreDeal extends Model {
  id: UUID;
  createdAt: Date;
  updatedAt: Date;

  @IsDefined()
  title: string;

  @IsDefined()
  status: PreDealStatus;

  @IsDefined()
  askingPrice: Money;

  @Validate(PositiveMoney)
  ttmRevenue?: Money;

  @Validate(PositiveMoney)
  ttmProfit?: Money;

  @Validate(PositiveMoney)
  lastMonthRevenue?: Money;

  @Validate(PositiveMoney)
  lastMonthProfit?: Money;

  businessModel?: string;

  location?: string;

  activeCustomersNumber?: number;

  yearFunded?: number;

  description?: string;

  url?: string;

  // Relationships
  @IsDefined()
  businessType: BusinessType;
}
