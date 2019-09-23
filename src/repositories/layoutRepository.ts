import { Repository, IRepository } from "./repository";

export interface ILayoutRepository extends IRepository {
}

export class LayoutRepository extends Repository implements ILayoutRepository {
}
