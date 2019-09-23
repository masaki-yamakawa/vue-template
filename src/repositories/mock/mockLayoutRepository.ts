import { Repository } from "../repository";
import { ILayoutRepository } from "../layoutRepository";

export class MockLayoutRepository extends Repository implements ILayoutRepository {
    public async save(): Promise<any> {
        return {};
    }
}
