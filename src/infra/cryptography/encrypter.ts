import env from "../dotenv"
import { AES, enc } from "crypto-js";

export class Encrypter { 
	private readonly secret = env.GEOAPI_SECRET;

  encrypt(data: string): string {
		return AES.encrypt(data, this.secret).toString();
  }

  decrypt(data: string): string {
		return AES.decrypt(data, this.secret).toString(enc.Utf8);
  }
}
