import { Module } from '@nestjs/common';
import { SupportService } from './support.service';
import { SupportController } from './support.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Support } from './models/support.model';
import { EmailService } from 'src/email.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Support])
  ],
  controllers: [SupportController],
  providers: [SupportService, EmailService],
  exports: [SupportService]
})
export class SupportModule { }
