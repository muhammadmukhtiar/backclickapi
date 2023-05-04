import { Module } from '@nestjs/common';
import { EquipmentAttachmentService } from 'src/equipment-attachment/equipment-attachment.service';
import { EquipmentAttachmentController } from 'src/equipment-attachment/equipment-attachment.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { EquipmentAttachment } from 'src/equipment-attachment/models/equipment-attachment';

@Module({
  imports: [SequelizeModule.forFeature([EquipmentAttachment])],
  controllers: [EquipmentAttachmentController],
  providers: [EquipmentAttachmentService]
})
export class EquipmentAttachmentModule { }
