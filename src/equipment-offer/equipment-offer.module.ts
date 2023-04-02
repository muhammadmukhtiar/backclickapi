import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { EquipmentOfferService } from './equipment-offer.service';
import { EquipmentOfferController } from './equipment-offer.controller';
import { EquipmentOffer } from './models/equipment-offer.model';

@Module({
  imports: [SequelizeModule.forFeature([EquipmentOffer])],
  controllers: [EquipmentOfferController],
  providers: [EquipmentOfferService]
})
export class EquipmentOfferModule {}
