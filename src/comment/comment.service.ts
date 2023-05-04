import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './models/Comment.model';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment)
    private readonly commentModel: typeof Comment,
  ) {}

  create(createDto: CreateCommentDto): Promise<Comment> {
    return this.commentModel.create({
      ...createDto,
    });
  }

  update(id: string, updateDto: UpdateCommentDto): Promise<any> {
    return this.commentModel.update(
      {
        ...updateDto,
      },
      {
        where: {
          id,
        },
      },
    );
  }

  search(query: any): Promise<Comment[]> {
    return this.commentModel.findAll({
      where: {
        ...query,
      },
    });
  }

  async findAll(): Promise<Comment[]> {
    return this.commentModel.findAll();
  }

  findOne(id: string): Promise<Comment> {
    return this.commentModel.findOne({
      where: {
        id,
      },
    });
  }

  async remove(id: string): Promise<void> {
    const employee = await this.findOne(id);
    await employee.destroy();
  }
}
