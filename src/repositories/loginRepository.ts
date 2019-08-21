import { Repository, IRepository } from "./repository";

export interface ILoginRepository extends IRepository {
}

export class LoginRepository extends Repository implements ILoginRepository {
}
