import { Request, Response } from "express";
import { prisma } from "../../data/postgres";

export class EjemploApiController {
    public async getAll(req: Request, res: Response): Promise<void> {
        const example = await prisma.$queryRaw<any>`
        select 
        sl.inicio - interval '6 hours' as inicio,
        sl.fin  - interval '6 hours' as fin,
        fe.alternative_code as alternative_code ,
        fe.names as nombres,
        fe.last_names as apellidos,
        sl.nombre ,
        sl.version_app,
        sl.id_device 
        from sync_log sl 
        join fcpy_employees fe on fe.id = sl.codigo_empleado
        where sl.nombre = 'agritask MO'
        order by sl.id desc
        limit 300;
        `;
        res.send(example);
    }
}