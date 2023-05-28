import { UpdateCompanyDto } from 'src/company/dto/update-company.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCompanyDto } from 'src/company/dto/create-company.dto';
import { Company } from 'src/company/models/company.model';
import { CompanyAttachment } from 'src/company-attachment/models/company-attachment';
import { Op } from 'sequelize';
import { generateQuery } from 'src/utility/helpers';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(Company)
    private readonly companyModel: typeof Company,
  ) { }

  create(createDto: CreateCompanyDto): Promise<Company> {
    return this.companyModel.create({
      ...createDto
    });
  }

  update(id: string, updateDto: UpdateCompanyDto): Promise<any> {
    return this.companyModel.update({
      ...updateDto,
    },
      {
        where: {
          id,
        },
      },
    );
  }

  async findAll(): Promise<Company[]> {
    return this.companyModel.findAll({
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: CompanyAttachment,
          where: {
            fieldName: 'logo'
          },
          required: false
        }
      ],
    });
  }

  findOne(id: string): Promise<Company> {
    return this.companyModel.findOne({
      where: {
        id,
      },
      include: [{ model: CompanyAttachment }],
    });
  }

  search(searchQuery: any): Promise<Company[]> {
    searchQuery = {
      ...searchQuery,
    }
    const query = generateQuery(searchQuery);
    return this.companyModel.findAll(
      {
        ...query,
        order: [['createdAt', 'DESC']],
        include: [
          {
            model: CompanyAttachment,
            where: {
              fieldName: 'logo'
            },
            required: false
          }
        ],
      }
    );
  }

  async searchByName(query: string): Promise<Company[]> {
    return this.companyModel.findAll({
      where: {
        [Op.or]: [
          {
            name: {
              [Op.like]: `%${query}%`,
            },
          },
        ],
      },
    });
  }


  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await user.destroy();
  }
}