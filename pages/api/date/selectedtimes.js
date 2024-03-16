import prisma from '@/lib/prisma';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const createdSelectedTime = await prisma.selectedTimes.create({
                data: req.body,
            });
            res.status(201).json(createdSelectedTime);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Selected times creation failed' });
        }
    } else if (req.method === 'PUT') {
        const { id } = req.query;
        try {
            const updatedSelectedTime = await prisma.selectedTimes.update({
                where: {
                    id: parseInt(id),
                },
                data: req.body,
            });
            res.json(updatedSelectedTime);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Selected times update failed' });
        }
    } else if (req.method === 'DELETE') {
        const { id } = req.query;
        try {
            await prisma.selectedTimes.delete({
                where: {
                    id: parseInt(id),
                },
            });
            res.json({ message: 'Selected times deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Selected times deletion failed' });
        }
    } else {
        res.status(405).json({ statusCode: 405, message: 'Method Not Allowed' });
    }
}
