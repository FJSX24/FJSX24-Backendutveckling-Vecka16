import express from "express";
const router = express.Router();

// Mockadata
let users = [
  { id: 1, name: "Anna" },
  { id: 2, name: "Klas" },
];

//GET för att: HÄMTA alla users
router.get("/", (req, res) => {
  res.status(200).json(users);
});

// HÄMTA en specifik användare genom att leta efter id
router.get("/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));

  if (!user) return res.status(404).json({ error: "User not found" });

  res.status(200).json(user);
});

// POST: SKAPA en ny användare
router.post("/", (req, res) => {
  const { id, name } = req.body;

  // Validera namn
  if (!name || typeof name !== "string" || name.trim().length < 2) {
    return res
      .status(400)
      .json({ error: "Namn krävs och måste vara minst 2 tecken" });
  }

  const newId = id ?? Date.now();
  if (exists) {
    return res
      .status(409)
      .json({ error: `En användare med id ${newId} finns redan` });
  }

  const newUser = { id: newId, name: name.trim() };
  users.push(newUser);

  res.status(201).json({ message: "Användare skapad!", user: newUser });
});

//PUT:  UPPDATERA en användare
router.put("/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));

  if (!user) return res.status(404).json({ error: "User not found" });

  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "Name is required" });

  const index = users.findIndex((u) => u.id === userId);

  if (index !== -1) {
    users[index].name = name;
    res
      .status(200)
      .json({ message: "Användaren är uppdaterad", user: users[index] });
  } else {
    res
      .status(404)
      .json({ error: "Användaren hittades inte och kunde inte uppdateras" });
  }
});

//DELETE: DELETA en användare
router.delete("/:id", (req, res) => {
  const userId = parseInt(req.params.id);

  if (isNaN(userId)) {
    return res.status(400).json({ error: "Ogiltigt ID-format" });
  }

  const index = users.findIndex((u) => u.id === userId);

  if (index !== -1) {
    const deletedUser = users.splice(index, 1)[0];
    res.status(200).json({
      message: `Användaren med id ${userId} är raderad`,
      deleted: deletedUser,
    });
  } else {
    res.status(404).json({
      error: "Användaren hittades inte och kunde inte raderas.",
    });
  }
});

export default router;
