import { HttpsGetAdpter } from "../../../../../src/interfaces/adpters/http/http-getAdpter";
import { HttpGet } from "../../../../../src/interfaces/gateway/http";

interface SutTypes {
    sut: HttpGet<any, any>;
    httpGetStub: HttpGet<any, any>;
}

const makeSut = (): SutTypes => {
    const httpGetStub = {
        get: jest.fn().mockReturnValue(
            new Promise((resolve) =>
                resolve({
                    statusCode: 200,
                    body: JSON.stringify({
                        data: "address_geocoded",
                    }),
                })
            )
        ),
    };

    const sut = new HttpsGetAdpter(httpGetStub);
    return { sut, httpGetStub };
};

const params = {
    url: "https://any_api_url.com/any_address",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
};

describe("Https adapter Get", () => {
    it("Should return 200 status code if it make a successful request", async () => {
        const { sut, httpGetStub } = makeSut();

        const resp = await sut.get(params);

        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({
            data: "address_geocoded",
        });
        expect(httpGetStub.get).toHaveBeenCalledWith(params);
    });

    it("Should throw if httpGet returns 404", async () => {
        const { sut, httpGetStub } = makeSut();

        httpGetStub.get = jest.fn().mockReturnValue(
            new Promise((resolve) =>
                resolve({
                    statusCode: 404,
                    body: "",
                })
            )
        );

        const promise = sut.get(params);

        await expect(promise).rejects.toThrow();
    });
    
    it("Should throw if httpGet throws", async () => {
        const { sut, httpGetStub } = makeSut();

        httpGetStub.get = jest.fn().mockReturnValue(
            new Promise((resolve, reject) => reject(new Error()))
        );

        const promise = sut.get(params);

        await expect(promise).rejects.toThrow();
    });
});
