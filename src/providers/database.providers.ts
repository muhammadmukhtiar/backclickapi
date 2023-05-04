import { User } from 'src/users/models/user.model';
import { Sequelize } from 'sequelize-typescript';
import { Company } from 'src/company/models/company.model';
import { Employee } from 'src/employees/models/employee.model';
import { Equipment } from 'src/equipment/models/equipment.model';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'password',
        database: 'nest',
      });
      sequelize.addModels([Company, User, Employee, Equipment]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
