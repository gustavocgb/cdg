import { GeoServiceConcrete } from "../../../../src/domain/entity/GeoService";
import { GeoService, GeoServiceEntity } from "../../../../src/domain/rules/geoService";

const makeSut = (): GeoServiceConcrete => {
    const geoServiceEntityStub: GeoServiceEntity = {
        name: "geoservice_name",
        maxRequestPerSecond: 1,
    };

    return GeoService.createGeoService(geoServiceEntityStub);
};

describe("GeoService", () => {
    it("Should be instantiated with undefined values", () => {
        const sut = GeoService.createGeoService();

        expect(sut.getName()).toBeUndefined();
        expect(sut.getMaxRequestPerSecond()).toBeUndefined();
    });

    it("should set a name", () => {
        const sut = makeSut();
        sut.setName("new_name");

        expect(sut.getName()).toBe("new_name");
    });

    it("should set the number of max requests per second", () => {
        const sut = makeSut();
        sut.setMaxRequestPerSecond(2);

        expect(sut.getMaxRequestPerSecond()).toBe(2);
    });
});
