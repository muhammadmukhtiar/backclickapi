import { User } from 'src/users/models/user.model';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { EmployeesModule } from './employees/employees.module';
import { CompanyModule } from './company/company.module';
import { EquipmentModule } from './equipment/equipment.module';
import { Company } from 'src/Company/models/company.model';
import { Employee } from './employees/models/employee.model';
import { Equipment } from './equipment/models/Equipment.model';
import { LoginModule } from './login/login.module';
import { Login } from './login/models/login.model';
import { EquipmentOfferModule } from './equipment-offer/equipment-offer.module';
import { EquipmentOffer } from './equipment-offer/models/equipment-offer.model';
import { AddressModule } from './address/address.module';
import { Address } from './address/models/address.model';
import { FileUpload } from './fileUpload.model';
import { Comment } from './comment/models/comment.model';
import { CommentModule } from './comment/comment.module';
import { CountryModule } from './country/country.module';
import { Country } from './country/models/Country.model';
import { ViewFilesController } from './viewFiles';
import { TagModule } from './tag/tag.module';
import { Tag } from './tag/models/tag.model';
import { CompanyAttachmentModule } from './company-attachment/company-attachment.module';
import { CompanyAttachment } from './company-attachment/models/company-attachment';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    SequelizeModule.forFeature([FileUpload]),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'backclick',
      models: [
        User,
        Company,
        Employee,
        Equipment,
        Login,
        EquipmentOffer,
        Address,
        FileUpload,
        Comment,
        Country,
        Tag,
        CompanyAttachment,
      ],
      autoLoadModels: true,
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    EmployeesModule,
    CompanyModule,
    EquipmentModule,
    LoginModule,
    EquipmentOfferModule,
    AddressModule,
    CommentModule,
    CountryModule,
    TagModule,
    CompanyAttachmentModule,
  ],
  controllers: [AppController, ViewFilesController],
  providers: [AppService],
})
export class AppModule { }
