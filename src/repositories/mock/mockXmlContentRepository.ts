import { Repository } from "../repository";
import { IContentRepository } from "../contentRepository";

export class MockXmlContentRepository extends Repository implements IContentRepository {
    public async find(): Promise<any> {
        return {
            data: `<?xml version="1.0" encoding="UTF-8"?>
            <response>
                <contents>
                    <content id="1" title="Google Map:Overview" url="http://maps.google.co.jp/maps?output=embed">
                        <parent id="parent-1" />
                        <owner id="admin" />
                        <usage totalContentCount="2" />
                    </content>
                    <content id="2" title="Google Map:Nagoya Station" url="https://www.google.com/maps/embed">
                        <parent id="parent-1" />
                        <owner id="admin" />
                        <usage totalContentCount="2" />
                    </content>
                    <content id="3" title="YouTube:Tokyo Olympic" url="https://www.youtube.com/embed/sk6uU8gb8PA?rel=0">
                        <parent id="parent-2" />
                        <owner id="user1" />
                        <usage totalContentCount="1" />
                    </content>
                    <content id="4" title="Embeded View 1" url="http://localhost:8000/embeded-view1">
                        <parent id="parent-3" />
                        <owner id="admin" />
                        <usage totalContentCount="3" />
                    </content>
                    <content id="5" title="Embeded View 2" url="http://localhost:8000/embeded-view2">
                        <parent id="parent-3" />
                        <owner id="admin" />
                        <usage totalContentCount="3" />
                    </content>
                    <content id="6" title="View 1" url="http://localhost:8000/view1">
                        <parent id="parent-3" />
                        <owner id="admin" />
                        <usage totalContentCount="3" />
                    </content>
                    <content id="7" title="Blank page" url="http://localhost:8080/app/blank">
                        <parent id="parent-4" />
                        <owner id="user2" />
                        <usage totalContentCount="1" />
                    </content>
                </contents>
            </response>
            `,
        };
    }
}
