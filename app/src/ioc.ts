import { container } from 'tsyringe';

import config, { Config } from './config.js';

import './src/base/infra/dic.js';
import './src/origination/infra/dic.js';

container.register<Config>(Config, { useValue: config });

export const iocContainer = container;
