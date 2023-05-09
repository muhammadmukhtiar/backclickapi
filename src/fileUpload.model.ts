import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class FileUpload extends Model {

  @Column
  name: string;

  @Column
  srcPath: string;

  @Column
  employeeId: boolean;

  @Column
  companyId: boolean;
}