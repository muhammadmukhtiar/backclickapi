
import { Column, Model, Table } from 'sequelize-typescript';

@Table({tableName:"logins"})
export class Auth extends Model {

  @Column
  email: string;

  @Column
  password: string;

  @Column
  role: string;

  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column
  referencedId: string;
 
  @Column({ defaultValue: true })
  isActive: boolean;

  @Column({ defaultValue: true })
  token: string;

}