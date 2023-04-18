
import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import * as fs from 'fs';

@Controller('files')
export class ViewFilesController {
  @Get(':filename')
  async serveImage(@Param('filename') filename: string, @Res() res: Response) {
    const fileStream = fs.createReadStream(`public/uploads/${filename}`);
    fileStream.pipe(res);
  }
}
