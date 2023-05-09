import { Column, Model, Table } from 'sequelize-typescript';

@Table({tableName:'logins'})
export class User extends Model {
 
  @Column
  email: string;

  @Column
  password: string;

  @Column
  role: string;

  @Column
  referencedId: string;
 
  @Column
  firstName: string;

  @Column
  lastName: string;
  
  @Column({ defaultValue: true })
  isActive: boolean;


}