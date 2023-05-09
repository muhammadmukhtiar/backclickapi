import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { EmployeeAttachment } from 'src/employee-attachment/models/employee-attachment';

@Table
export class Employee extends Model {

  @Column
  firstName: string;

  @Column
  lastName: string;
  
  @Column
  email: string;

  @Column
  secondaryEmail: string;

  
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

  @Column
  address: string;

  @Column
  address2: string;

  @Column
  alternateContactNumber: string;

  @Column
  city: string;

  @Column
  companyName: string;

  @Column
  country: string;
  
  @Column
  state: string;

  @Column
  department: string;

  @Column
  languageSpoken: string;

  @Column
  pinCode: string;

  @Column
  preferedCommunicationMode: string;


  @Column
  prefferedCommunicationTime: string;


  @HasMany(() => EmployeeAttachment, 'employeeId')
  attachments: EmployeeAttachment[]

}