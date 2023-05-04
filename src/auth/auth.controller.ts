import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { Public } from 'src/auth/decorators/public.decorator';
import { Sequelize } from 'sequelize-typescript';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly sequelize: Sequelize,
  ) { }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() body: { email: string, password: string }) {
    const user = await this.authService.getUser(body);
    if (!user) {
      throw new UnauthorizedException();
    }
    const userdata = { ...user.dataValues };
    userdata['first_name'] = userdata.firstName;
    userdata['last_name'] = userdata.lastName;
    userdata['created_at'] = userdata.createdAt;
    userdata['updated_at'] = userdata.updatedAt;
    userdata['email_verified_at'] = userdata.createdAt;

    return {
      ...userdata,
      api_token: this.authService.generateToken(userdata),
    };
  }



  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('verify_token')
  async verifyToken(@Body() body: { api_token: string }) {
    console.log("login 11")
    const user = await this.authService.verifyAuthToken(body.api_token);
    if (!user) {
      throw new UnauthorizedException();
    }

    return {
      ...user,
      api_token: body.api_token,
    };
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('send-password-email')
  async sendResetPasswordEmail(@Body('email') email: string) {
    return await this.authService.sendResetPasswordEmail(email);
  }

  @Get('validate-token/:token')
  async showResetPasswordForm(@Param('token') token: string) {
    const data = await this.authService.verifyToken(token);

    if (!data) {
      throw new NotFoundException('Invalid or expired token');
    }

    return data;
  }

  @Post('reset-password')
  async resetPassword(@Body() body: { email: string, token: string, password: string }) {
    const data = await this.authService.updatePassword(body.email, body.password, body.token);
    // await deleteToken(body.email, body.token);
    if (data.toString() == "0") {
      throw new NotFoundException('Invalid or expired token');
    }
    return data;
  }
}
