// import { GeoCrawlerController } from "../../../../../src/interfaces/controllers/aplications/geoCrawler/GeoCrawlerController";
// import { GeoCrawlerInterface } from "../../../../../src/application/rules/geoCrawler/geoCrawler";
// import { SystemProcessControls } from "../../../../../src/application/rules/systemProcessControls/systemProcessControls";

// const makeSut = (): GeoCrawlerController => {
//     const geoCrawlersStub: GeoCrawlerInterface[] = [
//         {
//             run: () => {
//                 return new Promise((resolve) => resolve({}));
//             },
//             geoCodify: () => {
//                 return new Promise((resolve) => resolve({}));
//             },
//         },
//         {
//             run: () => {
//                 return new Promise((resolve) => resolve({}));
//             },
//             geoCodify: () => {
//                 return new Promise((resolve) => resolve({}));
//             },
//         },
//     ];
//     const systemProcessControlsStub: SystemProcessControls = {
//         restartApplication: () => {
//             return new Promise((resolve) => resolve("SGM"));
//         },
//         removeLogs: () => {
//             return new Promise((resolve) => resolve(true));
//         },
//         readLogs: function (type: string, date: string): Promise<any> {
//             return new Promise((resolve) => resolve(true));
//         }
//     };

//     return new GeoCrawlerController(geoCrawlersStub, systemProcessControlsStub);
// };

// jest.spyOn(console, "log").mockImplementation(() => {});
// jest.spyOn(console, "error").mockImplementation(() => {});

// describe("GeoCrawlerController", () => {
//     describe("handle", () => {
//         beforeEach(() => {
//             jest.clearAllMocks();
//         });

//         it("Should call run method of each geoCrawler", async () => {
//             jest.useFakeTimers();
//             jest.spyOn(global, "setTimeout");

//             const sut = makeSut();
//             const runSpy = jest.spyOn(sut.geoCrawlers[0], "run");
//             const runSpy2 = jest.spyOn(sut.geoCrawlers[1], "run");

//             await sut.handle({});

//             jest.runAllTimers();
            
//             expect(runSpy).toHaveBeenCalled();
//             expect(runSpy2).toHaveBeenCalled();
//             expect(console.log).toHaveBeenCalledWith("-- Crawler its runing.. ... --");
//             expect(setTimeout).toHaveBeenCalled();
//         });

//         // it("Should call restartApplication method of systemProcessControls", async () => {
//         //     const sut = makeSut();
//         //     const restartApplicationSpy = jest.spyOn(sut.systemProcessControls, "restartApplication");

//         // 		await sut.handle({});

//         // 		expect(restartApplicationSpy).toHaveBeenCalled();
//         // });

//         it("Should return error if geoCrawler throw error", async () => {
//             const sut = makeSut();
//             jest.spyOn(sut.geoCrawlers[0], "run").mockImplementation(() => {
//                 throw new Error("any error");
//             });
//             jest.spyOn(sut.geoCrawlers[1], "run").mockImplementation(() => {
//                 throw new Error("any error");
//             });

//             const result = await sut.handle({});

//             expect(console.error).toHaveBeenCalled();
//             expect(result.statusCode).toBe(500);
//             expect(result.body).toEqual({
//                 error: "server error",
//             });
//         });
//     });
// });
