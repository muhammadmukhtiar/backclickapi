import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateAddressDto } from 'src/address/dto/create-address.dto';
import { UpdateAddressDto } from 'src/address/dto/update-address.dto';
import { Address } from 'src/address/models/address.model';

@Injectable()
export class AddressService {
  constructor(
    @InjectModel(Address)
    private readonly addressModel: typeof Address,
  ) {}

  create(createDto: CreateAddressDto): Promise<Address> {
    return this.addressModel.create({
      ...createDto
    });
  }

  update(id: string, updateDto: UpdateAddressDto): Promise<any> {
    return this.addressModel.update({
        ...updateDto,
      },
      {
        where: {
          id,
        },
      },
    );
  }

  async findAll(): Promise<Address[]> {
    return this.addressModel.findAll();
  }

  findOne(id: string): Promise<Address> {
    return this.addressModel.findOne({
      where: {
        id,
      },
    });
  }

  search(query: any): Promise<Address[]> {
    return this.addressModel.findAll({
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


