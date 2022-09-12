import { Response } from "../../../../src/domain/rules/response";

describe("Response", () => {
    let sut: Response;

    beforeAll(() => {
        sut = Response.createResponse();
    });

    

    it("Should set the number", () => {
        sut.setNumber("123");

        expect(sut.getNumber()).toBe("123");
    });

    it("Should set the district", () => {
        sut.setDistrict("Teste");

        expect(sut.getDistrict()).toBe("Teste");
    });

    it("Should set the city", () => {
        sut.setCity("Teste");

        expect(sut.getCity()).toBe("Teste");
    });

    it("Should set the state", () => {
        sut.setState("Teste");

        expect(sut.getState()).toBe("Teste");
    });

    it("Should set the country", () => {
        sut.setCountry("Teste");

        expect(sut.getCountry()).toBe("Teste");
    });

    it("Should set the accuracy", () => {
        sut.setAccuracy(123);

        expect(sut.getAccuracy()).toBe(123);
    });

    it("Should set the latitude", () => {
        sut.setLatitude(123);

        expect(sut.getLatitude()).toBe(123);
    });

    it("Should set the longitude", () => {
        sut.setLongitude(123);

        expect(sut.getLongitude()).toBe(123);
    });

    it("Should set the long west bbox", () => {
        sut.setLongWestBBox(123);

        expect(sut.getLongWestBBox()).toBe(123);
    });

    it("Should set the lat north bbox", () => {
        sut.setLatNorthBBox(123);

        expect(sut.getLatNorthBBox()).toBe(123);
    });

    it("Should set the long east bbox", () => {
        sut.setLongEastBBox(123);

        expect(sut.getLongEastBBox()).toBe(123);
    });

    it("Should set the lat south bbox", () => {
        sut.setLatSouthBBox(123);

        expect(sut.getLatSouthBBox()).toBe(123);
    });
});
