// api/index.js

let donations = []; // menyimpan donasi sementara

export default async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    // Validasi data
    if (!data.playerName || !data.amount) {
      return res.status(400).json({ error: "Missing playerName or amount" });
    }

    // Cek apakah pemain sudah pernah donasi
    const existing = donations.find(d => d.playerName === data.playerName);
    if (existing) {
      existing.amount += data.amount;
    } else {
      donations.push({
        playerName: data.playerName,
        amount: data.amount
      });
    }

    console.log("💰 Donasi baru diterima:", data);
    return res.status(200).json({ success: true });
  }

  if (req.method === "GET") {
    return res.status(200).json(donations);
  }

  res.status(405).json({ error: "Method not allowed" });
}
