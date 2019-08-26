import { IRepository } from "./repository";
import { LoginRepository } from "./loginRepository";
import { ContentRepository } from "./contentRepository";
import { XmlContentRepository } from "./xmlContentRepository";
import { MockLoginRepository } from "./mock/mockLoginRepository";
import { MockContentRepository } from "./mock/mockContentRepository";
import { MockXmlContentRepository } from "./mock/mockXmlContentRepository";
import { Logger } from "../loggers/logger";

const repositories: any = {
    LoginRepository,
    ContentRepository,
    XmlContentRepository,
};

const mockRepositories: any = {
    MockLoginRepository,
    MockContentRepository,
    MockXmlContentRepository,
};

export class RepositoryFactory {
    public static get(name: string): IRepository {
        Logger.getLogger().info(`EnvName=${process.env.VUE_APP_ENV_NAME}`);
        const useMock: boolean = this.toBoolean(process.env.VUE_APP_USE_MOCK);

        const className: string = useMock ? `Mock${name}Repository` : `${name}Repository`;
        Logger.getLogger().debug(`Repository:${className} dynamic create.`);

        return useMock ? new mockRepositories[className](name) : new repositories[className](name);
    }

    private static toBoolean(booleanStr: string | undefined): boolean {
        if (!booleanStr) {
            return false;
        }
        return booleanStr.toLowerCase() === "true";
    }
}
