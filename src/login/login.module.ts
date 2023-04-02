import { AuthModule } from './../auth/auth.module';
import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Login } from './models/login.model';

@Module({
  imports: [SequelizeModule.forFeature([Login])],
  controllers: [LoginController],
  providers: [LoginService],
  exports: [LoginService],
})
export class LoginModule {}
