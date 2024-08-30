import dayjs, { type Dayjs } from 'dayjs';

import { type Initiator } from './Initiator.js';

export enum CommandStatus {
  Started = 'STARTED',
  Completed = 'COMPLETED',
  Failed = 'FAILED',
}

export abstract class Command {
  /**
   * Command's identifier
   */
  id: number;

  /**
   * Command's input parameters
   */
  input: object;

  /**
   * Command's error
   */
  error?: string;

  /**
   * Command's name
   */
  name: string;

  /**
   * Initiator executing the command
   */
  initiator?: Initiator;

  /**
   * Comand's status
   */
  status?: CommandStatus;

  /**
   * When the command starts the execution
   */
  startedAt?: Dayjs;

  /**
   * When the command completes the execution
   */
  completedAt?: Dayjs;

  /**
   * When the command fails the execution
   */
  failedAt?: Dayjs;

  /**
   * Command's output parameters
   */
  output: any;

  constructor() {
    this.name = this.constructor.name;
  }

  public abstract execute(): Promise<Command>;

  public start(initiator?: Initiator): this {
    this.initiator = initiator;
    this.status = CommandStatus.Started;
    this.startedAt = dayjs();

    return this;
  }

  public complete(): this {
    this.status = CommandStatus.Completed;
    this.completedAt = dayjs();

    return this;
  }

  public fail(error: unknown): this {
    this.status = CommandStatus.Failed;
    this.error = String(error);
    this.failedAt = dayjs();

    return this;
  }
}
