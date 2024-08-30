import { EntitySchema } from 'typeorm';

import { PreApplication } from '../../domain/models/PreApplication.js';

const PreApplicationSchema = new EntitySchema<PreApplication>({
  name: 'pre_applications',
  tableName: 'pre_applications',
  target: PreApplication,
  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generated: 'uuid',
    },
    createdAt: {
      name: 'createdAt',
      type: 'timestamp with time zone',
      createDate: true,
    },
    updatedAt: {
      name: 'updatedAt',
      type: 'timestamp with time zone',
      updateDate: true,
    },
    userId: {
      type: 'uuid',
      nullable: false,
    },
  },
  relations: {
    preDeal: {
      target: 'pre_deals',
      type: 'one-to-one',
      joinColumn: true,
      cascade: true,
    },
  },
  indices: [],
});

export default PreApplicationSchema;
