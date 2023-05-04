import { Module } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/models/user.model';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
