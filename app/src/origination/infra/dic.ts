import { container } from 'tsyringe';

import MainDBDataSource from '../../data-source/MainDBDataSource.js';
import { PreApplication } from '../domain/models/PreApplication.js';
import { PreDeal } from '../domain/models/PreDeal.js';
import { BusinessType } from '../domain/models/BusinessType.js';

import { type PreDealRepositoryInterface } from '../domain/repositories/PreDealRepositoryInterface.js';
import { TypeormPreDealRepository } from './persistence/TypeormPreDealRepository.js';

container
  .register('PreDealRepository', {
    useFactory: (c): PreDealRepositoryInterface => new TypeormPreDealRepository(c.resolve(MainDBDataSource), PreDeal),
  })
  .register('BusinessTypeRepository', {
    useFactory: (c): BusinessTypeRepositoryInterface => new TypeormBusinessRepository(c.resolve(MainDBDataSource), BusinessType),
  })
  .register('PreApplicationRepository', {
    useFactory: (c): PreApplicationRepositoryInterface => new TypeormPreApplicationRepository(c.resolve(MainDBDataSource), PreApplication),
  });
