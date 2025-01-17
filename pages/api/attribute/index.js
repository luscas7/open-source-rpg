import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if(req.method === 'POST') {
        const { body } = req;

        if(!body.name) {
            return res.status(400).json({ error: 'Name not set' });
        }

        const attribute = await prisma.attribute.create({
            data: body
        });

        return res.status(200).json(attribute);
    }
    else if(req.method === 'GET') {
        const attributes = await prisma.attribute.findMany();

        return res.status(200).json(attributes);
    }
    else {
        return res.status(404);
    }
}