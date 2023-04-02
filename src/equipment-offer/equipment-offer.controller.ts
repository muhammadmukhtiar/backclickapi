import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { EquipmentOfferService } from './equipment-offer.service';
import { CreateEquipmentOfferDto } from './dto/create-equipment-offer.dto';
import { UpdateEquipmentOfferDto } from './dto/update-equipment-offer.dto';

@Controller('equipment-offer')
export class EquipmentOfferController {
  constructor(private readonly equipmentOfferService: EquipmentOfferService) {}

  @Post()
  create(@Body() createEquipmentOfferDto: CreateEquipmentOfferDto) {
    return this.equipmentOfferService.create(createEquipmentOfferDto);
  }

  @Get('search?')
  search(@Query() query) {
    return this.equipmentOfferService.search(query);
  }

  @Get()
  findAll() {
    return this.equipmentOfferService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.equipmentOfferService.findOne(id);
  }

  @Post(':id')
  update(@Param('id') id: string, @Body() updateEquipmentOfferDto: UpdateEquipmentOfferDto) {
    return this.equipmentOfferService.update(id, updateEquipmentOfferDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.equipmentOfferService.remove(id);
  }
}
