import { Here } from "../../../../src/infra/GeocodApi/apis";
import { HttpGet, HttpGetParams } from "../../../../src/interfaces/gateway/http";
import { validLocalReceived, validLocalResponse, validLocalsReceivedIncomplete, validLocalsResponseIncomplete } from "./faker-data/here";

interface SutTypes {
    sut: Here;
    httpGetStub: HttpGet<any, any>;
}

const makeSut = (): SutTypes => {
    class HttpGetStub implements HttpGet<any, any> {
        async get(url: HttpGetParams<any>): Promise<any> {
            return new Promise((resolve) => resolve(validLocalReceived));
        }
    }
    const httpGetStub = new HttpGetStub();
    const sut = new Here(httpGetStub);

    return { sut, httpGetStub };
};

describe("Here Geocoder api", () => {
    it("Should return address formated", () => {
        const { sut } = makeSut();
        const address = "Rua Teste";
        const formatedAddress = sut.getFormatedAddress(address);

        expect(formatedAddress).toBe("Rua Teste");
    });

    // it("Should return URL with address and key", () => {
    //     const { sut } = makeSut();
    //     const address = "any_formated_address";
    //     jest.spyOn(sut.GeoService(), "getApiKey").mockReturnValue("any_key");
    //     const url = sut.getFullUrl(address);

    //     expect(sut.GeoService().getApiKey).toBeCalledTimes(1);
    //     expect(url).toBe(`https://geocode.search.hereapi.com/v1/geocode?q=${address}&apiKey=any_key&in=countryCode:BRA&limit=1`);
    // });

    // it("Should return valid data if make a successfull request", async () => {
    //     const { sut } = makeSut();
    //     const address = "address";
    //     const response = await sut.responseGeoapi(address);

    //     expect(response).toEqual(validLocalReceived);
    // });

    // it("Should return error if request fail", async () => {
    //     const { sut, httpGetStub } = makeSut();
    //     const address = "address";
    //     jest.spyOn(httpGetStub, "get").mockRejectedValueOnce(() => new Error("any_error"));

    //     const response = sut.responseGeoapi(address);

    //     await expect(response).rejects.toThrowError("any_error");
    // });

    it("Should mapper the response", async () => {
        const { sut } = makeSut();
        const response = await sut.responseMapper(validLocalReceived);

        expect(response).toEqual(validLocalResponse);
    });

    it("Should mapper response without some data", async () => {
        const { sut } = makeSut();
        const response = await sut.responseMapper(validLocalsReceivedIncomplete);

        expect(response).toEqual(validLocalsResponseIncomplete);
    });
});
