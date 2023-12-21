import fs from 'fs';
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entitty";

export class FileSystemDatasource implements LogDatasource{

    private readonly logPath = 'logs/';
    private readonly allLogsPath = 'logs/logs-all.log';
    private readonly mediumLogsPath = 'logs/logs-medium.log';
    private readonly highLogsPath = 'logs/logs-high.log';

    constructor(){
        this.createLogsFiles();
    }

    private createLogsFiles(){

        if(!fs.existsSync(this.logPath)){
            fs.mkdir(this.logPath, (error)=>{
                if(error) console.error('Unable to create logs folder');
            });
        }

        [
            this.allLogsPath,
            this.mediumLogsPath,
            this.highLogsPath
        ].forEach( path => {
            if(fs.existsSync(path)) return;
            fs.writeFile(path, '', (error)=>{
                if(error) console.error(`Unable to create log file ${path}`);
            })
        })

    }

    async saveLog(log: LogEntity): Promise<void> {

        const logAsJson:string = `${JSON.stringify(log)}\n`;
        
        fs.appendFile( this.allLogsPath, logAsJson, (error)=>{
            if(error) console.error(`Unable to write log in desired folder. Log: ${log}`);
        });

        if(log.level === LogSeverityLevel.LOW) return;
        if(log.level === LogSeverityLevel.MEDIUM){
            fs.appendFile( this.mediumLogsPath, logAsJson, (error)=>{
                if(error) console.error(`Unable to write log in desired folder. Log: ${log}`);
            });
        }else{
            fs.appendFile( this.highLogsPath, logAsJson,(error)=>{
                if(error) console.error(`Unable to write log in desired folder. Log: ${log}`);
            });
        }

    }

    private getLogsFromFile(path:string):LogEntity[]{
        const content:string = fs.readFileSync(path, 'utf-8');
        const logs:LogEntity[] = content.split('\n').map(
            log => LogEntity.fromJson(log)
        );

        return logs;
    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        
        switch(severityLevel){
            case LogSeverityLevel.LOW:
                return this.getLogsFromFile(this.allLogsPath);

            case LogSeverityLevel.MEDIUM:
                return this.getLogsFromFile(this.mediumLogsPath);

            case LogSeverityLevel.HIGH:
                return this.getLogsFromFile(this.highLogsPath);

            default:
                throw new Error(`${ severityLevel } not implemented`);

        }

    }

}