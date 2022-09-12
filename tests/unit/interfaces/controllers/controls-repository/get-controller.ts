// import { ControlsRepository } from "../../../../../src/application/rules/controlsRepository/controlsRepository";
// import { GetControlsRepositoryController } from "../../../../../src/interfaces/controllers/aplications/controlsRepository";
// import { ControlsRepositoryStub } from "./controls-repository-stub"

// interface SutTypes {
//     sut: GetControlsRepositoryController;
//     controlsRepositoryStub: ControlsRepository;
// }
// const makeSut = (): SutTypes => {
//     const controlsRepositoryStub = new ControlsRepositoryStub();
//     const sut = new GetControlsRepositoryController(controlsRepositoryStub);

//     return { sut, controlsRepositoryStub };
// };

// describe("Get controls repository controller", () => {
//     it("Should return all controls", async () => {
//         const { sut } = makeSut();
//         const resp = await sut.handle(undefined);

//         expect(resp).toBeTruthy();
//         expect(resp.statusCode).toBe(200);
//         expect(resp.body).toEqual({
//             body: {
//                 controls: ["all_geo_api_controls"],
//             },
//         });
//     });

//     it("Should return error 500", async () => {
//         const { sut, controlsRepositoryStub } = makeSut();
//         jest.spyOn(controlsRepositoryStub, "getControlsAllByGeoapiId").mockReturnValueOnce(
//             new Promise((resolve, reject) => reject(new Error("any server error")))
//         );
//         jest.spyOn(console, "error").mockImplementationOnce(() => {});

//         const resp = await sut.handle(undefined);

//         expect(resp).toBeTruthy();
//         expect(resp.statusCode).toBe(500);
//         expect(resp.body).toEqual({
//             error: "server error",
//         });
//     });
// });
