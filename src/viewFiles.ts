
import { Controller, Get, NotFoundException, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import * as fs from 'fs';
import { Public } from './auth/decorators/public.decorator';

@Controller('files')
export class ViewFilesController {
  @Get(':filename')
  @Public()
  async serveImage(@Param('filename') filename: string, @Res() res: Response) {
    try {
      // const fileData = await fs.promises.readFile(`public/uploads/${filename}`, 'utf-8');
      // return { data: fileData };
      const fileStream = fs.createReadStream(`public/uploads/${filename}`);
      fileStream.pipe(res);
    } catch (err) {
      throw new NotFoundException(`File ${filename} not found`);
    }

    // const fileStream = fs.createReadStream(`public/uploads/${filename}`);
    // fileStream.pipe(res);
  }
}
