import { IsDefined } from 'class-validator';
import { type UUID } from 'uuid';

import { PreDeal } from './PreDeal.js';
import { Model } from '../../../base/domain/models/Model.js';

export class PreApplication extends Model {
  id: UUID;
  createdAt: Date;
  updatedAt: Date;

  @IsDefined()
  userId: UUID;

  // Relationships
  @IsDefined()
  preDeal: PreDeal;
}
