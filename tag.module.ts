import { Module } from '@nestjs/common';
import { TagService } from 'src/tag/tag.service';
import { TagController } from 'src/tag/tag.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Tag } from 'src/tag/models/tag.model';

@Module({
  imports: [SequelizeModule.forFeature([Tag])],
  controllers: [TagController],
  providers: [TagService]
})
export class TagModule {}
