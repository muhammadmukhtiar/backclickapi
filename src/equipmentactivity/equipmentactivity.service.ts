import { Injectable } from '@nestjs/common';
import { EquipmentActivity } from './models/equipmentactivity.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class EquipmentactivityService {

  constructor(
    @InjectModel(EquipmentActivity)
    private readonly equipmentActivity: typeof EquipmentActivity,
  ) { }

  async create(createDto): Promise<EquipmentActivity> {
    return this.equipmentActivity.create({
      ...createDto,
    });
  }

  async update(id: string, createDto): Promise<any> {
    return this.equipmentActivity.update(
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


  async findAll(): Promise<EquipmentActivity[]> {
    return this.equipmentActivity.findAll({
      order: [['createdAt', 'DESC']]
    });
  }


  findOne(id: number) {
    this.equipmentActivity.findOne({
      where: {
        id,
      },
    })
  }


  remove(id: number) {
    return `This action removes a #${id} equipmentactivity`;
  }
}
