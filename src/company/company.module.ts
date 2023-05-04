import { Module } from '@nestjs/common';
import { CompanyService } from 'src/company/company.service';
import { CompanyController } from 'src/company/company.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Company } from 'src/company/models/company.model';

@Module({
  imports: [SequelizeModule.forFeature([Company])],
  controllers: [CompanyController],
  providers: [CompanyService]
})
export class CompanyModule {}
