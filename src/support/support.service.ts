import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Support } from './models/support.model';
import { Company } from 'src/company/models/company.model';
import { SupportAttachment } from 'src/support-attachment/models/support-attachment';

@Injectable()
export class SupportService {
  constructor(
    @InjectModel(Support)
    private readonly supportModel: typeof Support,
  ) { }

  create(createSupportDto) {
    return this.supportModel.create({
      ...createSupportDto,
    });
  }

  findAll(companyId) {
    return this.supportModel.findAll({
      where: { companyId: companyId },
      order: [['createdAt', 'DESC']],
      include: [
        { model: Company },
      ],
    });
  }

  findOne(id: string): Promise<Support> {
    return this.supportModel.findOne({
      where: {
        id,
      },
      include: [
        { model: Company },
        { model: SupportAttachment }
      ],
    });
  }


  update(id: string, updateDto): Promise<any> {
    return this.supportModel.update(
      {
        ...updateDto,
      },
      {
        where: {
          id,
        },
      },
    );
  }

  remove(id: number) {
    return `This action removes a #${id} support`;
  }


  findForTdo() {
    return this.supportModel.findAll({
      where: { status: 'active' },
      order: [['createdAt', 'DESC']],
      include: [
        { model: Company },
      ],
    });
  }
}
