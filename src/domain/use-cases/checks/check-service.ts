import { LogEntity, LogSeverityLevel } from "../../entities/log.entitty";
import { LogRepository } from "../../repository/log.repository";

interface CheckServiceUseCase {
    execute(url:string):Promise<boolean>;
}

type SuccessCallback = ()=>void;
type ErrorCallback = (error:string)=>void;


export class CheckService implements CheckServiceUseCase{

    constructor(
        private readonly logRepository: LogRepository,
        private readonly successCallback: SuccessCallback,
        private readonly errorCallback: ErrorCallback
    ){}

    async execute(url:string):Promise<boolean>{

        try{
            const response:Response = await fetch(url);
            if(!response.ok){
                throw new Error(`Error on check service ${url}`);
            }
            
            const log:LogEntity = new LogEntity(`Service ${url} working`, LogSeverityLevel.LOW)
            this.logRepository.saveLog(log);
            this.successCallback();
            return true;

        }catch(error){

            const log:LogEntity = new LogEntity(`${url} is not ok. ${error}`, LogSeverityLevel.HIGH);
            this.logRepository.saveLog(log);
            this.errorCallback(`${error}`);
            return false;

        }

    }

}