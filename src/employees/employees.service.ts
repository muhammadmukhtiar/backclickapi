import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateEmployeeDto } from 'src/employees/dto/create-employee.dto';
import { UpdateEmployeeDto } from 'src/employees/dto/update-employee.dto';
import { Employee } from 'src/employees/models/employee.model';
import { generateQuery } from 'src/utility/helpers';
import { EmployeeAttachment } from 'src/employee-attachment/models/employee-attachment';
import { Op, literal } from 'sequelize';
import { Equipment } from 'src/equipment/models/equipment.model';

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

  async searchByName(query: string): Promise<Employee[]> {
    return this.EmployeeModel.findAll({
      where: {
        [Op.or]: [
          {
            firstName: {
              [Op.like]: `%${query}%`,
            },
          },
          {
            lastName: {
              [Op.like]: `%${query}%`,
            },
          },
        ],
      },
    });
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
    return this.EmployeeModel.findAll({
      ...query,
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: EmployeeAttachment,
          where: {
            fieldName: 'logo'
          },
          required: false
        }
      ],
      attributes: {
        include: [
          [
            literal(`(
              SELECT COUNT(*)
              FROM equipment
              WHERE equipment.employeeId = Employee.id
            )`),
            'totalEquipmentAssigned'
          ]
        ]
      }
    });
  }

  async findAll(companyId): Promise<Employee[]> {
    return this.EmployeeModel.findAll({
      where: { companyId: companyId },
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: EmployeeAttachment,
          where: {
            fieldName: 'logo'
          },
          required: false
        }
      ],
      attributes: {
        include: [
          [
            literal(`(
              SELECT COUNT(*)
              FROM equipment
              WHERE equipment.employeeId = Employee.id
            )`),
            'totalEquipmentAssigned'
          ]
        ]
      }
    });
  }

  findOne(id: string): Promise<Employee> {
    return this.EmployeeModel.findOne({
      where: {
        id,
      },
      include: [
        { model: EmployeeAttachment },
        { model: Equipment }
      ],
      attributes: {
        include: [
          [
            literal(`(
              SELECT COUNT(*)
              FROM equipment
              WHERE equipment.employeeId = Employee.id
            )`),
            'totalEquipmentAssigned'
          ]
        ]
      }
    });
  }

  async remove(id: string): Promise<void> {
    const employee = await this.findOne(id);
    await employee.destroy();
  }

}
