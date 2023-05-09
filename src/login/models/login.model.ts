
import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Login extends Model {

  @Column
  email: string;

  @Column
  password: string;

  @Column
  role: string;

  @Column
  referencedId: string;
 
  @Column({ defaultValue: true })
  isActive: boolean;


}