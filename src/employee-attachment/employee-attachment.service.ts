import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { CreateEquipmentAttachmentDto } from './dto/create-employee-attachment.dto';
import { UpdateEquipmentAttachmentDto } from './dto/update-employee-attachment.dto';
import { EmployeeAttachment } from './models/employee-attachment';

@Injectable()
export class EmployeeAttachmentService {
  constructor(
    @InjectModel(EmployeeAttachment)
    private readonly employeeAttachmentModel: typeof EmployeeAttachment,
  ) { }

  async create(createDto: CreateEquipmentAttachmentDto): Promise<EmployeeAttachment> {
    return this.employeeAttachmentModel.create({
      ...createDto,
    });
  }

  createMany(createDto: any): Promise<EmployeeAttachment[]> {
    return this.employeeAttachmentModel.bulkCreate(createDto);
  }

  async update(id: string, updateDto: UpdateEquipmentAttachmentDto): Promise<any> {
    return this.employeeAttachmentModel.update(
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

  async findAll(): Promise<EmployeeAttachment[]> {
    return this.employeeAttachmentModel.findAll();
  }

  async findOne(id: string): Promise<EmployeeAttachment> {
    return this.employeeAttachmentModel.findOne({
      where: {
        id,
      },
    });
  }

  async search(searchQuery: any): Promise<EmployeeAttachment[]> {
    const query = this.buildQuery(searchQuery);
    return this.employeeAttachmentModel.findAll(query);
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
