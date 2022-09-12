import env from "../../dotenv";
import { GeoCrawlerFactory } from "../../../main/factories";
import { app } from "./app";

const port = env.APP_PORT || 3333;

app.listen(port, async () => {
    console.log(`Server running at http://localhost:${port}`);

    // call crawler run
    const geoCrawler = await GeoCrawlerFactory()
    console.log(geoCrawler)
})
