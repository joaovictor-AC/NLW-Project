import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express"
import "express-async-errors"
import cors from "cors"
import { router } from "./routes";
import "./database"

const app = express();

app.use(cors());
app.use(express.json());

// Rotas
app.use(router);

// Middleware para erros

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {

    if (err instanceof Error) {
        return response.status(400).json({
            error: err.message
        })
    }

    return response.status(500).json({
        status: "error",
        message: "Internal Server Error"
    })

});

app.listen(3000, () => console.log("Serve is running!!!"));
