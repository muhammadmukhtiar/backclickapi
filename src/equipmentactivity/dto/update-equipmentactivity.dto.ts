import { PartialType } from '@nestjs/mapped-types';
import { CreateEquipmentactivityDto } from './create-equipmentactivity.dto';

export class UpdateEquipmentactivityDto extends PartialType(CreateEquipmentactivityDto) {}
