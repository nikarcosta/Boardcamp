import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import gamesRouter from "./routers/GamesRoutes.js";
import customersRouter from "./routers/CustomersRoutes.js";

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

app.use(gamesRouter);
app.use(customersRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Servidor online na porta ${PORT}`);
});