import { ConsoleFormattedStream, createLogger } from "browser-bunyan";
import * as bunyan from "bunyan";
import { ServerStream } from "@browser-bunyan/server-stream";

export class Logger {
    public static getLogger(loggerName: string = "app"): bunyan {
        let logger: Logger = this.loggers[loggerName];
        if (!logger) {
            logger = new Logger(loggerName);
            this.loggers[loggerName] = logger;
        }
        return logger.instance;
    }
    private static loggers: { [key: string]: any; } = {};

    private readonly consoleLogLevel: bunyan.LogLevelString =
        process.env.VUE_APP_CONSOLE_LOG_LEVEL ? process.env.VUE_APP_CONSOLE_LOG_LEVEL as bunyan.LogLevelString : "info";
    private readonly enablePostSvrLog: boolean =
        process.env.VUE_APP_ENABLE_POST_SVR_LOG ? this.toBoolean(process.env.VUE_APP_ENABLE_POST_SVR_LOG) : false;
    private readonly postSvrLogUrl: string =
        process.env.VUE_APP_POST_SVR_LOG_URL ? process.env.VUE_APP_POST_SVR_LOG_URL : "/api/v1/log";
    private readonly postSvrLogLevel: bunyan.LogLevelString =
        process.env.VUE_APP_POST_SVR_LOG_LEVEL ? process.env.VUE_APP_POST_SVR_LOG_LEVEL as bunyan.LogLevelString : "warn";

    private instance: bunyan;

    private constructor(loggerName: string) {
        const newLogger: bunyan = createLogger({
            name: loggerName,
            streams: [
                {
                    level: this.consoleLogLevel,
                    stream: new ConsoleFormattedStream(),
                },
            ],
        });
        if (this.enablePostSvrLog) {
            newLogger.addStream({
                level: this.postSvrLogLevel,
                stream: new ServerStream({
                    url: this.postSvrLogUrl,
                    method: "POST",
                    throttleInterval: 60000,
                }),
            });
        }
        this.instance = newLogger;
    }

    private toBoolean(booleanStr: string | undefined): boolean {
        if (!booleanStr) {
            return false;
        }
        return booleanStr.toLowerCase() === "true";
    }
}
