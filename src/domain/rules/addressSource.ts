import { AddressSourceConcrete } from "../entity/AddressSource";

export type csvData = {
    nameFile: string
    pathCsv: string
    delimiter: string
}

export type jsonData = {
    nameFile: string
    pathJson: string
}

export type sqlData = {
    tech: string
}

export type urlData = {
    url: string
}

export type AddressSourceConfig = {
    name: string
    json?: jsonData
    csv?: csvData
    sql?: sqlData
    url?: urlData
}

export abstract class AddressSource {

    abstract getName(): string
    abstract getSource(): any

    public static createAddressSource(source?: AddressSourceConfig): AddressSource {
        return new AddressSourceConcrete(source)
    }
}
