import { PartialType } from '@nestjs/mapped-types';
import { CreateEquipmentOfferDto } from './create-equipment-offer.dto';

export class UpdateEquipmentOfferDto extends PartialType(CreateEquipmentOfferDto) {}
