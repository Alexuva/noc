import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entitty";
import { LogRepository } from "../../domain/repository/log.repository";

export class LogRepositoryImpl implements LogRepository {

    constructor(
        private readonly logDataSource:LogDatasource,// Se puede cambiar según necesidad.
    ){}
    
    async saveLog(log: LogEntity): Promise<void> {
        this.logDataSource.saveLog(log);
    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        return this.logDataSource.getLogs(severityLevel);
    }

}