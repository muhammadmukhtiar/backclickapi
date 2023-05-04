import { Address } from 'src/address/models/address.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { AddressService } from 'src/address/address.service';
import { AddressController } from 'src/address/address.controller';

@Module({
  imports: [SequelizeModule.forFeature([Address])],
  controllers: [AddressController],
  providers: [AddressService]
})
export class AddressModule {}
