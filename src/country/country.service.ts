import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { Country } from './models/Country.model';

@Injectable()
export class CountryService {
  constructor(
    @InjectModel(Country)
    private readonly equipmentModel: typeof Country,
  ) {}

  create(createDto: CreateCountryDto): Promise<Country> {
    return this.equipmentModel.create({
      ...createDto,
    });
  }

  update(id: string, createDto: UpdateCountryDto): Promise<any> {
    return this.equipmentModel.update({
        ...createDto,
      },
      {
        where: {
          id,
        },
      },
    );
  }

  async findAll(): Promise<Country[]> {
    return this.equipmentModel.findAll();
  }

  search(query: any): Promise<Country[]> {
    return this.equipmentModel.findAll({
      where: {
        ...query,
      },
    });
  }

  findOne(id: string): Promise<Country> {
    return this.equipmentModel.findOne({
      where: {
        id,
      },
    });
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await user.destroy();
  }
}


