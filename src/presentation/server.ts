import { CronService } from "./cron/cron-service";
import { CheckService } from "../domain/use-cases/checks/check-service";

export class Server {

    public static start(){
        console.log('Server started...');

        CronService.createJob(
            '*/5 * * * * *',
            ()=>{
                const url:string = 'https://google.com';
                new CheckService(
                    ()=>console.log(`${url} success`),
                    (error)=>console.log(error),
                ).execute(url);
            }
        );

    }

}