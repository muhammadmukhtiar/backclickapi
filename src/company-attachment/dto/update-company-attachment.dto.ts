import { PartialType } from '@nestjs/mapped-types';
import { CreateCompanyAttachmentDto } from './create-company-attachment.dto';

export class UpdateCompanyAttachmentDto extends PartialType(CreateCompanyAttachmentDto) {}
