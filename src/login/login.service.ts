import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateLoginDto } from './dto/create-login.dto';
import { Login } from './models/login.model';

@Injectable()
export class LoginService {
  constructor(
    @InjectModel(Login)
    private readonly loginModel: typeof Login,
  ) {}

  login(CreateLoginDto:CreateLoginDto): Promise<Login> {
    return this.loginModel.findOne({
      where: {
      ...CreateLoginDto
      },
    });
  }

  create(createDto: CreateLoginDto): Promise<Login> {
    return this.loginModel.create({
      ...createDto
    });
  }

  update(id: string,createDto: CreateLoginDto): Promise<Login> {
    return this.loginModel.create({
      ...createDto
    });
  }

  async findAll(): Promise<Login[]> {
    return this.loginModel.findAll();
  }

  findOne(email: string): Promise<Login> {
    return this.loginModel.findOne({
      where: {
        email,
      },
    });
  }

  async remove(id: string): Promise<void> {
    const modal = await this.findOne(id);
    await modal.destroy();
  }
}




