// import { makeSut } from "./faker/geo-crawler-stubs";

// describe("GeoCrawler", () => {
//     describe("Run Crawler", () => {
//         let { geoCrawler, controlsRepositoryStub, geoApiStub } = makeSut();

//         jest.spyOn(geoCrawler, "geoCodify").mockReturnValue(Promise.resolve());
//         // jest.spyOn(controlsRepositoryStub.Controls(), "setControls").mockReturnValue();

//         beforeEach(() => {
//             jest.clearAllMocks();
//         });

//         it("Should geoCodify if date on table Controls is null", async () => {
//             jest.spyOn(controlsRepositoryStub, "update").mockReturnValue(Promise.resolve());

//             const response = await geoCrawler.run();

//             expect(response).toBe("ok");
//             expect(controlsRepositoryStub.update).toHaveBeenCalled();
//             expect(controlsRepositoryStub.Controls().setControls).toHaveBeenCalled();
//             expect(geoCrawler.geoCodify).toHaveBeenCalled();
//         });

//         it("Should geoCodify if date on table Controls is less than current date", async () => {
//             let yesterday = new Date();
//             yesterday.setDate(yesterday.getDate() - 1);
//             controlsRepositoryStub.Controls().setDate(yesterday);

//             const response = await geoCrawler.run();

//             expect(response).toBe("ok");
//             expect(controlsRepositoryStub.Controls().setControls).toHaveBeenCalled();
//             expect(geoCrawler.geoCodify).toHaveBeenCalled();
//         });
        
//         it("Should return error if geoCodify throws", async () => {
//             jest.spyOn(controlsRepositoryStub, "update").mockImplementationOnce(() => {
//                 throw new Error("any_error");
//             });
//             jest.spyOn(console, "error").mockImplementation(() => {});

//             const response = geoCrawler.run();

//             expect(response).rejects.toThrowError("any_error");
//             expect(geoCrawler.geoCodify).not.toHaveBeenCalled();
//         });
//     });

//     describe("Geocodify", () => {
//         let { geoCrawler, controlsRepositoryStub, geoApiStub, addressRepositoryStub } = makeSut();

//         jest.spyOn(console, "log").mockImplementation(() => {});
//         jest.spyOn(controlsRepositoryStub.Controls(), "getRequests").mockReturnValue(0);

//         beforeEach(() => {
//             jest.clearAllMocks();
//         });

//         it("Should geoCodify if all conditions are true", async () => {
//             jest.spyOn(controlsRepositoryStub.Controls(), "getIsDate").mockReturnValue(true);
//             jest.spyOn(controlsRepositoryStub.Controls(), "getIsAddress").mockReturnValue(true);

//             const response = await geoCrawler.geoCodify();

//             expect(response).toBeUndefined();
//             expect(controlsRepositoryStub.Controls().getRequests).toHaveBeenCalled();
//             expect(console.log).toHaveBeenCalled();
//         });

//         it("Should return final loop when requests or day or address were expired", async () => {
//             jest.spyOn(controlsRepositoryStub.Controls(), "getIsRequests").mockReturnValueOnce(false);
//             jest.spyOn(controlsRepositoryStub.Controls(), "getIsRequests").mockReturnValueOnce(false);
//             jest.spyOn(controlsRepositoryStub.Controls(), "getIsAddress").mockReturnValue(false);
//             jest.spyOn(controlsRepositoryStub.Controls(), "getIsDate").mockReturnValue(false);

//             const response = await geoCrawler.geoCodify();

//             expect(response).toBeUndefined();
//             expect(controlsRepositoryStub.Controls().getRequests).toHaveBeenCalled();
//             expect(console.log).toHaveBeenCalled();
//         });

//         it("Should console error when request fail", async () => {
//             jest.spyOn(controlsRepositoryStub.Controls(), "getIsDate").mockReturnValue(true);
//             jest.spyOn(controlsRepositoryStub.Controls(), "getIsAddress").mockReturnValue(true);
//             jest.spyOn(geoApiStub, "responseGeoapi").mockImplementationOnce(() => {
//                 throw new Error("error");
//             });
//             jest.spyOn(console, "error").mockImplementation(() => {});

//             const response = await geoCrawler.geoCodify();

//             expect(response).toBeUndefined();
//             expect(controlsRepositoryStub.Controls().getRequests).toHaveBeenCalled();
//             expect(console.error).toHaveBeenCalled();
//         });

//         it("Should console error when geoCodify address fail", async () => {
//             jest.spyOn(controlsRepositoryStub.Controls(), "getRequests").mockReturnValueOnce(0);
//             jest.spyOn(console, "error").mockImplementationOnce(() => {});
//             jest.spyOn(addressRepositoryStub, "readerOneAddress").mockRejectedValueOnce(() => new Error("any_error"));

//             const response = await geoCrawler.geoCodify();

//             expect(response).toBeUndefined();
//             expect(console.error).toHaveBeenCalled();
//         });
//     });
// });
