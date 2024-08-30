import {
  type DataSource,
  type EntityTarget,
  type ObjectLiteral,
  type Repository,
  type SelectQueryBuilder,
} from 'typeorm';
import { type UUID } from 'uuid';

import {
  EntityNotFoundError,
  type FindManyOptions,
  type FindOptions,
  type PaginatedList,
  type RepositoryInterface,
} from '../../domain/repositories/RepositoryInterface.js';

const HARD_PAGINATION_LIMIT = 200;
const DEFAULT_PAGINATION_OPTIONS = {
  limit: 50,
  page: 1,
};

export abstract class TypeormRepository<T extends ObjectLiteral> implements RepositoryInterface<T> {
  protected readonly repository: Repository<T>;
  protected readonly entityTarget: EntityTarget<T>;

  constructor(dataSource: DataSource, entityTarget: EntityTarget<T>) {
    this.entityTarget = entityTarget;
    this.repository = dataSource.getRepository(entityTarget);
  }

  requiredPreload(): string[] {
    return [];
  }

  /**
   * Finds a single entity by its ID.
   *
   * @param {UUID | number} id - The ID of the entity to find.
   * @param {FindOptions} [options] - Additional options for the find operation.
   * @returns {Promise<T | undefined>} A promise that resolves to the found entity, or `undefined` if no entity is found.
   */
  async findOne(id: UUID | number, options?: FindOptions): Promise<T | undefined> {
    const entity = await this.repository.findOne({
      where: { id: id as any },
      relations: this.requiredPreload().concat(options?.preload ?? []),
    });

    return entity ?? undefined;
  }

  /**
   * Finds a single entity by its ID and throws an error if not found.
   *
   * @param {UUID | number} id - The ID of the entity to find.
   * @param {FindOptions} [options] - Additional options for finding the entity.
   * @returns {Promise<T>} A promise that resolves to the found entity.
   * @throws EntityNotFoundError if the entity is not found.
   */
  async findOneOrFail(id: UUID | number, options?: FindOptions): Promise<T> {
    const relations = this.requiredPreload().concat(options?.preload ?? []);

    const entity = await this.repository.findOne({
      where: { id: id as any },
      relations,
    });

    if (entity === null) {
      throw new EntityNotFoundError(this.entityTarget, id);
    }

    return entity;
  }

  /**
   * Saves the given entity.
   *
   * @param {T} entity - The entity to be saved.
   * @returns {Promise<T>} A promise that resolves to the saved entity.
   */
  async save(entity: T): Promise<T> {
    if (typeof (entity as any).validate === 'function') {
      (entity as any).validate();
    }

    return await this.repository.save(entity);
  }

  /**
   * Paginates the query result based on the provided options.
   *
   * @param {SelectQueryBuilder} query - The query builder object.
   * @param {FindManyOptions} [options] - The options for pagination.
   * @returns {Promise<PaginatedList<T>>} A promise that resolves to a `PaginatedList` object containing the paginated results.
   */
  protected async paginate(query: SelectQueryBuilder<T>, options?: FindManyOptions): Promise<PaginatedList<T>> {
    let { page = DEFAULT_PAGINATION_OPTIONS.page, limit = DEFAULT_PAGINATION_OPTIONS.limit } = options ?? {};

    page = Math.max(Math.abs(page), DEFAULT_PAGINATION_OPTIONS.page);
    limit = Math.min(Math.abs(limit), HARD_PAGINATION_LIMIT);

    const offset = (page - 1) * limit;
    const [docs, totalDocs] = await query.take(limit).skip(offset).getManyAndCount();

    const hasNextPage = page * limit < totalDocs;
    const hasPrevPage = page > 1;

    return {
      page,
      limit,
      docs,
      totalDocs,
      hasNextPage,
      hasPrevPage,
      ...(hasPrevPage && { prevPage: page - 1 }),
      ...(hasNextPage && { nextPage: page + 1 }),
    };
  }
}
