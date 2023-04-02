import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { HttpStatus } from '@nestjs/common';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import {
  Body,
  ParseFilePipeBuilder,
  UploadedFile,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { diskStorage } from 'multer';

export class SampleDto {
  name: string;
  srcPath: string
  employeeId: string
  companyId: string
}

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // sample file without validation
  // path BaseURl/file
  // @UseInterceptors(FileInterceptor('file'))
  // @UseInterceptors(FileInterceptor('file', {dest: 'uploads/'}))

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
  @Post('file')
  uploadFile(
    @Body() body: SampleDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const data = {
      body,
      srcPath: file.originalname,
    };
    return this.appService.create(data);
  }
}
