import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { CommentService } from 'src/comment/comment.service';
import { CommentController } from 'src/comment/comment.controller';
import { Comment } from 'src/comment/models/comment.model';

@Module({
  imports: [SequelizeModule.forFeature([Comment])],
  controllers: [CommentController],
  providers: [CommentService]
})
export class CommentModule { }
