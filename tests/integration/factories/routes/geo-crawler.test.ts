import { GeoCrawlerFactory } from "../../../../src/main/factories";

describe("GeoCrawler factory", () => {
	it("should create a GeoCrawler", () => {
		const geoCrawler = GeoCrawlerFactory()
		
		expect(geoCrawler).toBeDefined();
	});
})