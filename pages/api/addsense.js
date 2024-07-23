// POST isteği ile gönderilen veri JSON formatında olmalıdır ve aşağıdaki alanları içermelidir:
// {
//   "baslangicTarihi": string,
//   "bitisTarihi": string,
//   "butceTipi": string,
//   "gunlukButceMiktari": int,
//   "reklamAdi": string,
//   "reklamTarihi": string,
//   "reklamTipi": string,
// }

import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  console.log(req.method);
  if (req.method === "GET") {
    try {
      const allAdverts = await prisma.adverts.findMany();
      console.log(allAdverts);
      res.json(allAdverts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to retrieve adverts" });
    }
  } else if (req.method === "POST") {
    console.log(req.body);
    try {
      const createdAdvert = await prisma.adverts.create({
        data: req.body,
      });

      res.status(201).json(createdAdvert);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Advert creation failed" });
    }
  } else if (req.method === "PUT") {
    const { id, data } = req.body;
    try {
      const updatedAdvert = await prisma.adverts.update({
        where: {
          id: id,
        },
        data: data,
      });
      const response_data = await prisma.adverts.findMany({});
      res.json(response_data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Advert update failed" });
    }
  } else if (req.method === "DELETE") {
    const id = req.query.id; // veya req.body.id; duruma göre
    console.log(id);
    try {
      await prisma.adverts.delete({
        where: {
          id: id,
        },
      });
      res.json({ message: "Advert deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Advert deletion failed" });
    }
  } else {
    res.status(405).json({ statusCode: 405, message: "Method Not Allowed" });
  }
}
