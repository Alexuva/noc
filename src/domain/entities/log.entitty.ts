export enum LogSeverityLevel {
    LOW = 'low',
    MEDIUM = 'medium',
    HIGH = 'high'
}

export class LogEntity {

    public level:LogSeverityLevel; //Enum
    public message:string;
    public createdAt:Date;

    constructor( message:string, level:LogSeverityLevel ){
        this.message = message;
        this.level = level;
        this.createdAt = new Date();
    }

    static fromJson(jsonData:string):LogEntity{
        const { message, level, createdAt }:{message:string, level:LogSeverityLevel, createdAt:string} = JSON.parse(jsonData);
        const log = new LogEntity(message, level);
        log.createdAt = new Date(createdAt);

        return log;
    }

}