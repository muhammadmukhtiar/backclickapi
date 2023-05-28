import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EquipmentactivityService } from './equipmentactivity.service';
import { CreateEquipmentactivityDto } from './dto/create-equipmentactivity.dto';

@Controller('equipment-activity')
export class EquipmentactivityController {

  constructor(
    private equipmentactivityService: EquipmentactivityService
  ) { }

  @Post()
  create(@Body() createEquipmentactivityDto) {
    return this.equipmentactivityService.create(createEquipmentactivityDto);
  }

  @Get()
  findAll() {
    return this.equipmentactivityService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.equipmentactivityService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEquipmentactivityDto) {
    return this.equipmentactivityService.update(id, updateEquipmentactivityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.equipmentactivityService.remove(+id);
  }
}
