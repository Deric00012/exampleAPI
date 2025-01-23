import { Request, Response } from "express";
import { prisma } from "../../data/postgres";

export class EjemploApiController {
    public async getAll(req: Request, res: Response): Promise<void> {
        const example = await prisma.$queryRaw<any>`
        select *
        from sec_users
        limit 10;
        `;
        res.send(example);
    }
}