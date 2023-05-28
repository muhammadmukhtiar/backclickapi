import { SupportAttachmentService } from './support-attachment.service';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { diskStorage } from 'multer';
import {
  Body,
  UploadedFile,
  Controller,
  Get,
  Post,
  UseInterceptors,
  Delete,
  Param,
  UploadedFiles,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { extname } from 'path';
import * as fs from 'fs';

export class SampleDto {
  fileType: string;
  path: string;
  companyId: string;
  fieldName: string;
}

@Controller('support-attachment')
export class SupportAttachmentController {
  constructor(
    private readonly supportAttachmentService: SupportAttachmentService,
  ) { }

  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public/uploads',
        filename: function (req, file, callback) {
          callback(null, file.originalname);
        },
      }),
    }),
  )
  @Post('upload')
  uploadFile(
    @Body() body: SampleDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const data = {
      ...body,
      path: 'files/' + file.originalname,
    };

    return this.supportAttachmentService.create(data);
  }

  @Post('multiple-uploads')
  @UseInterceptors(AnyFilesInterceptor({
    storage: diskStorage({
      destination: './public/uploads',
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const extension = extname(file.originalname);
        const fileName = file.fieldname + '-' + uniqueSuffix + extension;
        callback(null, fileName);
      },
    }),
  }
  ))
  async uploadFiles(@UploadedFiles() files, @Body() body: any) {
    const dbdata2 = [];
    const supportId = body.supportId;
    let response;
    let deleted_response;
    const deletedattachment1 = body.deletedAttachment;
    if (deletedattachment1 && deletedattachment1.length) {
      const deletedattachment = JSON.parse(deletedattachment1);
      for (const fileObj of deletedattachment) {
        try {
          // await fs.promises.unlink(fileObj.path);
          await this.supportAttachmentService.remove(fileObj.id);
        } catch (err) {
          console.error(`Error removing file: ${err.message}`);
        }
      }

      // deleted_response = await Promise.all(deletedattachment.map((id) => this.supportAttachmentService.remove(id)));
    }
    if (files && files.length) {
      files.map(file => {
        const dbdata = {
          supportId: supportId,
          fieldName: file.fieldname,
          path: 'files/' + file.filename,
        }
        dbdata2.push(dbdata)
      });
      response = await this.supportAttachmentService.createMany(dbdata2);
    }
    return {
      response,
      deleted_response
    };
  }

  @Post()
  create(@Body() createEquipmentAttachmentDto) {
    return this.supportAttachmentService.create(createEquipmentAttachmentDto);
  }

  @Get()
  findAll() {
    return this.supportAttachmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.supportAttachmentService.findOne(id);
  }

  @Post(':id')
  update(
    @Param('id') id: string,
    @Body() updateEquipmentAttachmentDto,
  ) {
    return this.supportAttachmentService.update(id, updateEquipmentAttachmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.supportAttachmentService.remove(id);
  }
}
