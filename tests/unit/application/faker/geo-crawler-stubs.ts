// import { Geocoder } from "../../../../src/application/rules/geocoder/geocoder";
// import { GeoCrawlerInterface } from "../../../../src/application/rules/geoCrawler/geoCrawler";
// import { GeoCrawler } from "../../../../src/application/useCases/geoCrawler/GeoCrawler";
// import { AddressEntity } from "../../../../src/domain/rules/address";
// import { ResponseEntity } from "../../../../src/domain/rules/response";
// import { AddressRepositoryPostegreSql } from "../../../../src/infra/db/techs/postegreSql/useCases/addressRepository";
// import { ResponseRepositoryPostegreSql } from "../../../../src/infra/db/techs/postegreSql/useCases/responseRepository";
// import { SqlControlsRepository } from "../../../../src/interfaces/adpters/db/application/useCases/controlsRepository/sqlControlsRepository";
// import { ControlsModel } from "../../../../src/infra/db/models/controls";
// import { ControlsRepository, get, update } from "../../../../src/application/rules/controlsRepository/controlsRepository";
// import { ResponseRepository } from "../../../../src/application/rules/responseRepository/responseRepository";
// import { AddressRepository } from "../../../../src/application/rules/addressRepository/addressRepository";

// export const responseControlsData: ControlsModel = {
//     id: 1,
//     isDay: true,
//     date: new Date(),
//     requests: 1,
//     current_address: 1,
//     geocodify: 1,
//     total_geocodify: 1,
//     geoapi_key: "api_key",
//     geoapi_id: "geoapi_id",
//     isGeocoding: true,
//     isRequests: true,
//     isAddress: true,
//     isDate: true,
//     initial_date: new Date(),
//     total_requests: 1,
//     errors: 0,
//     total_errors: 0,
// };

// export const addressResponse: ResponseEntity[] = [
//     {
//         city: "São Paulo",
//         country: "Brasil",
//         district: "Centro",
//         full_address: "Rua Teste, cidade, estado - país",
//         latNorthBBox: -23.56267780291527,
//         latSouthBBox: -23.56492769708468,
//         latitude: -23.564,
//         longEastBBox: -46.63120719708497,
//         longWestBBox: -46.62882780291527,
//         longitude: -46.633,
//         number: "Teste",
//         place_type: "street_address",
//         public_place: "Rua Teste",
//         state: "São Paulo",
//         zip_code: "01310-000",
//     },
// ];

// export interface SutTypes {
//     geoApiStub: Geocoder;
//     addressRepositoryStub: AddressRepositoryPostegreSql;
//     responseRepositoryStub: ResponseRepositoryPostegreSql;
//     controlsRepositoryStub: SqlControlsRepository;
//     geoCrawler: GeoCrawlerInterface;
// }

// export const makeSut = (): SutTypes => {
//     class api extends Geocoder {
//         readonly httpGet: HttpsGetAdpter;

//         constructor(httpGet: HttpsGetAdpter) {
//             super({
//                 name: "api_name",
//                 apiKey: "api_key",
//                 url: "api_url",
//                 isDay: true,
//                 maxRequest: 100,
//             });
//             this.httpGet = httpGet;
//         }
//         getFormatedAddress(address: string): string {
//             return address;
//         }
//         responseGeoapi(address: string): Promise<any> {
//             return new Promise((resolve) => resolve(addressResponse));
//         }
//         responseMapper(json: any): Promise<any> {
//             return new Promise((resolve) => resolve(addressResponse));
//         }
//     }

//     class HttpsGetAdpter {
//         get(params: any): Promise<any> {
//             return new Promise((resolve) =>
//                 resolve({
//                     statusCode: 200,
//                     body: JSON.stringify(addressResponse),
//                 })
//             );
//         }
//     }

//     class AddressRepositoryPostegreSql extends AddressRepository {
//         readerAllAddress(): Promise<any> {
//             throw new Error("Method not implemented.");
//         }
//         createAddress(address: any): Promise<any> {
//             throw new Error("Method not implemented.");
//         }
//         readerOneAddress(): Promise<AddressEntity> {
//             return new Promise((resolve) =>
//                 resolve({
//                     id: 1,
//                     address: "address",
//                 })
//             );
//         }
//     }

//     class ResponseRepositoryPostegreSql extends ResponseRepository {
//         executeQuery(query: string): Promise<any> {
//             return new Promise((resolve) => resolve(responseControlsData));
//         }
//         saveResponseGeoApi(data: any): Promise<void> {
//             return new Promise((resolve) => resolve());
//         }
//         saveResponseGeoCodify(data: any): Promise<void> {
//             return new Promise((resolve) => resolve());
//         }
//     }

//     class SqlControlsRepository extends ControlsRepository {
//         readonly sqlDrive: any;

//         constructor() {
//             super();
//         }
//         getControlsByGeoapiId(data: get): Promise<ControlsModel> {
//             return new Promise((resolve) => resolve(responseControlsData));
//         }
//         getControlsAllByGeoapiId(data?: get): Promise<ControlsModel[]> {
//             return new Promise((resolve) => resolve([responseControlsData]));
//         }
//         update(data: update): Promise<ControlsModel> {
//             return new Promise((resolve) => resolve(responseControlsData as ControlsModel));
//         }
//     }

//     const geoApiStub = new api(new HttpsGetAdpter());
//     const addressRepositoryStub = new AddressRepositoryPostegreSql();
//     const responseRepositoryStub = new ResponseRepositoryPostegreSql();
//     const controlsRepositoryStub = new SqlControlsRepository();
//     const geoCrawler: GeoCrawlerInterface = new GeoCrawler(
//         geoApiStub,
//         addressRepositoryStub,
//         responseRepositoryStub,
//         controlsRepositoryStub
//     );

//     return { geoApiStub, addressRepositoryStub, responseRepositoryStub, controlsRepositoryStub, geoCrawler };
// };
