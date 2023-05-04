import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Tag extends Model {

  @Column
  title: string;

  @Column
  companyId: string;

}
