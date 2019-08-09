import { Repository, IRepository } from "./repository";

export interface IContentRepository extends IRepository {
}

export class ContentRepository extends Repository implements IContentRepository {
}
