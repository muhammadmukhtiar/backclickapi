import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Employee extends Model {
  // @Column
  // id: number;
  // primaryKey: true

  @Column
  fullName: string;

  @Column
  email: string;

  @Column
  joiningDate: string;

  @Column
  leavingDate: string;

  @Column
  birthDate: string;

  @Column
  anniversaryDate: string;

  @Column
  contactNumber: string;

  @Column
  team: string;

  @Column
  postion: string;

  @Column
  authorization: string;

  @Column
  isActive: string;

  @Column
  companyId: string;


}