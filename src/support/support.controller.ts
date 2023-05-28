import { Controller, Get, Request, Post, Body, Param, Delete } from '@nestjs/common';
import { SupportService } from './support.service';
import { EmailService } from 'src/email.service';

@Controller('support')
export class SupportController {
  constructor(
    private readonly supportService: SupportService,
    private readonly emailService: EmailService,
  ) { }

  @Post()
  async create(@Body() createSupportDto, @Request() req) {
    const companyId = req.user?.referencedId;
    createSupportDto['companyId'] = companyId;
    const fromEmail = req?.user?.email;
    const to = createSupportDto.to || 'mukhtiarfsd@gmail.com';
    const subject = 'Support Ticket';
    const text = createSupportDto.description;
    await this.emailService.sendEmail(to, fromEmail, subject, text);
    return this.supportService.create(createSupportDto);
  }

  @Get('list/:companyId')
  findAll(@Param('companyId') companyId) {
    return this.supportService.findAll(companyId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.supportService.findOne(id);
  }

  @Post(':id')
  update(@Param('id') id: string, @Body() updateSupportDto) {
    return this.supportService.update(id, updateSupportDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.supportService.remove(+id);
  }
}
