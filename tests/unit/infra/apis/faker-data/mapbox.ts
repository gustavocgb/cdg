import { ResponseEntity } from "../../../../../src/domain/rules/response";

export const validLocalReceived: any = {
    type: "FeatureCollection",
    query: ["rua", "balneario", "de", "camboriu", "149", "casa", "19", "20", "joinville", "sc"],
    features: [
        {
            id: "address.769651877",
            type: "Feature",
            place_type: ["address"],
            relevance: 0.637037,
            properties: {
                accuracy: "point",
            },
            text: "Rua Balneario De Camboriu",
            place_name: "Rua Teste",
            center: [-48.85072, -26.255054],
            bbox: [-48.851022, -26.255054, -48.85072, -26.255054],
            geometry: {
                type: "Point",
                coordinates: [-48.85072, -26.255054],
            },
            address: "149",
            context: [
                {
                    id: "neighborhood.6509501755749660",
                    text: "Bom Retiro",
                },
                {
                    id: "postcode.8583904155229900",
                    text: "89223",
                },
                {
                    id: "place.1653029207616440",
                    wikidata: "Q156819",
                    text: "Joinville",
                },
                {
                    id: "region.9987667069176350",
                    short_code: "BR-SC",
                    wikidata: "Q41115",
                    text: "Santa Catarina",
                },
                {
                    id: "country.9531777110682710",
                    wikidata: "Q155",
                    short_code: "br",
                    text: "Brazil",
                },
            ],
        },
    ],
    attribution:
        "NOTICE: © 2022 Mapbox and its suppliers. All rights reserved. Use of this data is subject to the Mapbox Terms of Service (https://www.mapbox.com/about/maps/). This response and the information it contains may not be retained. POI(s) provided by Foursquare.",
};

export const validLocalResponse: ResponseEntity[] = [
    {
        city: "Joinville",
        country: "Brazil",
        district: "Bom Retiro",
        fullAddress: "Rua Teste",
        latNorthBBox: -26.255054,
        latSouthBBox: -26.255054,
        latitude: -26.255054,
        longEastBBox: -48.851022,
        longWestBBox: -48.85072,
        longitude: -48.85072,
        number: "149",
        placeType: "address",
        publicPlace: "Rua Balneario De Camboriu",
        state: "Santa Catarina",
        zipCode: "89223",
        accuracy: 0.637037,
    },
];

export const validLocalsReceivedIncomplete = {
    features: [
        {},
        {
            context: [],
        },
    ],
};

export const validLocalsResponseIncomplete: ResponseEntity[] = [
    {},
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
