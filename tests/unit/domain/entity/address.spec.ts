import { Address, AddressEntity } from "../../../../src/domain/rules/address";

describe("Address", () => {
    let sut: Address;

    beforeAll(() => {
        sut = Address.createAddress();
    });
    it("Should set address", () => {
        sut.setAddress("address");

        expect(sut.getAddress()).toBe("address");
    });

    it("Should set address data", () => {
        const addressData: AddressEntity = {
            id: 1,
            address: "address",
        };

        sut.setAddressData(addressData);

        expect(sut.getAddressData()).toEqual(addressData);
    });

    it("Should set address ID", () => {
        sut.setId(1);

        expect(sut.getId()).toBe(1);
    });
});
