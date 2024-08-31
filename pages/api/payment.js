import * as fs from "fs/promises";
import path from "path";

// cüzdana ekle
export const updateWallet = async (data) => {
  console.log("asdasdasd",data);
  
  const {amount,userId} = JSON.parse(data);
  console.log("updateWallet",userId,amount);

  const walletPath = path.join(process.cwd(), "public/wallet.json");

  // Cüzdan güncelle
  try {
    // JSON dosyasını asenkron olarak oku
    const readWallets = await fs.readFile(walletPath, "utf-8");
    const walletDatabase = JSON.parse(readWallets); // JSON verisini parse et
    console.log(walletDatabase);

    // Mevcut cüzdan verisini güncelle veya yeni kullanıcı ekle
    if (walletDatabase[userId]) {
      walletDatabase[userId].amount += amount;
    } else {
      walletDatabase[userId] = { amount };
    }

    // JSON dosyasını asenkron olarak yaz
    await fs.writeFile(walletPath, JSON.stringify(walletDatabase, null, 2));
  } catch (error) {
    console.error("Error while reading or writing wallet:", error);
  }
};


// Log eklemek için kullanılan fonksiyon
export const addLog = async (message) => {
  const logPath = path.join(process.cwd(), "public/logs.json");

  // log ekle
  try {
    // JSON dosyasını asenkron olarak oku
    const readLogs = await fs.readFile(logPath, "utf-8");
    const fakeDatabase = JSON.parse(readLogs); // JSON verisini parse et
    // Yeni log mesajını ekle
    fakeDatabase.logs.push({
      data: JSON.parse(message),
      timestamp: new Date().toISOString(),
    });

    // JSON dosyasını asenkron olarak yaz
    await fs.writeFile(logPath, JSON.stringify(fakeDatabase, null, 2));
  } catch (error) {
    console.error("Error while reading or writing logs:", error);
  }
};

// API route handler
export default async function handler(req, res) {
  if (req.method === "POST") {
    if (req.body) {
      console.log("şurası",req.body);
      
      await updateWallet(req.body)
      await addLog(req.body); // Log ekleme fonksiyonunu asenkron çağır
      res.status(200).send({ status: "Success", data: JSON.parse(req.body) });
    } else {
      res.status(400).send({ status: "Error", message: "No data provided" });
    }
  } else {
    res.status(405).send({ status: "Error", message: "Method not allowed" });
  }
}
