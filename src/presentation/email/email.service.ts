import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/env.plugins';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entitty';

interface SendMailOptions {
    to: string|string[];
    subject: string;
    htmlBody: string;
    attachements?: Attachment[];
}

interface Attachment {
    filename: string;
    path: string;
}

export class EmailService {

    private transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: envs.MAIL,
            pass: envs.MAILER_KEY
        }
    });

    constructor(){}

    async sendEmail(options:SendMailOptions): Promise<boolean> {
        const { to, subject, htmlBody, attachements = [] } = options;

        try{
            const sentInformation = await this.transporter.sendMail({
                to: to,
                subject: subject,
                html : htmlBody,
                attachments: attachements
            });

            const log = new LogEntity('Email sent', LogSeverityLevel.LOW);
            

            return true;
        }catch(err){
            const log = new LogEntity('Email not sent', LogSeverityLevel.MEDIUM);
        
            return false;
        }
    }

    async sendEmailWithFileSystemLogs(to:string | string[]){
        const subject = 'Logs server';
        const htmlBody = `<h1>Logs de Sistema</h1>`;
        const attachements:Attachment[] = [
            { filename: 'logs-all.log', path: './logs/logs-all.log'}
        ];

        return this.sendEmail({ to, subject, attachements, htmlBody });
    }

}