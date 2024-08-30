import { MoneyTransformer } from '../../../base/infra/persistence/MoneyTransformer.js';
import { EntitySchema } from 'typeorm';

import { PreDeal } from '../../domain/models/PreDeal.js';

const PreDealSchema = new EntitySchema<PreDeal>({
  name: 'pre_deals',
  tableName: 'pre_deals',
  target: PreDeal,
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
    title: {
      type: 'text',
      nullable: false,
      comment: 'Pre deal title',
    },
    status: {
      type: 'text',
      nullable: false,
      comment: 'Pre deal status',
    },
    askingPrice: {
      type: 'text',
      nullable: false,
      transformer: MoneyTransformer,
      comment: 'Asking price',
    },
    ttmRevenue: {
      type: 'text',
      nullable: true,
      transformer: MoneyTransformer,
      comment: 'TTM revenue',
    },
    ttmProfit: {
      type: 'text',
      nullable: true,
      transformer: MoneyTransformer,
      comment: 'TTM profit',
    },
    lastMonthRevenue: {
      type: 'text',
      nullable: true,
      transformer: MoneyTransformer,
      comment: 'Last month revenue',
    },
    lastMonthProfit: {
      type: 'text',
      nullable: true,
      transformer: MoneyTransformer,
      comment: 'Last month profit',
    },
    businessModel: {
      type: 'text',
      nullable: true,
      comment: 'Business model',
    },
    location: {
      type: 'text',
      nullable: true,
      comment: 'Location',
    },
    activeCustomersNumber: {
      type: 'int',
      nullable: true,
      comment: 'Active customers number',
    },
    yearFunded: {
      type: 'int',
      nullable: true,
      comment: 'Year funded',
    },
    description: {
      type: 'text',
      nullable: true,
      comment: 'Description',
    },
    url: {
      type: 'text',
      nullable: true,
      comment: 'URL of the deal',
    },
  },
  relations: {
    businessType: {
      type: 'many-to-one',
      target: 'business_types',
      joinColumn: { name: 'business_type_id' },
      nullable: false,
    },
    broker: {
      type: 'many-to-one',
      target: 'brokers',
      joinColumn: { name: 'broker_id' },
      nullable: true,
    },
    preTermSheet: {
      type: 'one-to-one',
      target: 'pre_term_sheets',
      joinColumn: { name: 'pre_term_sheet_id' },
      nullable: true,
      cascade: true,
      onDelete: 'CASCADE',
      orphanedRowAction: 'delete',
    },
  },
  indices: [],
});

export default PreDealSchema;
