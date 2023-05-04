import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { CreateCompanyAttachmentDto } from './dto/create-company-attachment.dto';
import { UpdateCompanyAttachmentDto } from './dto/update-company-attachment.dto';
import { CompanyAttachment } from './models/company-attachment';

@Injectable()
export class CompanyAttachmentService {
  constructor(
    @InjectModel(CompanyAttachment)
    private readonly companyAttachmentModel: typeof CompanyAttachment,
  ) { }

  async create(createDto: CreateCompanyAttachmentDto): Promise<CompanyAttachment> {
    return this.companyAttachmentModel.create({
      ...createDto,
    });
  }

  createMany(createDto: any): Promise<CompanyAttachment[]> {
    return this.companyAttachmentModel.bulkCreate(createDto);
  }

  async update(id: string, updateDto: UpdateCompanyAttachmentDto): Promise<any> {
    return this.companyAttachmentModel.update(
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

  async findAll(): Promise<CompanyAttachment[]> {
    return this.companyAttachmentModel.findAll();
  }

  async findOne(id: string): Promise<CompanyAttachment> {
    return this.companyAttachmentModel.findOne({
      where: {
        id,
      },
    });
  }

  async search(searchQuery: any): Promise<CompanyAttachment[]> {
    const query = this.buildQuery(searchQuery);
    return this.companyAttachmentModel.findAll(query);
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
