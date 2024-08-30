import { faker } from '@faker-js/faker';

import { User } from '../src/users/domain/models/User.js';
import { MONEY } from '../src/base/domain/Money.js';
import { iocContainer } from '../src/ioc.js';
import { BusinessType } from '../src/origination/domain/models/BusinessType.js';
import { PreDeal, PreDealStatus } from '../src/origination/domain/models/PreDeal.js';

export function newUser(attrs = {}) {
  const defaultAttr = {
    name: faker.lorem.words(1),
  };

  return User.build({ ...defaultAttr, ...attrs });
}

export function createUser(attrs = {}) {
  return iocContainer.resolve('UserRepository').save(newUser(attrs));
}

export function newBusinessType(attrs = {}) {
  const defaultAttr = {
    name: faker.lorem.words(1),
  };

  return BusinessType.build({ ...defaultAttr, ...attrs });
}

export function createBusinessType(attrs = {}) {
  return iocContainer.resolve('BusinessTypeRepository').save(newBusinessType(attrs));
}

export function newPreDeal(attrs = {}) {
  const defaultAttr = {
    title: faker.lorem.words(3),
    status: PreDealStatus.inbox,
    askingPrice: MONEY(100_000_00),
    businessType: newBusinessType(),
    ttmRevenue: MONEY(200_000_00),
    ttmProfit: MONEY(100_000_00),
    lastMonthRevenue: MONEY(12_000_00),
    lastMonthProfit: MONEY(2_000_00),
    businessModel: faker.lorem.words(1),
    location: faker.lorem.words(1),
    activeCustomersNumber: faker.datatype.number(100),
    yearFunded: 2024,
    description: faker.lorem.words(10),
    url: faker.internet.url(),
  };

  return PreDeal.build({ ...defaultAttr, ...attrs });
}

export function createPreDeal(attrs = {}) {
  return iocContainer.resolve('PreDealRepository').save(newPreDeal(attrs));
}
