import { container } from 'tsyringe';

import MainDBDataSource from '../../data-source/MainDBDataSource.js';
import { CommandHandler } from '../domain/CommandHandler.js';
import { TypeormCommandRepository } from './persistence/TypeormCommandRepository.js';
import { Command } from '../domain/models/Command.js';

container
  .register<'CommandRepository'>(TypeormCommandRepository, {
    useFactory: (c) => new TypeormCommandRepository(c.resolve(MainDBDataSource), Command),
  })
  .register<'CommandHandler'>(CommandHandler, {
    useFactory: (c) => new CommandHandler(c.resolve('CommandRepository')),
  });
