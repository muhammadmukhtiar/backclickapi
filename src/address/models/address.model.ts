import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Address extends Model {

  @Column
  addressTitle: string;

  @Column
  address: string;

  @Column
  additionalAddress: string;

  @Column
  postalCode: string;
  
  @Column
  country: string;

  @Column
  state: string;

  @Column
  city: string;

  @Column
  firstName: string;

  @Column
  lastName: boolean;

  
  @Column
  contactNumbr: string;
  	
  @Column
  isDefualt: boolean;

  @Column
  employeeId: boolean;

  @Column
  companyId: boolean;
}