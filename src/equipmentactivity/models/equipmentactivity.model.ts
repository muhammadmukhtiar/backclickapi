import { Column, Table, Model, BelongsTo } from 'sequelize-typescript';
import { Employee } from 'src/employees/models/employee.model';
import { Equipment } from 'src/equipment/models/equipment.model';

@Table({ tableName: 'equipmentactivity' })
export class EquipmentActivity extends Model {

  @Column
  title: string;

  @Column
  activityType: string;

  @Column
  status: string;

  @Column
  employeeId: string;

  @Column
  companyId: string

  @Column
  equipmentId: string;

  // @BelongsTo(() => Equipment)
  // equipment: Equipment;

  @BelongsTo(() => Employee, { foreignKey: 'employeeId' })
  assignedEmployee: Employee;
}