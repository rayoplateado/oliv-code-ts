
import { type PreDeal, type PreDealStatus } from '../../domain/models/PreDeal.js';
import {
  type CountByStatus,
  type PreDealRepositoryInterface,
  type PreDealSearchParams,
} from '../../domain/repositories/PreDealRepositoryInterface.js';
import { type FindManyOptions, type PaginatedList } from '../../../base/domain/repositories/RepositoryInterface.js';
import { TypeormRepository } from '../../../base/infra/persistence/TypeormRepository.js';

export class TypeormPreDealRepository extends TypeormRepository<PreDeal> implements PreDealRepositoryInterface {
  requiredPreload(): string[] {
    return ['businessType', 'broker', 'preTermSheet'];
  }

  /**
   * Retrieves the count of pre-deals grouped by their status.
   * @returns {Promise<CountByStatus>} A promise that resolves to an object containing the count of pre-deals for each status.
   */
  async countByStatus(): Promise<CountByStatus> {
    const result: CountByStatus = {};

    const raw: Array<{ status: PreDealStatus; count: number }> = await this.repository
      .createQueryBuilder('preDeal')
      .select('preDeal.status as status, COUNT(preDeal.id) as count')
      .groupBy('preDeal.status')
      .getRawMany();

    raw.forEach(({ status, count }) => (result[status] = Number(count)));

    return result;
  }

  /**
   * Searches for entities based on the provided parameters and options.
   * @param {PreDealSearchParams} params - The search parameters.
   * @param {FindManyOptions} [options] - The find options.
   * @returns {Promise<PaginatedList<PreDeal>>} A promise that resolves to a paginated list of entities.
   */
  async search(params: PreDealSearchParams, options?: FindManyOptions): Promise<PaginatedList<PreDeal>> {
    const queryBuilder = this.repository.createQueryBuilder(`preDeal`);

    // Filter
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) queryBuilder.where(`preDeal.${key} = :${key}`, { [key]: value });
    });

    // Preload
    const preloads = this.requiredPreload().concat(options?.preload ?? []);
    preloads.forEach((relation) => queryBuilder.leftJoinAndSelect(`preDeal.${relation}`, `${relation}`));

    // Order
    queryBuilder.orderBy(`preDeal.createdAt`, 'DESC');

    // Paginate
    return await this.paginate(queryBuilder, options);
  }
}
