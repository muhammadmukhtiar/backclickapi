import { BelongsTo, Column, Model, Table } from 'sequelize-typescript';
import { Equipment } from 'src/equipment/models/Equipment.model';

@Table
export class EquipmentAttachment extends Model {

  @Column
  path: string;

  @Column
  fieldName: string;

  @Column
  fileType: string;

  @Column
  equipmentId: number;

  @BelongsTo(() => Equipment, { foreignKey: 'equipmentId' })
  equipment: Equipment;

}
