import { Module } from '@nestjs/common';
import { EquipmentactivityService } from './equipmentactivity.service';
import { EquipmentactivityController } from './equipmentactivity.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { EquipmentActivity } from './models/equipmentactivity.model';

@Module({
  imports: [
    SequelizeModule.forFeature([EquipmentActivity])
  ],
  controllers: [EquipmentactivityController],
  providers: [EquipmentactivityService]
})
export class EquipmentactivityModule { }
