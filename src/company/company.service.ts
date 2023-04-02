import { UpdateCompanyDto } from './dto/update-company.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCompanyDto } from './dto/create-company.dto';
import { Company } from './models/company.model';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(Company)
    private readonly companyModel: typeof Company,
  ) {}

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
    return this.companyModel.findAll();
  }

  findOne(id: string): Promise<Company> {
    return this.companyModel.findOne({
      where: {
        id,
      },
    });
  }

  search(query: any): Promise<Company[]> {
    return this.companyModel.findAll({
      where: {
        ...query,
      },
    });
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await user.destroy();
  }
}