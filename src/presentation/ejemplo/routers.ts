import { Router } from "express";
import { EjemploApiController } from "./controller";

export class EjemploApiRoutes {
    static get routes(): Router {
        const router = Router();
        const ejemploApiController = new EjemploApiController();
        router.post('/ejemplo', ejemploApiController.getAll);

        return router;
    }
}