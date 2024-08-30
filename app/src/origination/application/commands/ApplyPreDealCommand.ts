import { type UUID } from 'uuid';

import { iocContainer } from '../../../ioc.js';
import { Command } from '../../../base/domain/models/Command.js';

import { PreApplication } from '../../domain/models/PreApplication.js';
import { type PreApplicationRepositoryInterface } from '../../domain/repositories/PreApplicationRepositoryInterface.js';
import { type PreDealRepositoryInterface } from '../../domain/repositories/PreDealRepositoryInterface.js';

interface Input {
  userId: UUID;
  preDealId: UUID;
}

export class ApplyPreDealCommand extends Command {
  constructor(
    private readonly preDealRepository: PreDealRepositoryInterface,
    private readonly preApplicationRepository: PreApplicationRepositoryInterface,
    public input: Input,
  ) {
    super();
  }

  static build(input: Input): ApplyPreDealCommand {
    return new ApplyPreDealCommand(
      iocContainer.resolve('PreDealRepository'),
      iocContainer.resolve('PreApplicationRepository'),
      input,
    );
  }

  async execute(): Promise<Command> {
    const { userId, preDealId } = this.input;

    const existingPreApplication = await this.preApplicationRepository.findOne({
      where: {
        userId,
        preDeal: {
          id: preDealId,
        },
      },
      relations: ['preDeal'],
    });

    if (existingPreApplication !== null) {
      this.output = existingPreApplication;

      return this;
    }

    const preDeal = await this.preDealRepository.findOneOrFail(preDealId);

    this.output = await this.preApplicationRepository.save(
      PreApplication.build({
        userId,
        preDeal,
      }),
    );

    return this;
  }
}
