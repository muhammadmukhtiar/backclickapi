import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './models/Employee.model';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectModel(Employee)
    private readonly EmployeeModel: typeof Employee,
  ) {}

  create(createDto: CreateEmployeeDto): Promise<Employee> {
    return this.EmployeeModel.create({
      ...createDto,
    });
  }

  update(id: string, updateDto: UpdateEmployeeDto): Promise<any> {
    return this.EmployeeModel.update({
        ...updateDto,
      },
      {
        where: {
          id,
        },
      },
    );
  }

  search(query: any): Promise<Employee[]> {
    return this.EmployeeModel.findAll({
      where: {
        ...query,
      },
    });
  }

  async findAll(): Promise<Employee[]> {
    return this.EmployeeModel.findAll();
  }

  findOne(id: string): Promise<Employee> {
    return this.EmployeeModel.findOne({
      where: {
        id,
      },
    });
  }

  async remove(id: string): Promise<void> {
    const employee = await this.findOne(id);
    await employee.destroy();
  }
}
