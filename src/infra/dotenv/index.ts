import * as dotenv from "dotenv";
import { env } from "process";

dotenv.config({
	path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
});

export default {
	APP_PORT: Number.parseInt(env.APP_PORT as any),

	DATABASE_URL: env.DATABASE_URL,

	GEOCODIFY_API_KEY: env.GEOCODIFY_API_KEY,
	GOOGLE_API_KEY: env.GOOGLE_API_KEY,
	HERE_API_KEY: env.HERE_API_KEY,
	MAPBOX_API_KEY: env.MAPBOX_API_KEY,
	OPENCAGE_API_KEY: env.OPENCAGE_API_KEY,
	ORS_API_KEY: env.ORS_API_KEY,
	TOMTOM_API_KEY: env.TOMTOM_API_KEY,

	GEOAPI_SECRET: env.GEOAPI_SECRET as string,
};
