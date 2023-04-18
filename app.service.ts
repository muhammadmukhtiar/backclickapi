import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FileUpload } from './fileUpload.model';

@Injectable()
export class AppService {

  constructor(
    @InjectModel(FileUpload)
    private readonly userModel: typeof FileUpload,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  create(createUserDto): Promise<FileUpload> {
    return this.userModel.create({
      ...createUserDto
    });
  }

  async findAll(): Promise<FileUpload[]> {
    return this.userModel.findAll();
  }

  findOne(id: string): Promise<FileUpload> {
    return this.userModel.findOne({
      where: {
        id,
      },
    });
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await user.destroy();
  }
}
