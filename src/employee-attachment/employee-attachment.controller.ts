import { EmployeeAttachmentService } from 'src/employee-attachment/employee-attachment.service';
import { CreateEquipmentAttachmentDto } from 'src/employee-attachment/dto/create-employee-attachment.dto';
import { UpdateEquipmentAttachmentDto } from 'src/employee-attachment/dto/update-employee-attachment.dto';
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

@Controller('employee-attachment')
export class EmployeeAttachmentController {
  constructor(
    private readonly employeeAttachmentService: EmployeeAttachmentService,
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

    return this.employeeAttachmentService.create(data);
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
    const employeeId = body.employeeId;
    let response;
    let deleted_response;
    const deletedattachment1 = body.deletedAttachment;
    if (deletedattachment1 && deletedattachment1.length) {
      const deletedattachment = JSON.parse(deletedattachment1);
      for (const fileObj of deletedattachment) {
        try {
          // await fs.promises.unlink(fileObj.path);
          await this.employeeAttachmentService.remove(fileObj.id);
        } catch (err) {
          console.error(`Error removing file: ${err.message}`);
        }
      }
    }
    if (files && files.length) {
      files.map(file => {
        const dbdata = {
          employeeId: employeeId,
          fieldName: file.fieldname,
          path: 'files/' + file.filename,
        }
        dbdata2.push(dbdata)
      });
      response = await this.employeeAttachmentService.createMany(dbdata2);
    }
    return {
      response,
      deleted_response
    };
  }

  @Post()
  create(@Body() createEquipmentAttachmentDto: CreateEquipmentAttachmentDto) {
    return this.employeeAttachmentService.create(createEquipmentAttachmentDto);
  }

  @Get()
  findAll() {
    return this.employeeAttachmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeeAttachmentService.findOne(id);
  }

  @Post(':id')
  update(
    @Param('id') id: string,
    @Body() updateEquipmentAttachmentDto: UpdateEquipmentAttachmentDto,
  ) {
    return this.employeeAttachmentService.update(id, updateEquipmentAttachmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeeAttachmentService.remove(id);
  }
}
