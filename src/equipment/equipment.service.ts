import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { Equipment } from 'src/equipment/models/equipment.model';
import { generateQuery } from 'src/utility/helpers';
import { EquipmentAttachment } from 'src/equipment-attachment/models/equipment-attachment';
import { EquipmentOffer } from 'src/equipment-offer/models/equipment-offer.model';
import { Employee } from 'src/employees/models/employee.model';
import { Company } from 'src/company/models/company.model';
import { Op, literal } from 'sequelize';
import { EmployeeAttachment } from 'src/employee-attachment/models/employee-attachment';
import { CompanyAttachment } from 'src/company-attachment/models/company-attachment';
import { EquipmentActivity } from 'src/equipmentactivity/models/equipmentactivity.model';

@Injectable()
export class EquipmentService {
  constructor(
    @InjectModel(Equipment)
    private readonly equipmentModel: typeof Equipment,
  ) { }

  async create(createDto): Promise<Equipment> {
    const equipment = this.equipmentModel.build(createDto);
    await equipment.save();
    if (createDto.assignedToEmployee && createDto.assignedToEmployee.length) {
      await Equipment.addAssignedActivity(equipment);
    }
    return equipment.reload();
  }

  async update(id: string, updateDto): Promise<any> {
    const equipment = await this.equipmentModel.findByPk(id);
    if (!equipment) {
      throw new NotFoundException('Equipment not found');
    }
    await equipment.update(updateDto);
    if (updateDto.assignedToEmployee && updateDto.assignedToEmployee.length) {
      await Equipment.addAssignedActivity(equipment);
    }
    return equipment.reload();
  }

  async updateMany(updateDto: any[]): Promise<any> {

    for (const updateData of updateDto) {
      try {
        const { id, ...rest } = updateData;
        await this.equipmentModel.update({ ...rest, }, {
          where: {
            id,
          },
        },
        );

      } catch (error) {
        // Handle error for individual update
        console.error(`Error updating equipment offer with ID ${updateData.id}: ${error.message}`);
      }
    }

    return true;
  }


  async findRemovedAssignedEqu(employeeId: number, offerIds): Promise<any[]> {
    const listOfArray = await this.equipmentModel.findAll({ where: { employeeId } });
    const existingOfferIds = listOfArray.map(offer => offer.dataValues.id);
    const updatedOfferIds = offerIds.map(offer => offer.id)
    const deletedOfferIds = existingOfferIds.filter(id => !updatedOfferIds.includes(id));
    return deletedOfferIds;
  }

  async findAll(companyId): Promise<Equipment[]> {
    return this.equipmentModel.findAll({
      where:
      {
        companyId: companyId,
        isActive: true,
        isDeleted: false
      },
      include: [
        { model: Employee },
        {
          model: EquipmentAttachment,
          where: {
            fieldName: 'logo'
          },
          required: false
        }
      ],
      order: [['createdAt', 'DESC']]
    });
  }


  async findAllCatalogs(): Promise<Equipment[]> {
    return this.equipmentModel.findAll({
      where:
      {
        isCatalog: true,
        isActive: true,
        isDeleted: false
      },
      order: [['createdAt', 'DESC']]
    });
  }

  async searchByName(query: string): Promise<Equipment[]> {
    return this.equipmentModel.findAll({
      where: {
        [Op.or]: [
          {
            title: {
              [Op.like]: `%${query}%`,
            },
          },
        ],
      },
    });
  }

  search(searchQuery: any, companyId): Promise<Equipment[]> {
    if (companyId) {
      searchQuery = {
        ...searchQuery,
        companyId: companyId,
        isActive: true,
        isDeleted: false
      }
    } else {
      searchQuery = {
        ...searchQuery,
        isActive: true,
        isDeleted: false
      }
    }
    const query = generateQuery(searchQuery);

    return this.equipmentModel.findAll({
      ...query,
      include: [
        { model: Employee },
        {
          model: EquipmentAttachment,
          where: {
            fieldName: 'logo'
          },
          required: false
        }
      ],
      order: [['createdAt', 'DESC']]
    });
  }

  findOne(id: string): Promise<Equipment> {
    return this.equipmentModel.findOne({
      where: {
        id,
      },
      include: [
        { model: EquipmentAttachment },
        { model: EquipmentOffer },
        {
          model: EquipmentActivity,
          include: [
            {
              model: Employee
            }
          ]
        },
        {
          model: Employee,
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
                  WHERE equipment.employeeId = ${id}
                )`),
                'totalEquipmentAssigned'
              ]
            ]
          }
        },
        {
          model: Company,
          include: [
            {
              model: CompanyAttachment,
              where: {
                fieldName: 'logo'
              },
              required: false
            }
          ],
        },
      ],
    });
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await user.destroy();
  }

  async removeMultiple(deletedOffers): Promise<void> {
    for (const id of deletedOffers) {
      try {
        const user = await this.findOne(id);
        await user.destroy();
      } catch (err) {
        console.error(`Error removing file: ${err.message}`);
      }
    }

  }

  handleEquipmentOffers(data) {
    return data
  }

  async getEquipmentForTodo() {
    return await this.equipmentModel.findAll({
      order: [['createdAt', 'DESC']],
      where: {
        employeeId: null,
        isActive: true,
        isDeleted: false
      },
      include: [
        {
          model: EquipmentAttachment,
          where: {
            fieldName: 'logo'
          },
          required: false
        }
      ],
    });
  }

}
