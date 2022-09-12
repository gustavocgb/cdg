import { ResponseEntity } from "../../../../../src/domain/rules/response";

export const validLocalReceived = {
    results: [
        {
            type: "Point Address",
            id: "BR/PAD/p0/14407716",
            score: 18.3897171021,
            address: {
                streetNumber: "75",
                streetName: "Rua Professor Milton Roque Ramos Krieger",
                municipalitySubdivision: "Trindade",
                municipality: "Florianópolis",
                countrySubdivision: "Santa Catarina",
                postalCode: "88036",
                extendedPostalCode: "88036-080",
                countryCode: "BR",
                country: "Brasil",
                countryCodeISO3: "BRA",
                freeformAddress: "Rua Professor Milton Roque Ramos Krieger, 75, 88036-080, Florianópolis",
                localName: "Florianópolis",
            },
            position: {
                lat: -27.58342,
                lon: -48.52491,
            },
            viewport: {
                topLeftPoint: {
                    lat: -27.58252,
                    lon: -48.52592,
                },
                btmRightPoint: {
                    lat: -27.58432,
                    lon: -48.5239,
                },
            },
            entryPoints: [
                {
                    type: "main",
                    position: {
                        lat: -27.58347,
                        lon: -48.52486,
                    },
                },
            ],
        },
				{}
    ],
};

export const validLocalResponse: ResponseEntity[] = [
    {
        accuracy: 18.3897171021,
        city: "Florianópolis",
        country: "Brasil",
        district: "Trindade",
        fullAddress: "Rua Professor Milton Roque Ramos Krieger, 75, 88036-080, Florianópolis",
        latNorthBBox: -27.58252,
        latSouthBBox: -27.58432,
        latitude: -27.58342,
        longEastBBox: -48.5239,
        longWestBBox: -48.52592,
        longitude: -48.52491,
        number: "75",
        publicPlace: "Rua Professor Milton Roque Ramos Krieger",
        state: "Santa Catarina",
        zipCode: "88036-080",
    },
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
