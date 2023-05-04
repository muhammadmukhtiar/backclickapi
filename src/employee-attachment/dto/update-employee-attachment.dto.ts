import { PartialType } from '@nestjs/mapped-types';
import { CreateEquipmentAttachmentDto } from './create-employee-attachment.dto';

export class UpdateEquipmentAttachmentDto extends PartialType(CreateEquipmentAttachmentDto) {}
