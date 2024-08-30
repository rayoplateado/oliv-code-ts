import { UUID } from 'uuid';

export interface FindOptions {
  preload?: string[];
}

export interface FindManyOptions extends FindOptions {
  page?: number;
  limit?: number;
}

export interface PaginatedList<T> {
  docs: T[];
  hasPrevPage: boolean;
  hasNextPage: boolean;
  page: number;
  nextPage?: number;
  prevPage?: number;
  limit: number;
  totalDocs: number;
}

export class EntityNotFoundError extends Error {
  private readonly entity: any;
  private readonly id: UUID | number;

  constructor(entity: any, id: UUID | number) {
    super(`Entity ${entity.name} with id ${id} not found`);

    this.entity = entity;
    this.id = id;
  }
}

export interface RepositoryInterface<T> {
  // Read
  requiredPreload: () => string[];
  findOne: (id: UUID | number, options?: FindOptions) => Promise<T | undefined>;
  findOneOrFail: (id: UUID | number, options?: FindOptions) => Promise<T>;

  // Write
  save: (entity: T) => Promise<T>;
}
