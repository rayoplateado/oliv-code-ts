import { IsDefined } from 'class-validator';
import { type UUID } from 'uuid';

export class BusinessType {
  id: UUID;

  createdAt: Date;

  updatedAt: Date;

  @IsDefined()
  name: string;

  static build(props: { name: string }): BusinessType {
    const businessType = new BusinessType();

    businessType.name = props.name;

    return businessType;
  }
}
