import * as fs from "fs/promises";
import path from "path";

const walletPath = path.join(process.cwd(), "public/wallet.json");

export const updateWallet = async (data) => {  
  const { amount, userId } = JSON.parse(data); // JSON.parse yapmadan doğrudan ayrıştır
  console.log("updateWallet", userId, amount);

  try {
    // JSON dosyasını asenkron olarak oku
    const readWallets = await fs.readFile(walletPath, "utf-8");
    const walletDatabase = JSON.parse(readWallets); // JSON verisini parse et
    console.log(walletDatabase);

    // Eğer kullanıcı varsa, cüzdan verisini geri döndür
    if (walletDatabase[userId]) {
      return { status: "Success", data: walletDatabase[userId] };
    } else {
      return { status: "Error", message: "No data" };
    }

  } catch (error) {
    console.error("Error while reading or writing wallet:", error);
    return { status: "Error", message: "Wallet processing error" };
  }
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    if (req.body) {
      console.log("Request body:", req.body);

      // Gelen body verisini JSON.parse ile ayrıştırmak yerine doğrudan kullan
      const data = await updateWallet(req.body);

      // Geri dönen data zaten JSON formatında olduğundan yeniden parse etmeye gerek yok
      res.status(200).send(data);
    } else {
      res.status(400).send({ status: "Error", message: "No data provided" });
    }
  } else {
    res.status(405).send({ status: "Error", message: "Method not allowed" });
  }
}
