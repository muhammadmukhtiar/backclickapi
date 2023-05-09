// import { User } from 'src/users/models/user.model';
import { Sequelize } from 'sequelize-typescript';
import { Company } from 'src/company/models/company.model';
import { Employee } from 'src/employees/models/Employee.model';
import { Equipment } from 'src/equipment/models/Equipment.model';

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
      sequelize.addModels([Company, Employee, Equipment]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
