import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Company } from 'src/Company/models/company.model';

@Module({
  imports: [SequelizeModule.forFeature([Company])],
  controllers: [CompanyController],
  providers: [CompanyService]
})
export class CompanyModule {}
