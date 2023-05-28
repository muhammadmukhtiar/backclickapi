import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { SupportAttachment } from './models/support-attachment';

@Injectable()
export class SupportAttachmentService {
  constructor(
    @InjectModel(SupportAttachment)
    private readonly supportAttachment: typeof SupportAttachment,
  ) { }

  async create(createDto): Promise<SupportAttachment> {
    return this.supportAttachment.create({
      ...createDto,
    });
  }

  createMany(createDto: any): Promise<SupportAttachment[]> {
    return this.supportAttachment.bulkCreate(createDto);
  }

  async update(id: string, updateDto): Promise<any> {
    return this.supportAttachment.update(
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

  async findAll(): Promise<SupportAttachment[]> {
    return this.supportAttachment.findAll();
  }

  async findOne(id: string): Promise<SupportAttachment> {
    return this.supportAttachment.findOne({
      where: {
        id,
      },
    });
  }

  async search(searchQuery: any): Promise<SupportAttachment[]> {
    const query = this.buildQuery(searchQuery);
    return this.supportAttachment.findAll(query);
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    if (user) {
      return await user.destroy();
    }
    return null
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
