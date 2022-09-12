
export abstract class GeoCrawler {

    abstract run(): Promise<any>
    abstract geocodify(): Promise<any>

    public static createGeoCrawler(geoCrawlerConcrete: GeoCrawler): GeoCrawler {
        return geoCrawlerConcrete
    }

}
