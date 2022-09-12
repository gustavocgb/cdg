
export abstract class AddressCache {

    abstract queue(): Promise<any>
    abstract stack(): Promise<any>
    abstract getArray(): Promise<any>
    abstract getReference(): Promise<any>
    abstract setArray(array: []): void
    abstract setReference(reference: any): void

    public static createAddressCache(addressCacheConcrete: any): any {
        return addressCacheConcrete
    }

}
