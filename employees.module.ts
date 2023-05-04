import { UsersModule } from './../users/users.module';
import { Module } from '@nestjs/common';
import { EmployeesService } from 'src/employees/employees.service';
import { EmployeesController } from 'src/employees/employees.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Employee } from 'src/employees/models/employee.model';

@Module({
  imports: [
    UsersModule,
    SequelizeModule.forFeature([Employee]),
  ],
  controllers: [EmployeesController],
  providers: [EmployeesService]
})
export class EmployeesModule { }
