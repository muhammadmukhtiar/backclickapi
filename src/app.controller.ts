import { AppService } from './app.service';
// import { AuthService } from './auth/auth.service';
import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  Param,
} from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { EmailService } from './email.service';
import { RolesGuard } from './auth/auth-strategy/roles-guard';

export class SampleDto {
  name: string;
  srcPath: string;
  employeeId: string;
  companyId: string;
}

@Controller()
@UseGuards(new RolesGuard(['employee', 'company', 'admin']))
export class AppController {
  constructor(
    private readonly appService: AppService,
    // private readonly authService: AuthService,
    private readonly sequelize: Sequelize,
    private readonly emailService: EmailService,
  ) { }




  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @UseInterceptors(
  //   FileInterceptor('file', {
  //     storage: diskStorage({
  //       destination: './public/uploads',
  //       filename: function (req, file, callback) {
  //         callback(null, file.originalname);
  //       },
  //     }),
  //   }),
  // )
  // @Post('file')
  // uploadFile(
  //   @Body() body: SampleDto,
  //   @UploadedFile() file: Express.Multer.File,
  // ) {
  //   const data = {
  //     srcPath: 'files/'+ file.originalname,
  //   };
  //   return this.appService.create(data);
  // }

  @Get('state/:id')
  async getState(@Param('id') id: string) {
    console.log('country_id', id);
    const query = `SELECT * FROM state_master where country_id=${id}`;
    const [results] = await this.sequelize.query(query);
    return results;
  }

  @Get('city/:id')
  async getCity(@Param('id') id: string) {
    const query = `SELECT * FROM city_master where state_id=${id}`;
    const [results] = await this.sequelize.query(query);
    return results;
  }

  @Post('feed-back')
  async sendEmail(@Body() feedBackDto: any, @Request() req): Promise<any> {
    const fromEmail = req?.user?.email;
    const to = feedBackDto.to || 'mukhtiarfsd@gmail.com';
    const subject = 'Test Email';
    const text = feedBackDto.feedback;
    await this.emailService.sendEmail(to, fromEmail, subject, text);
    return {
      text: 'email sent to your email'
    }
  }
}
