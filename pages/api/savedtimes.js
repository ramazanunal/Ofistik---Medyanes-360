import prisma from '@/lib/prisma';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const createdSavedTime = await prisma.SavedTimes.findMany();
            const result = createdSavedTime?.map((e) => e?.time)

            res.status(201).json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Saved times creation failed' });
        }
    } else if (req.method === 'POST') {
        try {
            console.log(req.body)
            const createdSavedTime = await prisma.SavedTimes.create({
                data: {
                    time: req.body.time
                },
            });
            res.status(201).json(createdSavedTime);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Saved times creation failed' });
        }
    } else if (req.method === 'PUT') {
        const { id } = req.query;
        try {
            const updatedSavedTime = await prisma.savedTimes.update({
                where: {
                    id: id,
                },
                data: req.body,
            });
            res.json(updatedSavedTime);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Saved times update failed' });
        }
    } else if (req.method === 'DELETE') {
        const { time } = req.query;
        try {
            const times = await prisma.savedTimes.findMany()
            const deleTime = times.filter((saved) => saved.time === time)[0];
            await prisma.savedTimes.delete({
                where: {
                    id: deleTime.id,
                },
            });
            res.json({ message: 'Saved times deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Saved times deletion failed' });
        }
    } else {
        res.status(405).json({ statusCode: 405, message: 'Method Not Allowed' });
    }
}
