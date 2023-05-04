import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Tag } from './models/tag.model';
import { CreateTagDto } from './dto/create-tag.dto';

@Injectable()
export class TagService {
  constructor(
    @InjectModel(Tag)
    private readonly tagModel: typeof Tag,
  ) { }

  create(createDto: CreateTagDto): Promise<Tag> {
    return this.tagModel.create({
      ...createDto,
    });
  }

  createMany(createDto: any): Promise<Tag[]> {
    return this.tagModel.bulkCreate(createDto);
  }

  update(id: string, createDto: CreateTagDto): Promise<any> {
    return this.tagModel.update(
      {
        ...createDto,
      },
      {
        where: {
          id,
        },
      },
    );
  }

  async findAll(): Promise<Tag[]> {
    return this.tagModel.findAll();
  }

  search1(query: any): Promise<Tag[]> {
    return this.tagModel.findAll({
      where: {
        ...query,
      },
    });
  }

  search(searchQuery: any): Promise<Tag[]> {
    const query = this.buildQuery(searchQuery);
    return this.tagModel.findAll(query);
  }

  findOne(id: string): Promise<Tag> {
    return this.tagModel.findOne({
      where: {
        id,
      },
    });
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await user.destroy();
  }

  buildQuery = (searchQuery) => {
    const where = {};
    Object.entries(searchQuery).forEach(([key, value]) => {
      if (value) {
        if (!where[Op.or]) {
          where[Op.or] = [];
        }
        where[Op.or].push({
          [key]: { [Op.like]: `%${value}%` },
        });
      }
    });
    const query = { where };
    return query;
  };
}
