import {Module} from 'sabre-ngv-core/modules/Module';
import {ExtensionPointService} from 'sabre-ngv-xp/services/ExtensionPointService';
import {getService} from "./Context";
import {RedAppSidePanelConfig} from 'sabre-ngv-xp/configs/RedAppSidePanelConfig';
import {RedAppSidePanelButton} from 'sabre-ngv-redAppSidePanel/models/RedAppSidePanelButton';
import {LayerService} from "sabre-ngv-core/services/LayerService";
import {URLModel} from "./URLModel";
import {URLView} from "./view/URLView";

export class Main extends Module {

    init(): void {
        super.init();
        const xp = getService(ExtensionPointService);

        // кнопка на боковой панели, которая открывает cross-domain website
        const sidepanelConfig = new RedAppSidePanelConfig([
            new RedAppSidePanelButton('Open SeatMaps website',
                'btn btn-secondary side-panel-button redapp-web-cross-domain-website',
                () => this.openModal())
        ]);

        xp.addConfig('redAppSidePanel', sidepanelConfig);
    }

    // модальное окно с сдержимым сайта
    private openModal(): void {

        const modalOptions = {
            title: 'Get SeatMap',
            actions: [{
                className: 'app.common.views.Button',
                caption: 'Cancel',
                actionName: 'cancel',
                type: 'secondary'
            }, {
                className: 'app.common.views.Button',
                caption: 'Open',
                actionName: 'submit-url',
                type: 'success'
            }]
        };

        getService(LayerService).showInModal(
            new URLView({model: new URLModel()}),
            modalOptions,
            {display: 'areaView'});

    }
}
