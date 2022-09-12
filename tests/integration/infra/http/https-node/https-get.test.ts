import { HttpsGet } from "../../../../../src/infra/http/httpsNode/https-get";

describe("Https Get Node", () => {
    it("shoud return data when API call is successful", async () => {
        const httpsGet = new HttpsGet();
        
        const response = await httpsGet.get({
            url: "https://nominatim.openstreetmap.org/?addressdetails=1&q=ANY_ADDRESS&format=json",
        });

        expect(response.statusCode).toBe(200);
        expect(response.body).toBeDefined();
    });
});
