import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { EmployeesModule } from 'src/employees/employees.module';
import { EquipmentModule } from 'src/equipment/equipment.module';
import { CompanyModule } from 'src/company/company.module';

@Module({
  imports: [
    EmployeesModule,
    EquipmentModule,
    CompanyModule
  ],
  controllers: [SearchController],
  providers: [SearchService]
})
export class SearchModule {}
