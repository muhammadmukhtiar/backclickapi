import { Controller, Get, Post, Body, Param, Delete, Query } from '@nestjs/common';
import { CompanyService } from 'src/company/company.service';
import { UpdateCompanyDto } from 'src/company/dto/update-company.dto';
import { UsersService } from 'src/users/users.service';

@Controller('company')
export class CompanyController {
  constructor(
    private readonly companyService: CompanyService,
    private usersService: UsersService,
    ) {}

  @Post()
  async create(@Body() createCompanyDto: any) {
    const company = await this.companyService.create(createCompanyDto);
    const data = {
      email: createCompanyDto.adminPrimaryEmail,
      firstName: company.dataValues.adminFirstName,
      lastName: company.dataValues.adminLastName,
      referencedId: company.dataValues.id,
      role: 'company',
      isActive: true
    }
    await this.usersService.create(data);
    return company;
  }

  @Get()
  findAll() {
    return this.companyService.findAll();
  }
  @Get('search?')
  search(@Query() query) {
    return this.companyService.search(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companyService.findOne(id);
  }

  @Post(':id')
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companyService.update(id, updateCompanyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companyService.remove(id);
  }
}
