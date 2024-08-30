import { type PreDeal, type PreDealStatus } from '../models/PreDeal.js';
import { type FindManyOptions, type PaginatedList, type RepositoryInterface } from '../../../base/domain/repositories/RepositoryInterface.js';

export interface CountByStatus {
  [PreDealStatus.inbox]?: number;
  [PreDealStatus.sent]?: number;
  [PreDealStatus.discarded]?: number;
}

export interface PreDealSearchParams {
  status?: PreDealStatus;
}

export interface PreDealRepositoryInterface extends RepositoryInterface<PreDeal> {
  // Read
  countByStatus: () => Promise<CountByStatus>;
  search: (params: PreDealSearchParams, options?: FindManyOptions) => Promise<PaginatedList<PreDeal>>;
}
