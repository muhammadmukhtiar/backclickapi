import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from 'src/employees/models/employee.model';
import { generateQuery } from 'src/utility/helpers';
import { EmployeeAttachment } from 'src/employee-attachment/models/employee-attachment';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectModel(Employee)
    private readonly EmployeeModel: typeof Employee,
  ) { }

  create(createDto: CreateEmployeeDto): Promise<Employee> {
    return this.EmployeeModel.create({
      ...createDto,
    });
  }

  update(id: string, updateDto: UpdateEmployeeDto): Promise<any> {
    return this.EmployeeModel.update(
      {
        ...updateDto,
      },
      {
        where: {
          id,
        },
      },
    );
  }

  search1(query: any): Promise<Employee[]> {
    return this.EmployeeModel.findAll({
      where: {
        ...query,
      },
    });
  }

  search(searchQuery: any, companyId): Promise<Employee[]> {
    searchQuery = {
      ...searchQuery,
      companyId: companyId
    }
    const query = generateQuery(searchQuery);
    return this.EmployeeModel.findAll(query);
  }

  async findAll(companyId): Promise<Employee[]> {
    return this.EmployeeModel.findAll({ where: { companyId: companyId } });
  }

  findOne(id: string): Promise<Employee> {
    return this.EmployeeModel.findOne({
      where: {
        id,
      },
      include: [{ model: EmployeeAttachment }],
    });
  }

  async remove(id: string): Promise<void> {
    const employee = await this.findOne(id);
    await employee.destroy();
  }

}
