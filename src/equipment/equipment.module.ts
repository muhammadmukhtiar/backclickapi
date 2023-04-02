import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { EquipmentService } from './equipment.service';
import { EquipmentController } from './equipment.controller';
import { Equipment } from './models/Equipment.model';

@Module({
  imports: [SequelizeModule.forFeature([Equipment])],
  controllers: [EquipmentController],
  providers: [EquipmentService]
})
export class EquipmentModule {}
