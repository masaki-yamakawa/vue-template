import { IRepository } from "./repository";
import { ContentRepository } from "./contentRepository";
import { MockContentRepository } from "./mock/mockContentRepository";

const repositories: any = {
    ContentRepository,
};

const mockRepositories: any = {
    MockContentRepository,
};

export class RepositoryFactory {
    public static get(name: string): IRepository {
        console.log(`EnvName=${process.env.VUE_APP_ENV_NAME}`);
        const useMock: boolean = this.toBoolean(process.env.VUE_APP_USE_MOCK);

        const className: string = useMock ? `Mock${name}Repository` : `${name}Repository`;
        console.log(`Repository:${className} dynamic create.`);

        return useMock ? new mockRepositories[className]() : new repositories[className]();
    }

    private static toBoolean(booleanStr: string): boolean {
        return booleanStr.toLowerCase() === "true";
    }
}
