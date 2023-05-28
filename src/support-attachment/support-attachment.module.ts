import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SupportAttachment } from './models/support-attachment';
import { SupportAttachmentService } from './support-attachment.service';
import { SupportAttachmentController } from './support-attachment.controller';

@Module({
  imports: [SequelizeModule.forFeature([SupportAttachment])],
  controllers: [SupportAttachmentController],
  providers: [SupportAttachmentService]
})
export class SupportAttachmentModule { }
