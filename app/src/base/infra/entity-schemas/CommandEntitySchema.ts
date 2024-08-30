/* eslint-disable sonarjs/no-duplicate-string */
import { EntitySchema } from 'typeorm';

import { Command, CommandStatus } from '../../domain/models/Command.js';

const CommandEntitySchema = new EntitySchema<Command>({
  name: 'commands',
  tableName: 'commands',
  target: Command,
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    input: {
      type: 'jsonb',
      nullable: false,
      array: false,
      default: '{}',
      comment: "Command's input parameters",
    },
    error: {
      type: 'varchar',
      nullable: true,
      array: false,
      comment: "Command's error",
    },
    name: {
      type: 'varchar',
      nullable: false,
      array: false,
      comment: "Command's name",
    },
    initiator: {
      type: 'jsonb',
      nullable: true,
      array: false,
      comment: 'Initiator executing the command',
    },
    status: {
      type: 'varchar',
      nullable: true,
      array: false,
      comment: 'The status of the command',
      enum: CommandStatus,
    },
    startedAt: {
      type: 'timestamp with time zone',
      nullable: true,
      array: false,
      comment: 'When the command has started',
    },
    completedAt: {
      type: 'timestamp with time zone',
      nullable: true,
      array: false,
      comment: 'When the command has completed',
    },
    failedAt: {
      type: 'timestamp with time zone',
      nullable: true,
      array: false,
      comment: 'When the command has failed',
    },
  },
  indices: [],
});

export default CommandEntitySchema;
