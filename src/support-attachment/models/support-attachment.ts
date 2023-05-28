import { BelongsTo, Column, Model, Table } from 'sequelize-typescript';
import { Support } from 'src/support/models/support.model';

@Table({ tableName: 'supportattachments' })
export class SupportAttachment extends Model {

  @Column
  path: string;

  @Column
  fieldName: string;

  @Column
  fileType: string;

  @Column
  supportId: number;

  @BelongsTo(() => Support, { foreignKey: 'supportId' })
  support: Support;

}
