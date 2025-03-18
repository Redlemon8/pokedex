import 'dotenv/config';
import express from 'express';
import { router } from "./src/router.js";
import { notFound, errorHandler } from "./src/middleware/errorHandlers.js";
import cors from 'cors';

const app = express();

app.use(express.json());

app.use(cors());

app.use(router);

app.use(notFound);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
    console.log(`🚀 Listening on ${process.env.BASE_URL}:${process.env.PORT}`);
});