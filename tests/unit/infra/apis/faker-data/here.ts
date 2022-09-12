import { ResponseEntity } from "../../../../../src/domain/rules/response";

export const validLocalReceived = {
    items: [
        {
            title: "Rua Teste, Centro, São Paulo - SP, 01310-000, Brasil",
            id: "here:af:streetsection:D7ZnaByHuXYEStHdgasWnB:EAIaAjIw",
            resultType: "houseNumber",
            houseNumberType: "interpolated",
            address: {
                label: "Rua Teste, Centro, São Paulo - SP, 01310-000, Brasil",
                countryCode: "BRA",
                countryName: "Brasil",
                stateCode: "MG",
                state: "São Paulo",
                city: "São Paulo",
                district: "Centro",
                street: "Rua Teste",
                postalCode: "01310-000",
                houseNumber: "20",
            },
            position: { lat: -23.564, lng: -46.633 },
            access: [{ lat: -20.38595, lng: -43.50373 }],
            mapView: { west: -46.62882780291527, south: -23.56492769708468, east: -46.63120719708497, north: -23.56267780291527 },
            scoring: { queryScore: 1.0, fieldScore: { state: 1.0, city: 1.0, streets: [1.0], houseNumber: 1.0 } },
        },
    ],
};

export const validLocalResponse: ResponseEntity[] = [
    {
        accuracy: 1,
        city: "São Paulo",
        country: "Brasil",
        district: "Centro",
        fullAddress: "Rua Teste, Centro, São Paulo - SP, 01310-000, Brasil",
        latNorthBBox: -23.56267780291527,
        latSouthBBox: -23.56492769708468,
        latitude: -23.564,
        longEastBBox: -46.63120719708497,
        longWestBBox: -46.62882780291527,
        longitude: -46.633,
        number: "20",
        // place_type: "houseNumber",
        publicPlace: "Rua Teste",
        state: "São Paulo",
        zipCode: "01310-000",
    },
];

export const validLocalsReceivedIncomplete = {
    items: [
        {
            title: "Rua Teste, Centro, São Paulo - SP, 01310-000, Brasil",
            id: "here:af:streetsection:D7ZnaByHuXYEStHdgasWnB:EAIaAjIw",
            resultType: "houseNumber",
            houseNumberType: "interpolated",
            access: [{ lat: -20.38595, lng: -43.50373 }],
        },
    ],
};

export const validLocalsResponseIncomplete: ResponseEntity[] = [
    {
        accuracy: undefined,
        city: undefined,
        country: undefined,
        district: undefined,
        fullAddress: undefined,
        latNorthBBox: undefined,
        latSouthBBox: undefined,
        latitude: undefined,
        longEastBBox: undefined,
        longWestBBox: undefined,
        longitude: undefined,
        number: undefined,
        publicPlace: undefined,
        state: undefined,
        zipCode: undefined,
    },
];
