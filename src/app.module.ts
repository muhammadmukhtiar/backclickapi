import { User } from 'src/users/models/user.model';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from 'src/users/users.module';
import { EmployeesModule } from 'src/employees/employees.module';
import { CompanyModule } from 'src/company/company.module';
import { EquipmentModule } from 'src/equipment/equipment.module';
import { Company } from 'src/company/models/company.model';
import { Employee } from 'src/employees/models/employee.model';
import { Equipment } from 'src/equipment/models/equipment.model';
import { LoginModule } from 'src/login/login.module';
import { Login } from 'src/login/models/login.model';
import { EquipmentOfferModule } from 'src/equipment-offer/equipment-offer.module';
import { EquipmentOffer } from 'src/equipment-offer/models/equipment-offer.model';
import { AddressModule } from 'src/address/address.module';
import { Address } from 'src/address/models/address.model';
import { FileUpload } from 'src/fileUpload.model';
import { Comment } from 'src/comment/models/comment.model';
import { CommentModule } from 'src/comment/comment.module';
import { CountryModule } from 'src/country/country.module';
import { Country } from 'src/country/models/country.model';
import { ViewFilesController } from 'src/viewFiles';
import { TagModule } from 'src/tag/tag.module';
import { Tag } from 'src/tag/models/tag.model';
import { CompanyAttachmentModule } from 'src/company-attachment/company-attachment.module';
import { CompanyAttachment } from 'src/company-attachment/models/company-attachment';
import { AuthModule } from 'src/auth/auth.module';
import { EquipmentAttachmentModule } from 'src/equipment-attachment/equipment-attachment.module';
import { EquipmentAttachment } from 'src/equipment-attachment/models/equipment-attachment';
import { EmployeeAttachment } from 'src/employee-attachment/models/employee-attachment';
import { EmployeeAttachmentModule } from 'src/employee-attachment/employee-attachment.module';
import { SearchModule } from 'src/search/search.module';
import { SupportModule } from './support/support.module';
import { Support } from './support/models/support.model';
import { SupportAttachmentModule } from './support-attachment/support-attachment.module';
import { SupportAttachment } from './support-attachment/models/support-attachment';
import { EmailService } from './email.service';
import { TodoModule } from './todo/todo.module';
import { PaymentController } from './jazcash/payment.controller';
import { EquipmentactivityModule } from './equipmentactivity/equipmentactivity.module';
import { EquipmentActivity } from './equipmentactivity/models/equipmentactivity.model';

@Module({
  imports: [
    SequelizeModule.forFeature([FileUpload]),
    SequelizeModule.forRoot({
    
      // dialect: 'mysql',
      // host: 'sg1-ts5.a2hosting.com',
      // port: 3306,
      // username: 'loupeyco_backclick1',
      // password: 'g$G=%x~f8%Hw',
      // database: 'loupeyco_backclick1',


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
        EquipmentAttachment,
        EmployeeAttachment,
        Support,
        SupportAttachment,
        EquipmentActivity
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
    EquipmentAttachmentModule,
    EmployeeAttachmentModule,
    SearchModule,
    SupportModule,
    SupportAttachmentModule,
    TodoModule,
    EquipmentactivityModule
  ],
  controllers: [AppController, ViewFilesController, PaymentController],
  providers: [AppService, EmailService],
})
export class AppModule { }
