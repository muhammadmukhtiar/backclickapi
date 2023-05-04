import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from 'src/login/login.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Login } from 'src/login/models/login.model';

@Module({
  imports: [SequelizeModule.forFeature([Login])],
  controllers: [LoginController],
  providers: [LoginService],
  exports: [LoginService],
})
export class LoginModule {}
