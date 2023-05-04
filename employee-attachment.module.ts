import { Module } from '@nestjs/common';
import { EmployeeAttachmentService } from 'src/employee-attachment/employee-attachment.service';
import { EmployeeAttachmentController } from 'src/employee-attachment/employee-attachment.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { EmployeeAttachment } from 'src/employee-attachment/models/employee-attachment';

@Module({
  imports: [SequelizeModule.forFeature([EmployeeAttachment])],
  controllers: [EmployeeAttachmentController],
  providers: [EmployeeAttachmentService]
})
export class EmployeeAttachmentModule { }
