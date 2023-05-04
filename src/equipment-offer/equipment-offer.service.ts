import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateEquipmentOfferDto } from 'src/equipment-offer/dto/create-equipment-offer.dto';
import { UpdateEquipmentOfferDto } from 'src/equipment-offer/dto/update-equipment-offer.dto';
import { EquipmentOffer } from 'src/equipment-offer/models/equipment-offer.model';

@Injectable()
export class EquipmentOfferService {
  constructor(
    @InjectModel(EquipmentOffer)
    private readonly equipmentModel: typeof EquipmentOffer,
  ) {}

  create(createDto: CreateEquipmentOfferDto): Promise<EquipmentOffer> {
    return this.equipmentModel.create({
      ...createDto,
    });
  }

  update(id: string, createDto: UpdateEquipmentOfferDto): Promise<any> {
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

  async findAll(): Promise<EquipmentOffer[]> {
    return this.equipmentModel.findAll();
  }

  search(query: any): Promise<EquipmentOffer[]> {
    return this.equipmentModel.findAll({
      where: {
        ...query,
      },
    });
  }

  findOne(id: string): Promise<EquipmentOffer> {
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

