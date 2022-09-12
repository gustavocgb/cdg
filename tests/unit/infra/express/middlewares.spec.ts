import { contentType, cors } from "../../../../src/infra/framework/express/middlewares/index";

describe("Cors", () => {
    it("Should set access controls headers", () => {
        const req: any = {};
        const res: any = {
            set: jest.fn(),
        };
        const next: any = jest.fn();

        cors(req, res, next);

        expect(res.set).toHaveBeenCalledWith("access-control-allow-origin", "*");
        expect(res.set).toHaveBeenCalledWith("access-control-allow-methods", "*");
        expect(res.set).toHaveBeenCalledWith("access-control-allow-headers", "*");
    });
});

describe("Content Type", () => {
    it("Should set content type header to JSON", () => {
        const req: any = {};
        const res: any = {
            type: jest.fn(),
        };
        const next: any = jest.fn();

        contentType(req, res, next);

        expect(res.type).toHaveBeenCalledWith("json");
        expect(next).toHaveBeenCalled();
    });
});
