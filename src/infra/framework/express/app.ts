import express from "express";
import { cors } from "./middlewares";
import { routes } from "./routes/index";
import path from "path";

const app = express();

app.use(express.static(path.join(path.resolve()) + "/public/frontend"));

app.use(express.json());
app.use(cors);

app.use(routes);

export { app };
