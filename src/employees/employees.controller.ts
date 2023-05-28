import { Controller, Get, Post, Body, Param, Delete, Request, Query, UseGuards } from '@nestjs/common';
import { EmployeesService } from 'src/employees/employees.service';
import { UsersService } from 'src/users/users.service';
import { RolesGuard } from 'src/auth/auth-strategy/roles-guard';
import { EquipmentService } from 'src/equipment/equipment.service';

@Controller('employee')
@UseGuards(new RolesGuard(['employee', 'company', 'admin']))
export class EmployeesController {
  constructor(
    private readonly employeesService: EmployeesService,
    private usersService: UsersService,
    private readonly equipmentService: EquipmentService,
  ) { }

  @Post()
  async create(@Body() createEmployeeDto: any, @Request() req) {
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

    if (createEmployeeDto.assignedEquipmentList) {
      const employeeId = employee.dataValues.id;
      const assignedEquipmentList = createEmployeeDto.assignedEquipmentList.map(item => {
        const data = {
          id: item.id,
          employeeId: employeeId,
        }
        return data;
      });
      return await this.equipmentService.updateMany(assignedEquipmentList);
    }
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
  async update(@Param('id') id: string, @Body() updateEmployeeDto: any) {

    if (updateEmployeeDto.assignedEquipmentList) {
      const employeeId = +id;
      const assignedEquipmentList = updateEmployeeDto.assignedEquipmentList.map(item => {
        const data = {
          id: item.id,
          employeeId: employeeId,
        }
        return data;
      });
      await this.equipmentService.updateMany(assignedEquipmentList);
      const deletedArray = await this.equipmentService.findRemovedAssignedEqu(employeeId, assignedEquipmentList);
      const removeEquipmentList = deletedArray.map(item => {
        const data = {
          id: item,
          employeeId: null,
        }
        return data;
      });
      await this.equipmentService.updateMany(removeEquipmentList);
    }

    return this.employeesService.update(id, updateEmployeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeesService.remove(id);
  }
}
