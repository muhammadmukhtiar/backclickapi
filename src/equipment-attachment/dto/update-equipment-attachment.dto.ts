import { PartialType } from '@nestjs/mapped-types';
import { CreateEquipmentAttachmentDto } from './create-equipment-attachment.dto';

export class UpdateEquipmentAttachmentDto extends PartialType(CreateEquipmentAttachmentDto) {}
