import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { EquipmentOfferService } from 'src/equipment-offer/equipment-offer.service';
import { EquipmentOfferController } from 'src/equipment-offer/equipment-offer.controller';
import { EquipmentOffer } from 'src/equipment-offer/models/equipment-offer.model';

@Module({
  imports: [SequelizeModule.forFeature([EquipmentOffer])],
  controllers: [EquipmentOfferController],
  providers: [EquipmentOfferService]
})
export class EquipmentOfferModule {}
