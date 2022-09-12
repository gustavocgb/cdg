// Only for development purposes. Change extension to .test.ts to run.
import { Geoapi, PrismaClient } from "@prisma/client";

describe("Prisma ORM CRUD", () => {
    let prisma: PrismaClient;
    const geoapi: Geoapi = {
        geoapi_id: "any_geoapi",
        maxRequestPerDay: 1000,
        maxRequestPerSecond: 1,
    };

    beforeAll(async () => {
        prisma = new PrismaClient();
        await prisma.$transaction([
            prisma.geoapi.deleteMany(),
        ]);
    });

    it("Should create a new geoapi", async () => {
        const createdGeoapi = await prisma.geoapi.create({
            data: geoapi,
        });

        expect(createdGeoapi).toEqual(geoapi);
    });

    it("Should get all geoapis", async () => {
        const fetchedGeoapis = await prisma.geoapi.findMany();

        expect(fetchedGeoapis.length).toEqual(1);
        expect(fetchedGeoapis[0]).toEqual(geoapi);
    });

    it("Shoud update a geoapi by name", async () => {
        const geoapiUpdated = {
            geoapi_id: geoapi.geoapi_id,
            maxRequestPerDay: 2000,
            maxRequestPerSecond: 5,
        };
        await prisma.geoapi.update({
            where: {
                geoapi_id: geoapi.geoapi_id,
            },
            data: geoapiUpdated,
        });

        const fetchedGeoapis = await prisma.geoapi.findMany();

        expect(fetchedGeoapis.length).toEqual(1);
        expect(fetchedGeoapis[0]).toEqual(geoapiUpdated);
    });

    it("Shoud delete a geoapi by name", async () => {
        const deletedGeoApi = await prisma.geoapi.delete({
            where: {
                geoapi_id: geoapi.geoapi_id,
            },
        });

        const fetchedGeoapis = await prisma.geoapi.findMany();

        expect(fetchedGeoapis.length).toEqual(0);
        expect(deletedGeoApi.geoapi_id).toEqual(geoapi.geoapi_id);
    });
});
