import prisma from "@/lib/prisma";

export default async function handler(req, res) {
    if(req.method === 'POST') {
        const data = await prisma.user.findUnique({
            include: {
                profile: true,
            },
            where: {
                email: req.body.email,
            },
        });

        return res.status(201).json({
            statusCode: 201,
            status: 'success',
            data: data,
            message:
                'Data başarıyla çekildi.',
        });
    }
}
