import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Country extends Model {

  @Column
  country_name: string;

  @Column
  short_name: string;

  @Column
  country_code: string;

}