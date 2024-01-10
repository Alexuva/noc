import { CronService } from "./cron/cron-service";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { LogRepositoryImpl } from "../infraestructure/repositories/log-impl.repository";
import { FileSystemDatasource } from "../infraestructure/datasources/file-system.datasource";
import { EmailService } from "./email/email.service";

const fileSystemLogRepository:LogRepositoryImpl = new LogRepositoryImpl(
    new FileSystemDatasource(),
    //new PostgressDatasource()
    //new MongoDatasource()
)

const emailService = new EmailService();

export class Server {

    public static start(){
        console.log('Server started...');

        //Enviar email
        //new SendEmailLogs(emailService, fileSystemLogRepository).execute('email@example.com');

        CronService.createJob(
            '*/5 * * * * *',
            ()=>{
                const url:string = 'https://google.es';
                new CheckService(
                    fileSystemLogRepository,
                    ()=>console.log(`${url} success`),
                    (error)=>console.log(error),
                ).execute(url);
            }
        );

    }

}