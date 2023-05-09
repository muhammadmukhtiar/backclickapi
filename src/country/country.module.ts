import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { CountryService } from 'src/country/country.service';
import { CountryController } from 'src/country/country.controller';
import { Country } from 'src/country/models/country.model';

@Module({
  imports: [SequelizeModule.forFeature([Country])],
  controllers: [CountryController],
  providers: [CountryService]
})
export class CountryModule {}
