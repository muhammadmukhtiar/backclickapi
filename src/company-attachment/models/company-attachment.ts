import { BelongsTo, Column, Model, Table } from 'sequelize-typescript';
import { Company } from 'src/company/models/company.model';

@Table
export class CompanyAttachment extends Model {

  @Column
  path: string;

  @Column
  fieldName: string;

  @Column
  fileType: string;

  @Column
  companyId: number;

  @BelongsTo(() => Company, { foreignKey: 'companyId' })
  company: Company;

}
