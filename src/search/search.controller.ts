import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SearchService } from './search.service';
import { CreateSearchDto } from './dto/create-search.dto';
import { UpdateSearchDto } from './dto/update-search.dto';
import { EmployeesService } from 'src/employees/employees.service';
import { EquipmentService } from 'src/equipment/equipment.service';
import { CompanyService } from 'src/company/company.service';

@Controller('search')
export class SearchController {
  constructor(
    private readonly searchService: SearchService,
    private readonly employeesService: EmployeesService,
    private readonly equipmentService: EquipmentService,
    private readonly companyService: CompanyService,
  ) { }

  @Post()
  create(@Body() createSearchDto: CreateSearchDto) {
    return this.searchService.create(createSearchDto);
  }

  @Get(':id')
  async findAll(@Param('id') id: string) {
    const employee = await this.employeesService.searchByName(id);
    const equipment = await this.equipmentService.searchByName(id);
    const company = await this.companyService.searchByName(id);

    return {
      employeeList: [...employee],
      equipmentList: [...equipment],
      companytList: [...company]
    };
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSearchDto: UpdateSearchDto) {
    return this.searchService.update(+id, updateSearchDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.searchService.remove(+id);
  }
}
