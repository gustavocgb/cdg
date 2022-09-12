// // Only for development purposes. Change extension to .spec.ts to run.
// import { makeSut, addressResponse, responseControlsData } from "./geo-crawler-stubs";

// describe("Stubs of Geocrawler", () => {
//     it("should return data when API call is successful", async () => {
//         const { geoApiStub } = makeSut();
//         const address = "address";
//         const response = await geoApiStub.responseGeoapi(address);
//         expect(response).toEqual(addressResponse);
//     });

//     it("Should return controls when getControlsByGeoapiId is called", async () => {
//         const { controlsRepositoryStub } = makeSut();
//         const data: any = {};
//         const response = await controlsRepositoryStub.getControlsByGeoapiId(data);

//         expect(response).toEqual(responseControlsData);
//     });

//     it("Should return address when getOneAddress is called", async () => {
//         const { addressRepositoryStub } = makeSut();
//         const response = await addressRepositoryStub.readerOneAddress();

//         expect(response).toEqual({
//             id: 1,
//             address: "address",
//         });
//     });

//     it("Should save response when saveResponseGeoApi is called", async () => {
//         const { responseRepositoryStub } = makeSut();
//         const data: any = "any_data";
//         const response = await responseRepositoryStub.saveResponseGeoApi(data);

//         expect(response).toEqual(undefined);
				
//     });
// });
