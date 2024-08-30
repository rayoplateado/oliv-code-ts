import { type Command } from './models/Command.js';
import { type CommandRepositoryInterface } from './repositories/CommandRepositoryInterface.js';
import { type Initiator } from './models/Initiator.js';

export class CommandHandler {
  /**
   * Command handler constructor
   * @param {CommandRepositoryInterface} commandRepository - Command repository
   * @returns {void}
   */
  constructor(private readonly commandRepository: CommandRepositoryInterface) {
    // noop
  }

  /**
   * Save command
   * @param {Command} command - Command to save in the repository
   * @returns {Promise<void>} Promise that resolves when the command is saved
   * @private
   */
  private async saveCommand(command: Command): Promise<void> {
    await this.commandRepository.save(command);
  }

  /**
   * Handle command
   * @param {Command} command - Command to handle
   * @param {Initiator} [initiator] - Initiator executing the command
   * @returns {Promise<Command>} Promise that resolves to the  handled command
   * @public
   * @async
   * @throws {Error} If the command fails
   */
  public async handle(command: Command, initiator?: Initiator): Promise<Command> {
    command.start(initiator);
    await this.saveCommand(command);

    try {
      await command.execute();
    } catch (error: unknown) {
      command.fail(error);
      await this.saveCommand(command);

      throw error;
    }

    command.complete();
    await this.saveCommand(command);

    return command;
  }
}
