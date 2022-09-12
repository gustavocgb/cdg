import { ResponseEntity } from "../../../../../src/domain/rules/response";

export const validLocalReceived = {
    results: [
        {
            formatted_address: "Rua Teste",
            address_components: [
                {
                    long_name: "Teste",
                    types: ["street_number"],
                },
                {
                    long_name: "Rua Teste",
                    types: ["route"],
                },
                {
                    long_name: "Centro",
                    types: ["sublocality_level_1"],
                },
                {
                    long_name: "São Paulo",
                    types: ["administrative_area_level_2"],
                },
                {
                    long_name: "São Paulo",
                    types: ["administrative_area_level_1"],
                },
                {
                    long_name: "Brasil",
                    types: ["country"],
                },
                {
                    long_name: "01310-000",
                    types: ["postal_code"],
                },
            ],
            geometry: {
                location: {
                    lat: -23.564,
                    lng: -46.633,
                },
                location_type: "ROOFTOP",
                viewport: {
                    northeast: {
                        lat: -23.56267780291527,
                        lng: -46.63120719708497,
                    },
                    southwest: {
                        lat: -23.56492769708468,
                        lng: -46.62882780291527,
                    },
                },
            },
            types: ["street_address"],
        },
        {},
    ],
    status: "OK",
};

export const validLocalResponse: ResponseEntity[] = [
    {
        city: "São Paulo",
        country: "Brasil",
        district: "Centro",        
        fullAddress: "Rua Teste",
        latNorthBBox: -23.56267780291527,
        latSouthBBox: -23.56492769708468,
        latitude: -23.564,
        longEastBBox: -46.63120719708497,
        longWestBBox: -46.62882780291527,
        longitude: -46.633,
        number: "Teste",
        placeType: "street_address",
        publicPlace: "Rua Teste",
        state: "São Paulo",
        zipCode: "01310-000",
    },
    {
        city:undefined,
        country:undefined,
        district:undefined,
        fullAddress: undefined,
        latNorthBBox: undefined,
        latSouthBBox: undefined,
        latitude: undefined,
        longEastBBox: undefined,
        longWestBBox: undefined,
        longitude: undefined,
        number: undefined,
        placeType: undefined,
        publicPlace: undefined,
        state: undefined,
        zipCode: undefined,
    },
];
