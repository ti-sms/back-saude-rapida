import express from "express";

const app = express();

const logger = (req: any, res: any, next: any) => {
    console.log(`Request method? ${req.method}, URL: ${req.url}`);
};

app.use(logger);

app.get("/", (req, res) => {
    res.send("Hello world 🌞");
});

export default app;  