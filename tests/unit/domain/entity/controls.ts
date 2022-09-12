// import { Key, ControlsEntity } from "../../../../src/domain/rules/controls";

// describe("Controls", () => {
//     let sut: Key;

//     beforeAll(() => {
//         sut = Key.createControls();
//     });

//     it("Should set controls entity", () => {
//         const controlsData: ControlsEntity = {
//             id: 1,
//             currentAddress: 1,
//             geoapiId: "123",
//             requests: 1,
//             geocodify: 1,
//             date: new Date(),
//             isDate: true,
//             geoapiKey: "any_key",
//             isAddress: true,
//             isDay: true,
//             isGeocoding: true,
//             isRequests: true,
//             totalGeocodify: 1,
//             totalErrors: 1,
//             errors: 1,
//             initialDate: new Date(),
//             totalRequests: 1,
//         };

//         sut.setControls(controlsData);

//         expect(sut.getControls()).toEqual(controlsData);
//     });

//     it("Should set true if api is daily", () => {
//         sut.setIsDay(true);

//         expect(sut.getIsDay()).toBe(true);
//     });

//     it("Should set date", () => {
//         const date = new Date();

//         sut.setDate(date);

//         expect(sut.getDate()).toEqual(date);
//     });

//     it("Should set address ID", () => {
//         sut.setCurrentAddress(1);

//         expect(sut.getCurrentAddress()).toBe(1);
//     });

//     it("Should set geoapi ID", () => {
//         sut.setGeoapiId("any_geoapi");

//         expect(sut.getGeoapiId()).toBe("any_geoapi");
//     });

//     it("Should set ID", () => {
//         sut.setId(1);

//         expect(sut.getId()).toBe(1);
//     });

//     it("Should set number of requests", () => {
//         sut.setRequests(1);

//         expect(sut.getRequests()).toBe(1);
//     });

//     it("Should set number of geocodified addresses", () => {
//         sut.setGeocodify(1);

//         expect(sut.getGeocodify()).toBe(1);
//     });

//     it("Should set number of total geocoifified addresses", () => {
//         sut.setTotalGeocodify(1);

//         expect(sut.getTotalGeocodify()).toBe(1);
//     });

//     it("Should set the key for geoapi", () => {
//         sut.setGeoapiKey("any_key");
    
//         expect(sut.getGeoapiKey()).toEqual("any_key");
//     });

//     it("Should set true if is geocoding", () => {
//         sut.setIsGeocoding(true);

//         expect(sut.getIsGeocoding()).toBe(true);
//     });

//     it("Should set true if requests is avaible", () => {
//         sut.setIsRequests(true);

//         expect(sut.getIsRequests()).toBe(true);
//     });

//     it("Should set true if exists address to geocodify", () => {
//         sut.setIsAddress(true);

//         expect(sut.getIsAddress()).toBe(true);
//     });

//     it("Should set true if exists date", () => {
//         sut.setIsDate(true);

//         expect(sut.getIsDate()).toBe(true);
//     });

//     it("Should set number of errors", () => {
//         sut.setErrors(1);

//         expect(sut.getErrors()).toBe(1);
//     });

//     it("Should set initial date", () => {
//         const date = new Date();

//         sut.setInitialDate(date);

//         expect(sut.getInitialDate()).toEqual(date);
//     });

//     it("Should set number of total errors", () => {
//         sut.setTotalErrors(1);

//         expect(sut.getTotalErrors()).toBe(1);
//     });

//     it("Should set number of total requests", () => {
//         sut.setTotalRequests(1);

//         expect(sut.getTotalRequests()).toBe(1);
//     });
// });
