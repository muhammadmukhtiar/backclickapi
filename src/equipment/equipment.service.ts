import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { Equipment } from 'src/equipment/models/equipment.model';
import { generateQuery } from 'src/utility/helpers';
import { EquipmentAttachment } from 'src/equipment-attachment/models/equipment-attachment';

@Injectable()
export class EquipmentService {
  constructor(
    @InjectModel(Equipment)
    private readonly equipmentModel: typeof Equipment,
  ) { }

  create(createDto: CreateEquipmentDto): Promise<Equipment> {
    return this.equipmentModel.create({
      ...createDto,
    });
  }

  async update(id: string, createDto: CreateEquipmentDto): Promise<any> {
    return this.equipmentModel.update(
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

  async findAll(companyId): Promise<Equipment[]> {
    return this.equipmentModel.findAll({ where: { companyId: companyId } });
  }

  search1(query: any): Promise<Equipment[]> {
    return this.equipmentModel.findAll({
      where: {
        ...query,
      },
    });
  }

  search(searchQuery: any, companyId): Promise<Equipment[]> {
    searchQuery = {
      ...searchQuery,
      companyId: companyId
    }
    const query = generateQuery(searchQuery);
    return this.equipmentModel.findAll(query);
  }

  findOne(id: string): Promise<Equipment> {
    return this.equipmentModel.findOne({
      where: {
        id,
      },
      include: [{ model: EquipmentAttachment }],
    });
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await user.destroy();
  }

}
