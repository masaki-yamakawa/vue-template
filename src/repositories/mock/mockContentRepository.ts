import { Repository } from "../repository";
import { IContentRepository } from "../contentRepository";

export class MockContentRepository extends Repository implements IContentRepository {
    public async find(): Promise<any> {
        return {
            data: [
                { id: 0, title: "Embeded View 1", url: "http://maps.google.co.jp/maps?&output=embed" },
                // tslint:disable-next-line:max-line-length
                { id: 1, title: "Embeded View 2", url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3261.4425090625195!2d136.88223540000004!3d35.170521900000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x600376e794d78b89%3A0x81f7204bf8261663!2z5ZCN5Y-k5bGL6aeF!5e0!3m2!1sja!2sjp!4v1433317763525" },
                { id: 2, title: "Embeded View 3", url: "https://www.youtube.com/embed/sk6uU8gb8PA?rel=0" },
                { id: 3, title: "Blank page", url: "/app/blank" },
                { id: 4, title: "View 1", url: "http://localhost:8000/view1" },
                { id: 5, title: "View 2", url: "http://localhost:8000/view2" },
            ],
        };
    }
}
