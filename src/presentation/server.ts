import { CronService } from "./cron/cron-service";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { LogRepositoryImpl } from "../infraestructure/repositories/log-impl.repository";
import { FileSystemDatasource } from "../infraestructure/datasources/file-system.datasource";

const fileSystemLogRepository:LogRepositoryImpl = new LogRepositoryImpl(
    new FileSystemDatasource(),
    //new PostgressDatasource()
    //new MongoDatasource()
)

export class Server {

    public static start(){
        console.log('Server started...');

        CronService.createJob(
            '*/5 * * * * *',
            ()=>{
                const url:string = 'https://localhost:3000';
                new CheckService(
                    fileSystemLogRepository,
                    ()=>console.log(`${url} success`),
                    (error)=>console.log(error),
                ).execute(url);
            }
        );

    }

}