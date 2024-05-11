// pages/api/saveData.js
import fs from "fs";
import path from "path";

export default function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    const dataStr = JSON.stringify(data, null, 4);

    const filePath = path.join(process.cwd(), "data/database.json");

    fs.writeFile(filePath, dataStr, (err) => {
      if (err) {
        console.error("Error writing file:", err);
        res.status(500).json({ message: "Failed to write to file" });
        return;
      }
      res.status(200).json({ message: "Data saved successfully" });
    });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
