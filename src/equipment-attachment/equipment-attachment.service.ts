import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { CreateEquipmentAttachmentDto } from 'src/equipment-attachment/dto/create-equipment-attachment.dto';
import { UpdateEquipmentAttachmentDto } from 'src/equipment-attachment/dto/update-equipment-attachment.dto';
import { EquipmentAttachment } from 'src/equipment-attachment/models/equipment-attachment';

@Injectable()
export class EquipmentAttachmentService {
  constructor(
    @InjectModel(EquipmentAttachment)
    private readonly equipmentAttachmentModel: typeof EquipmentAttachment,
  ) { }

  async create(createDto: CreateEquipmentAttachmentDto): Promise<EquipmentAttachment> {
    return this.equipmentAttachmentModel.create({
      ...createDto,
    });
  }

  createMany(createDto: any): Promise<EquipmentAttachment[]> {
    return this.equipmentAttachmentModel.bulkCreate(createDto);
  }

  async update(id: string, updateDto: UpdateEquipmentAttachmentDto): Promise<any> {
    return this.equipmentAttachmentModel.update(
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

  async findAll(): Promise<EquipmentAttachment[]> {
    return this.equipmentAttachmentModel.findAll();
  }

  async findOne(id: string): Promise<EquipmentAttachment> {
    return this.equipmentAttachmentModel.findOne({
      where: {
        id,
      },
    });
  }

  async search(searchQuery: any): Promise<EquipmentAttachment[]> {
    const query = this.buildQuery(searchQuery);
    return this.equipmentAttachmentModel.findAll(query);
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
