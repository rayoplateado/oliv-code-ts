import { beforeEach, describe, it, expect } from 'mocha';

import { ApplyPreDealCommand } from '../../../../src/origination/application/commands/ApplyPreDealCommand.js';
import { PreDealStatus } from '../../../../src/origination/domain/models/PreDeal.js';
import { PreApplicationRepository } from '../../../../src/origination/domain/repositories/PreApplicationRepository.js';

import { iocContainer } from '../../../../src/ioc.js';
import { createBusinessType, createPreDeal, createUser } from '../../../fixtures.js';

describe('ApplyPreDealCommand', () => {
  let preDeal: any;
  let user: any;

  beforeEach(async () => {
    const businessType = await createBusinessType();

    preDeal = await createPreDeal({
      businessType,
      status: PreDealStatus.inbox,
    });

    user = await createUser();
  });

  describe('execute', () => {
    it('should create a loan and a new pre application', async () => {
      const preDealId = preDeal.id;
      const userId = user.id;

      await ApplyPreDealCommand.build({ preDealId, userId }).execute();

      const preApplicationRepository = iocContainer.resolve(PreApplicationRepository);
      const preApplication = await preApplicationRepository.findOne({
        where: {
          userId,
          preDeal: {
            id: preDealId,
          },
        },
      });

      expect(preApplication).to.be.ok;
    });
  });
});
