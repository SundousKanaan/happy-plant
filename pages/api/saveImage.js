// pages/api/saveData.js
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export default function handelr(req, res) {
  if (req.method === "POST") {
    const { dataImg, userId, plantId, plantType } = req.body;

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
    const userIndex = allUsers.findIndex((user) => user.id === userId);
    const user = allUsers[userIndex];

    // find the plant with plantId
    const plantIndex = user.plants.findIndex((plant) => plant.id === plantId);

    console.log({ plantIndex });
    if (plantIndex !== -1) {
      // Delete the old image
      const oldBackgroundImage = user.plants[plantIndex].backgroundImage;
      const oldImagePath = path.join(
        process.cwd(),
        `public/images/camera/${oldBackgroundImage}`
      );
      fs.unlinkSync(oldImagePath);

      user.plants[plantIndex].backgroundImage = `${backgroundImage}.jpeg`;
    } else {
      // update the user with the file name
      user.plants.push({
        id: plantId,
        plantName: "",
        type: plantType,
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
      });
    }
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
