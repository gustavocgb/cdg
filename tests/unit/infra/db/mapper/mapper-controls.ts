// import { mapperControls } from "../../../../../src/infra/db/mapper/mapperControls";

// describe("Controls Mapper", () => {
//     const date = new Date();

//     const model: any = {
//         id: 1,
//         isDate: true,
//         isRequests: true,
//         isAddress: true,
//         date: date,
//         current_address: 1,
//         isGeocoding: true,
//         geocodify: 1,
//         requests: 1,
//         total_geocodify: 1,
//         isDay: true,
//         geoapi_key: "any_key",
//         geoapi_id: "any_geoapi",
//         errors: 1,
//         total_requests: 1,
//         initial_date: date,
//         total_errors: 1,
//     };
//     const entity: any = {
//         id: 1,
//         isDate: true,
//         isRequests: true,
//         isAddress: true,
//         date: date,
//         currentAddress: 1,
//         isGeocoding: true,
//         geocodify: 1,
//         requests: 1,
//         totalGeocodify: 1,
//         isDay: true,
//         geoapiKey: "any_key",
//         geoapiId: "any_geoapi",
//         errors: 1,
//         totalRequests: 1,
//         initialDate: date,
//         totalErrors: 1,
//     };

//     it("Should return entity mapped from database model", () => {
//         const result = mapperControls.modelToEntity(model);
//         expect(result).toEqual(entity);
//     });

//     it("Should return database model mapped from entity", () => {
//         const result = mapperControls.entityToModel(entity);
//         expect(result).toEqual(model);
//     });

//     it("Should return database model mapped from undefined entity", () => {
//         const result = mapperControls.entityToModel(undefined);
//         expect(result).toEqual({});
//     });
// });
