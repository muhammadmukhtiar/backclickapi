import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { EquipmentService } from 'src/equipment/equipment.service';
import { EquipmentController } from 'src/equipment/equipment.controller';
import { Equipment } from 'src/equipment/models/equipment.model';

@Module({
  imports: [SequelizeModule.forFeature([Equipment])],
  controllers: [EquipmentController],
  providers: [EquipmentService]
})
export class EquipmentModule {}
