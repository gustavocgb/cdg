import { AddressSource } from "../../../../src/domain/rules/addressSource";

describe("Address Source", () => {
    let sut: AddressSource;

    beforeAll(() => {
        sut = AddressSource.createAddressSource({ name: "name" });
    });

    it("Should get name", () => {
        expect(sut.getName()).toBe("name");
    });

    it("Should get source", () => {
        expect(sut.getSource()).toEqual({ name: "name" });
    });

    it("Should instantiate with empty source", () => {
        sut = AddressSource.createAddressSource();

        expect(sut.getName()).toBe(undefined);
    });
});
