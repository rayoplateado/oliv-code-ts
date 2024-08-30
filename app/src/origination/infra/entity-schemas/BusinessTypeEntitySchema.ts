import { EntitySchema } from 'typeorm';

import { BusinessType } from '../../domain/models/BusinessType.js';

const BusinessTypeSchema = new EntitySchema<BusinessType>({
  name: 'business_types',
  tableName: 'business_types',
  target: BusinessType,
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
    name: {
      type: 'text',
      nullable: false,
      comment: "Business type's name",
    },
  },
  indices: [],
});

export default BusinessTypeSchema;
