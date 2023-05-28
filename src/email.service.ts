import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'mukhtiarfsd@gmail.com',
                pass: 'vtldcsswccxolygh',
            },
        });
    }

    async sendEmail(to: string, from: string, subject: string, text: string): Promise<void> {
        await this.transporter.sendMail({
            from: from,
            to,
            subject,
            text,
        });
    }
}
