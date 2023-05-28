import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { EquipmentService } from 'src/equipment/equipment.service';
import { EquipmentController } from 'src/equipment/equipment.controller';
import { Equipment } from 'src/equipment/models/equipment.model';
import { EquipmentOfferModule } from 'src/equipment-offer/equipment-offer.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Equipment]),
    EquipmentOfferModule
  ],
  controllers: [EquipmentController],
  providers: [EquipmentService],
  exports: [EquipmentService]
})
export class EquipmentModule { }
