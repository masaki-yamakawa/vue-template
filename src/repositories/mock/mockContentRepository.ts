import { Repository } from "../repository";
import { IContentRepository } from "../contentRepository";

export class MockContentRepository extends Repository implements IContentRepository {
    public async find(): Promise<any> {
        return {
            data: [
                { id: 0, title: "title0", url: "http://localhost:8000/url0" },
                { id: 1, title: "title1", url: "http://localhost:8000/url1" },
            ],
        };
    }
}
