import { BelongsTo, Column, Model, Table } from 'sequelize-typescript';
import { Equipment } from 'src/equipment/models/Equipment.model';

@Table
export class EmployeeAttachment extends Model {

  @Column
  path: string;

  @Column
  fieldName: string;

  @Column
  fileType: string;

  @Column
  employeeId: number;

  @BelongsTo(() => Equipment, { foreignKey: 'employeeId' })
  equipment: Equipment;

}
