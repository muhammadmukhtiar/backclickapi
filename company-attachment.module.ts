import { Module } from '@nestjs/common';
import { CompanyAttachmentService } from 'src/company-attachment/company-attachment.service';
import { CompanyAttachmentController } from 'src/company-attachment/company-attachment.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { CompanyAttachment } from 'src/company-attachment/models/company-attachment';

@Module({
  imports: [SequelizeModule.forFeature([CompanyAttachment])],
  controllers: [CompanyAttachmentController],
  providers: [CompanyAttachmentService]
})
export class CompanyAttachmentModule { }
