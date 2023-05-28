import { Column, Table, Model, HasMany, BelongsTo } from 'sequelize-typescript';
import { Company } from 'src/company/models/company.model';
import { SupportAttachment } from 'src/support-attachment/models/support-attachment';

@Table({ tableName: 'support' })
export class Support extends Model {

  @Column
  title: string;

  @Column
  description: string;

  @Column
  status: string;

  @Column
  contactNumber: string;

  @Column
  contactName: string;

  @Column
  contactEmail: string;

  @Column
  companyId: string

  @HasMany(() => SupportAttachment, 'supportId')
  attachments: SupportAttachment[]

  @BelongsTo(() => Company, { foreignKey: 'companyId' })
  company: Company;
}