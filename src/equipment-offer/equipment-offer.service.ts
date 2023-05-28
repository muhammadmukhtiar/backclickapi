import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UpdateEquipmentOfferDto } from './dto/update-equipment-offer.dto';
import { EquipmentOffer } from './models/equipment-offer.model';

@Injectable()
export class EquipmentOfferService {
  constructor(
    @InjectModel(EquipmentOffer)
    private readonly equipmentOffer: typeof EquipmentOffer,
  ) { }

  async create(createDto: any): Promise<EquipmentOffer> {
    return this.equipmentOffer.create({
      ...createDto,
    });
  }


  async createMany(createDto: any): Promise<EquipmentOffer[]> {
    return this.equipmentOffer.bulkCreate(createDto);
  }

  async findAllByEquipmentId(equipmentId: number): Promise<EquipmentOffer[]> {
    return this.equipmentOffer.findAll({ where: { equipmentId } });
  }

  async findDeletedOffers(equipmentId: number, offerIds): Promise<number[]> {
    const existingOffers = await this.equipmentOffer.findAll({ where: { equipmentId } });
    const existingOfferIds = existingOffers.map(offer => offer.dataValues.id);
    const updatedOfferIds = offerIds.map(offer => offer.id)
    const deletedOfferIds = existingOfferIds.filter(id => !updatedOfferIds.includes(id));
    return deletedOfferIds;
  }

  update(id: string, createDto: UpdateEquipmentOfferDto): Promise<any> {
    return this.equipmentOffer.update({
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
    return this.equipmentOffer.findAll();
  }

  search(query: any): Promise<EquipmentOffer[]> {
    return this.equipmentOffer.findAll({
      where: {
        ...query,
      },
    });
  }

  findOne(id: string): Promise<EquipmentOffer> {
    return this.equipmentOffer.findOne({
      where: {
        id,
      },
    });
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await user.destroy();
  }


  async deleteMultiple(deletedOffers): Promise<void> {
    for (const id of deletedOffers) {
      try {
        const user = await this.findOne(id);
        await user.destroy();
      } catch (err) {
        console.error(`Error removing file: ${err.message}`);
      }
    }

  }
}

