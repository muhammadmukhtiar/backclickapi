import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { Equipment } from './models/Equipment.model';

@Injectable()
export class EquipmentService {
  constructor(
    @InjectModel(Equipment)
    private readonly equipmentModel: typeof Equipment,
  ) {}

  create(createDto: CreateEquipmentDto): Promise<Equipment> {
    return this.equipmentModel.create({
      ...createDto,
    });
  }

  update(id: string, createDto: CreateEquipmentDto): Promise<any> {
    return this.equipmentModel.update({
        ...createDto,
      },
      {
        where: {
          id,
        },
      },
    );
  }

  async findAll(): Promise<Equipment[]> {
    return this.equipmentModel.findAll();
  }

  search(query: any): Promise<Equipment[]> {
    return this.equipmentModel.findAll({
      where: {
        ...query,
      },
    });
  }

  findOne(id: string): Promise<Equipment> {
    return this.equipmentModel.findOne({
      where: {
        id,
      },
    });
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await user.destroy();
  }
}
