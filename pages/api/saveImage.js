// pages/api/saveData.js
import fs from "fs";
import { type } from "os";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export default function handler(req, res) {
  if (req.method === "POST") {
    const { dataImg, id } = req.body;

    const backgroundImage = uuidv4();

    const imagePath = path.join(
      process.cwd(),
      `public/images/camera/${backgroundImage}.jpeg`
    );
    const base64Data = dataImg.replace(/^data:image\/jpeg;base64,/, "");
    fs.writeFile(imagePath, base64Data, "base64", (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to save image" });
        return;
      }
    });
    // read all users
    const allUsersPath = path.join(process.cwd(), "data/database.json");
    const allUsers = JSON.parse(fs.readFileSync(allUsersPath));
    // find the user with id
    const userIndex = allUsers.findIndex((user) => user.id === id);
    const user = allUsers[userIndex];
    // update the user with the file name
    user["plants"] = [
      ...user["plants"],
      {
        id: id,
        plantName: "",
        type: "",
        familyName: "",
        plantImage: "",
        backgroundImage: `${backgroundImage}.jpeg`,
        note: "",
        careInfo: {
          Watering: "",
          Light: "",
          Temperature: "",
          Poisoning: "",
          careLevel: "",
        },
        position: {
          x: 0,
          y: 0,
        },
        birthday: "",
        awards: {
          type: "",
          totalStars: 0,
          imagesrc: "",
          win: false,
        },
      },
    ];

    allUsers[userIndex] = user;
    fs.writeFileSync(allUsersPath, JSON.stringify(allUsers, null, 4));

    res.status(200).json({
      message: "image saved successfully",
      backgroundImage: `${backgroundImage}.jpeg`,
    });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
