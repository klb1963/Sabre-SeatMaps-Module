import {AbstractView} from "sabre-ngv-app/app/AbstractView";
import {Template} from "sabre-ngv-core/decorators/classes/view/Template";
import {AbstractActionOptions} from "sabre-ngv-app/app/common/views/AbstractActionOptions";
import {URLModel} from "../URLModel";
import {getService} from "../Context";
import {CommunicationView} from "./CommunicationView";
import {LayerService} from "sabre-ngv-core/services/LayerService";

@Template('com-sabre-redapp-example3-web-crosswindow-web-module:urlview')
export class URLView extends AbstractView<URLModel> {

    initialize(options: AbstractActionOptions): void {
        super.initialize(options);
    }

    selfSubmitUrlAction(): void {

        const url: string = this.$('.url-field').val();
        if (this.hasProtocol(url)) {
            console.log(url);
            this.getModel().set('url', url);
            this.openModal();
        }
        else {
            this.$('div').addClass('has-error');
        }
    }

    private hasProtocol(url:string): boolean {
        return url.startsWith("http://") || url.startsWith("https://");
    }

    private openModal(): void {

        const modalOptions = {
            title: 'External communication',
            actions: [{
                className: 'app.common.views.Button',
                caption: 'Cancel',
                actionName: 'cancel',
                type: 'secondary'
            }, {
                className: 'app.common.views.Button',
                caption: 'Submit',
                actionName: 'submit-rest-request',
                type: 'success'
            }]
        };

        getService(LayerService).showInModal(
            new CommunicationView({model: this.getModel()}),
            modalOptions,
            {display: 'areaView'});

    }
}