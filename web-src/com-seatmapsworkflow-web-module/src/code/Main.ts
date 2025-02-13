import { Module } from 'sabre-ngv-core/modules/Module';
import { IModuleManifest } from 'sabre-ngv-core/modules/IModuleManifest';
import { getService } from "./Context";
import { PublicModalsService } from 'sabre-ngv-modals/services/PublicModalService';

export class Main extends Module {
    
    init(): void {
        super.init();
        console.log('SeatMaps Module Initialized');

        // Подключаем PublicModalsService
        const modalService: PublicModalsService = getService(PublicModalsService);

        // Создаём контейнер для iframe
        const iframeContainer = document.createElement("div");
        iframeContainer.style.width = "100%";
        iframeContainer.style.height = "600px";

        // Создаём iframe для карты мест
        const iframe = document.createElement("iframe");
        iframe.src = "https://quicket.io/react-proxy-app"; // URL библиотеки карты мест
        iframe.style.width = "100%";
        iframe.style.height = "100%";
        iframe.style.border = "none";

        iframeContainer.appendChild(iframe);

        // Открываем модальное окно с iframe
        modalService.showReactModal({
            component: () => iframeContainer, // Передаём контейнер с iframe внутрь модального окна
            header: "Seat Map",
            modalSize: "large"
        });

        console.log("Модальное окно с картой мест вызвано.");

        // Передаём данные в iframe после загрузки
        iframe.onload = () => {
            const flightData = {
                config: {
                    width: 400,
                    lang: "EN",
                    horizontal: false,
                    apiUrl: "https://sandbox.quicket.io/api/v1", // <-- передаём API URL
                    apiAppId: "aff6eb5e-1c83-4e5c-a2a2-seatmaps-com", // <-- API App ID
                    apiKey: "d5c55bd9-60f0-4e2f-84e0-seatmaps-com" // <-- API Key
                },
                flight: {
                    id: "111",
                    airlineCode: "EK",
                    flightNo: "50",
                    departureDate: "2025-03-21",
                    departure: "MUC",
                    arrival: "DXB",
                    cabinClass: "A"
                },
                availability: [
                    { label: "20A", price: 33, color: "green" },
                    { label: "20E", price: 33, color: "red" }
                ],
                passengers: [
                    { id: "1", passengerType: "ADT", seat: null },
                    { id: "2", passengerType: "CHD", seat: { seatLabel: "21F" } }
                ]
            };

            // Отправляем данные в iframe
            iframe.contentWindow?.postMessage({ type: "seatmap-data", data: flightData }, "*");
            console.log("Отправлены данные в iframe:", flightData);
        };

        // Получение данных от iframe
        window.addEventListener("message", (event) => {
            if (event.origin !== "https://quicket.io") return;

            const { type, payload } = event.data;

            if (type === "SEATMAP_SELECTION") {
                console.log("Выбранные места:", payload);
                // Здесь можно передавать данные обратно в Sabre API
            }
        });
    }
}

// Определяем манифест модуля
export const manifest: IModuleManifest = {
    name: 'SeatMapsModule',
    dependencies: ['sabre-ngv-core']
};





// IMPORT { MODULE } FROM 'SABRE-NGV-CORE/MODULES/MODULE';
// import { Module } from 'sabre-ngv-core/modules/Module';
// import { IModuleManifest } from 'sabre-ngv-core/modules/IModuleManifest';
// import { getService } from "./Context";
// import { PublicModalsService } from 'sabre-ngv-modals/services/PublicModalService';

// export class Main extends Module {
    
//     init(): void {
//         super.init();
//         console.log('SeatMaps Module Initialized');

//         // Подключаем PublicModalsService
//         const modalService: PublicModalsService = getService(PublicModalsService);

//         // Создаём iframe для карты мест
//         const iframe = document.createElement("iframe");
//         iframe.src = "https://quicket.io/react-proxy-app"; // URL библиотеки карты мест
//         iframe.style.width = "100%";
//         iframe.style.height = "600px";
//         iframe.style.border = "none";

//         // Открываем модальное окно с iframe
//         modalService.showReactModal({
//             component: () => iframe, // Передаём iframe внутрь модального окна
//             header: "Seat Map",
//             modalSize: "large"
//         });

//         console.log("Модальное окно с картой мест вызвано.");

//         // Передаём данные в iframe после загрузки
//         iframe.onload = () => {
//             const flightData = {
//                 config: {
//                     width: 400,
//                     lang: "EN",
//                     horizontal: false,
//                     apiUrl: "https://sandbox.quicket.io/api/v1", // <-- передаём API URL
//                     apiAppId: "aff6eb5e-1c83-4e5c-a2a2-seatmaps-com", // <-- API App ID
//                     apiKey: "d5c55bd9-60f0-4e2f-84e0-seatmaps-com" // <-- API Key
//                 },
//                 flight: {
//                     id: "111",
//                     airlineCode: "EK",
//                     flightNo: "50",
//                     departureDate: "2025-03-21",
//                     departure: "MUC",
//                     arrival: "DXB",
//                     cabinClass: "A"
//                 },
//                 availability: [
//                     { label: "20A", price: 33, color: "green" },
//                     { label: "20E", price: 33, color: "red" }
//                 ],
//                 passengers: [
//                     { id: "1", passengerType: "ADT", seat: null },
//                     { id: "2", passengerType: "CHD", seat: { seatLabel: "21F" } }
//                 ]
//             };

//             // Отправляем данные в iframe
//             iframe.contentWindow?.postMessage({ type: "seatmap-data", data: flightData }, "*");
//             console.log("Отправлены данные в iframe:", flightData);
//         };
//     }
// }

// // Определяем манифест модуля
// export const manifest: IModuleManifest = {
//     name: 'SeatMapsModule',
//     dependencies: ['sabre-ngv-core']
// };