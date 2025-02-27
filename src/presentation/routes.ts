import { Router } from 'express';
import { EjemploApiRoutes } from './ejemplo/routers';
// import { CompanyRoutes } from './company/routers'; //Ejemplo de import


export class AppRoutes {

    static get routes(): Router {

        const router = Router();
        const path = require('path')

        // rutas de apis
        router.use('/api', EjemploApiRoutes.routes); //Ejemplo de creacion de una API

        return router;
    }


}
