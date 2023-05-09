import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { CompanyAttachment } from 'src/company-attachment/models/company-attachment';

@Table({tableName:'companies'})
export class Company extends Model {

  @Column
  name: string;

  @Column
  location: string;

  @Column
  Industry: string;

  @Column
  logo: string;
  @Column
  masterUser: string;

  @Column
  masterUserEmail: string;
  @Column
  masterUserContact: string;

  @Column
  description: string;
  @Column
  date: string;

  @Column
  gstNumber: string;
  @Column
  address: string;

  @Column
  city: string;

  @Column
  country: string;

  @Column
  adminPrimaryEmail: string;
  @Column
  adminSecondaryEmail: string;

  @Column
  adminFirstName: string;

  @Column
  adminLastName: string;
  @Column
  adminPrimaryContact: string;

  @Column
  adminAlternateContact: string;

  @Column({ defaultValue: true })
  isActive: boolean;

  @Column
  status: string;

  @Column
  totalEmployees: string;

  @Column
  totalEquipments: string;

  @Column
  state: string;

  @Column
  cinNumber: string;

  @Column
  address2: string;

  @Column
  pinCode: string;

  @Column
  comment: string;

  @Column
  isArchived: string;

  @HasMany(() => CompanyAttachment, 'companyId')
  attachments: CompanyAttachment[]
}
