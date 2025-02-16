import {AbstractView} from "sabre-ngv-app/app/AbstractView";
import {Template} from "sabre-ngv-core/decorators/classes/view/Template";
import {AbstractActionOptions} from "sabre-ngv-app/app/common/views/AbstractActionOptions";
import {getService} from "../Context";
import {JsonObject} from "sabre-ngv-app/_types";
import {IExternalCommunicationService} from "sabre-ngv-communication/interfaces/IExternalCommunicationService";
import {URLModel} from "../URLModel";

@Template('com-sabre-redapp-example3-web-crosswindow-web-module:communication')
export class CommunicationView extends AbstractView<URLModel> {

    sendMessage : (data: JsonObject) => void;

    initialize(options: AbstractActionOptions): void {
        super.initialize(options);

        const listener = (event: MessageEvent) => {
            console.log(event);
            this.$('.response').val(JSON.stringify(event.data))
        };

        const openWindow = getService(IExternalCommunicationService)
            .openWindow(this.getModel().get('url'), "*", listener);

        if (typeof openWindow === "function") {
            this.sendMessage = openWindow;
        }
    }

    selfSubmitRestRequestAction(): void {

        const payload: string = this.$('.payload-field').find('.payload').val();

        this.$('.response').val("");

        this.sendMessage(JSON.parse(payload));

    }
}