import { Controller, Get, Post, Body, Param, Delete, Request, Query, UseGuards } from '@nestjs/common';
import { EmployeesService } from 'src/employees/employees.service';
import { CreateEmployeeDto } from 'src/employees/dto/create-employee.dto';
import { UpdateEmployeeDto } from 'src/employees/dto/update-employee.dto';
import { UsersService } from 'src/users/users.service';
import { RolesGuard } from 'src/auth/auth-strategy/roles-guard';

@Controller('employee')
@UseGuards(new RolesGuard(['company', 'admin']))
export class EmployeesController {
  constructor(
    private readonly employeesService: EmployeesService,
    private usersService: UsersService,
  ) { }

  @Post()
  async create(@Body() createEmployeeDto: CreateEmployeeDto, @Request() req) {
    const companyId = req.user.referencedId;
    createEmployeeDto['companyId'] = companyId;
    createEmployeeDto['isActive'] = 1;
    const employee = await this.employeesService.create(createEmployeeDto);
    const data = {
      email: createEmployeeDto.email,
      role: 'employee',
      referencedId: employee.dataValues.id,
      isActive: true
    }
    await this.usersService.create(data);
    return employee;
  }

  @Get('search?')
  search(@Query() query, @Request() req) {
    const companyId = req.user.referencedId;
    return this.employeesService.search(query, companyId);
  }

  @Get()
  findAll(@Request() req) {
    const companyId = req.user.referencedId;
    return this.employeesService.findAll(companyId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeesService.findOne(id);
  }

  @Post(':id')
  update(@Param('id') id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeesService.update(id, updateEmployeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeesService.remove(id);
  }
}
