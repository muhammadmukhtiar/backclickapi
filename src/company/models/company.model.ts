import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Company extends Model {
  // @Column
  // id: number;
  // primaryKey: true

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


}