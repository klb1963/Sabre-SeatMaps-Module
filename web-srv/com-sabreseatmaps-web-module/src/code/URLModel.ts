import {AbstractModel} from "sabre-ngv-app/app/AbstractModel";

export class URLModel extends AbstractModel {

    url: string;

    constructor() {
        super();
        this.url='https://example.com ';
    }
}
