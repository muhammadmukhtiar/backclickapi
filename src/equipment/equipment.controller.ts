import { Controller, Get, Post, Body, Request, UseGuards, Param, Delete, Query } from '@nestjs/common';
import { EquipmentService } from 'src/equipment/equipment.service';
import { CreateEquipmentDto } from 'src/equipment/dto/create-equipment.dto';
import { UpdateEquipmentDto } from 'src/equipment/dto/update-equipment.dto';
import { RolesGuard } from 'src/auth/auth-strategy/roles-guard';

@Controller('equipment')
@UseGuards(new RolesGuard(['company', 'admin']))
export class EquipmentController {
  constructor(private readonly equipmentService: EquipmentService) { }

  @Post()
  create(@Body() createEquipmentDto: CreateEquipmentDto, @Request() req) {
    const companyId = req.user.referencedId;
    createEquipmentDto['companyId'] = companyId;
    return this.equipmentService.create(createEquipmentDto);
  }

  @Get('search?')
  search(@Query() query, @Request() req) {
    const companyId = req.user.referencedId;
    return this.equipmentService.search(query, companyId);
  }


  @Get()
  findAll(@Request() req) {
    const companyId = req.user.referencedId;
    return this.equipmentService.findAll(companyId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.equipmentService.findOne(id);
  }

  @Post('assig-equipment')
  async assigEquipment(@Body() createEquipmentDto, @Request() req) {
    const customData = {
      employeeId: createEquipmentDto.employeeId,
      companyId: req.user.referencedId
    }
    return await this.equipmentService.update(createEquipmentDto.equipmentId, customData);
  }

  @Post(':id')
  update(@Param('id') id: string, @Body() updateEquipmentDto: UpdateEquipmentDto) {
    return this.equipmentService.update(id, updateEquipmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.equipmentService.remove(id);
  }
}
