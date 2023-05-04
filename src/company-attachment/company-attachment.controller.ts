import { CompanyAttachmentService } from 'src/company-attachment/company-attachment.service';
import { CreateCompanyAttachmentDto } from 'src/company-attachment/dto/create-company-attachment.dto';
import { UpdateCompanyAttachmentDto } from 'src/company-attachment/dto/update-company-attachment.dto';
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

@Controller('company-attachment')
export class CompanyAttachmentController {
  constructor(
    private readonly companyAttachmentService: CompanyAttachmentService,
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

    return this.companyAttachmentService.create(data);
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
    const companyid = body.companyId;
    let response;
    let deleted_response;
    const deletedattachment = body.deletedAttachment;
    if (deletedattachment && deletedattachment.length) {
      for (const fileObj of deletedattachment) {
        try {
          await fs.promises.unlink(fileObj.path);
          this.companyAttachmentService.remove(fileObj.id);
        } catch (err) {
          console.error(`Error removing file: ${err.message}`);
        }
      }
      // deleted_response = await Promise.all(deletedattachment.map((id) => this.companyAttachmentService.remove(id)));
    }
    if (files && files.length) {
      files.map(file => {
        const dbdata = {
          companyId: companyid,
          fieldName: file.fieldname,
          path: 'files/' + file.filename,
        }
        dbdata2.push(dbdata)
      });
      response = await this.companyAttachmentService.createMany(dbdata2);
    }
    return {
      response,
      deleted_response
    };
  }

  @Post()
  create(@Body() createCompanyAttachmentDto: CreateCompanyAttachmentDto) {
    return this.companyAttachmentService.create(createCompanyAttachmentDto);
  }

  @Get()
  findAll() {
    return this.companyAttachmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companyAttachmentService.findOne(id);
  }

  @Post(':id')
  update(
    @Param('id') id: string,
    @Body() updateCompanyAttachmentDto: UpdateCompanyAttachmentDto,
  ) {
    return this.companyAttachmentService.update(id, updateCompanyAttachmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companyAttachmentService.remove(id);
  }
}
