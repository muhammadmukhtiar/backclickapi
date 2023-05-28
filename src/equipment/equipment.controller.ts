import { Controller, Get, Post, Body, Request, UseGuards, Param, Delete, Query } from '@nestjs/common';
import { EquipmentService } from 'src/equipment/equipment.service';
import { RolesGuard } from 'src/auth/auth-strategy/roles-guard';
import { EquipmentOfferService } from 'src/equipment-offer/equipment-offer.service';
import { Equipment } from './models/equipment.model';

@Controller('equipment')
@UseGuards(new RolesGuard(['company', 'admin']))
export class EquipmentController {
  constructor(
    private readonly equipmentService: EquipmentService,
    private readonly rquipmentOfferService: EquipmentOfferService
  ) { }

  @Post()
  async create(@Body() createEquipmentDto: any, @Request() req) {
    const isAdmin = req.user && req.user.role == 'admin';
    const companyId = req.user.referencedId;
    createEquipmentDto['companyId'] = companyId;
    if (isAdmin) {
      createEquipmentDto['isCatalog'] = true;
    }

    if (createEquipmentDto.assignedToEmployee && createEquipmentDto.assignedToEmployee.length) {
      createEquipmentDto['employeeId'] = createEquipmentDto.assignedToEmployee[0]['id'];
    }

    if (createEquipmentDto.assignedToCompany && createEquipmentDto.assignedToCompany.length && isAdmin) {
      createEquipmentDto['companyId'] = createEquipmentDto.assignedToCompany[0]['id'];
    }

    const equipmentData = await this.equipmentService.create(createEquipmentDto);
    if (createEquipmentDto.equipmentOfferList && createEquipmentDto.equipmentOfferList.length) {
      const equipmentId = equipmentData.dataValues.id;
      const equipmentOfferList = createEquipmentDto.equipmentOfferList.map(item => {
        item['equipmentId'] = equipmentId;
        return item;
      });
      await this.rquipmentOfferService.createMany(equipmentOfferList);
    }
    return equipmentData.dataValues;
  }

  @Get('search?')
  search(@Query() query, @Request() req) {
    let companyId = req.user.referencedId;
    const isAdmin = req.user && req.user.role == 'admin';
    if (isAdmin) {
      companyId = null
    }
    return this.equipmentService.search(query, companyId);
  }


  @Get()
  findAll(@Request() req) {
    const companyId = req.user.referencedId;
    return this.equipmentService.findAll(companyId);
  }


  @Get('catalogs')
  findAllCatalog() {
    return this.equipmentService.findAllCatalogs();
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
  async update(@Param('id') id: string, @Body() updateEquipmentDto: any, @Request() req) {
    const isAdmin = req.user && req.user.role == 'admin';

    if (isAdmin) {
      updateEquipmentDto['isCatalog'] = true;
    }
    if (updateEquipmentDto.equipmentOfferList && updateEquipmentDto.equipmentOfferList.length) {
      const equipmentId = updateEquipmentDto.id;
      const equipmentOfferList = updateEquipmentDto.equipmentOfferList.map(item => {
        item['equipmentId'] = equipmentId;
        return item;
      });
      const updateOffers = equipmentOfferList.filter(item => item.id);
      const deletedOffers = await this.rquipmentOfferService.findDeletedOffers(equipmentId, updateOffers);
      if (deletedOffers && deletedOffers.length) {
        await this.rquipmentOfferService.deleteMultiple(deletedOffers);
      }
      const addOffers = equipmentOfferList.filter(item => !item.id);
      if (addOffers.length) {
        await this.rquipmentOfferService.createMany(addOffers);
      }
      if (updateOffers.length) {
        for (const fileObj of updateOffers) {
          await this.rquipmentOfferService.update(fileObj.id, fileObj);
        }
      }

    }

    try {
      if (updateEquipmentDto.assignedToEmployee && updateEquipmentDto.assignedToEmployee.length) {
        updateEquipmentDto['employeeId'] = updateEquipmentDto.assignedToEmployee[0]['id'];
      }

      if (updateEquipmentDto.assignedToCompany && updateEquipmentDto.assignedToCompany.length && isAdmin) {
        updateEquipmentDto['companyId'] = updateEquipmentDto.assignedToCompany[0]['id'];
      }
      return this.equipmentService.update(id, updateEquipmentDto);
    } catch (err) {
      return 'error' + err;
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.equipmentService.remove(id);
  }
}
