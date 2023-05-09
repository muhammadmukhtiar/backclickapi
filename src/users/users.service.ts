import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) { }

  async findOne(user): Promise<User | undefined> {
    return this.userModel.findOne({
      where: {
        ...user,
        isActive: true
      },
    });
  }

  create(createDto: any): Promise<User> {
    return this.userModel.create({
      ...createDto
    });
  }

  update(id: string, createDto: any): Promise<User> {
    return this.userModel.create({
      ...createDto
    });
  }

  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

}
