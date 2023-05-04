import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Comment extends Model {

  @Column
  comment: string;

  @Column
  userId: string;

  @Column
  parentCommentId: string;

}
