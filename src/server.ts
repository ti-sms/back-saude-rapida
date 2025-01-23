import express, { Router } from "express";
import cors from "cors";

const app = express();
const router = Router();

app.use(express.json({limit: "10mb"}));
app.use(express.urlencoded({limit: "10mb", extended: true, parameterLimit: 50000}));

app.use(cors());

export default app;     