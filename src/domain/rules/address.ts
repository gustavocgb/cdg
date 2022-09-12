import { AddressConcrete } from "../entity/Address";

export interface AddressEntity {
    id?: any | undefined
    address?: string | undefined
}

export abstract class Address {

    abstract getAddress(): string
    abstract getId(): any
    abstract getAddressData(): AddressEntity
    abstract setAddress(data: string): void
    abstract setId(data: any): void
    abstract setAddressData(data: AddressEntity): void

    public static createAddress(): Address {
        return new AddressConcrete()
    }

}
