import { Repository } from "../repository";
import { ILoginRepository } from "../loginRepository";

export class MockLoginRepository extends Repository implements ILoginRepository {
    public async save(): Promise<any> {
        return {
            headers: [
                { Authorization: "token" },
            ],
        };
    }
}
