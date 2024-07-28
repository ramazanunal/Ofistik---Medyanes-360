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
  if (req.method === "GET") {
    try {
      const allCampaigns = await prisma.campaign.findMany();
      res.json(allCampaigns);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to retrieve adverts" });
    }
  } else if (req.method === "POST") {
    console.log(req.body);
    try {
      const createdAdvert = await prisma.campaign.create({
        data: req.body,
      });

      res.status(201).json(createdAdvert);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Campaign creation failed" });
    }
  } else if (req.method === "PUT") {
    const { id, data } = req.body;
    try {
      const updatedAdvert = await prisma.campaign.update({
        where: {
          id: id,
        },
        data: data,
      });
      const response_data = await prisma.campaign.findMany({});
      res.json(response_data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Campaign update failed" });
    }
  } else if (req.method === "DELETE") {
    const id = req.query.id; // veya req.body.id; duruma göre
    console.log(id);
    try {
      await prisma.campaign.delete({
        where: {
          id: id,
        },
      });
      res.json({ message: "Campaign deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Campaign deletion failed" });
    }
  } else {
    res.status(405).json({ statusCode: 405, message: "Method Not Allowed" });
  }
}
