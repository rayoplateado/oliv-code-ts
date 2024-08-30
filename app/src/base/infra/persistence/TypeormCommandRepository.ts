import { TypeormRepository } from './TypeormRepository.js';
import { CommandRepositoryInterface } from '../../domain/repositories/CommandRepositoryInterface.js';
import { Command } from '../../domain/models/Command.js';

export class TypeormCommandRepository extends TypeormRepository<Command> implements CommandRepositoryInterface {
}
