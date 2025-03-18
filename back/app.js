import 'dotenv/config';
import express from 'express';
import { router } from "./src/router.js";
import cors from 'cors';

const app = express();

app.use(express.json());

app.use(cors({
    origin: ["http://127.0.0.1:5500", "http://localhost:5500"]
}));

app.use(router);

app.listen(process.env.PORT, () => {
    console.log(`🚀 Listening on ${process.env.BASE_URL}:${process.env.PORT}`);
});