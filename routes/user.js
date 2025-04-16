import express from "express";

const router = express.Router();

let users = [
  { id: 1, name: "Anna" },
  { id: 2, name: "Klas" },
];

//   Crud med user

// GET - Hämta alla användare
router.get("/", (req, res) => {
  res.status(200).json(users);
});

// GET med Path Params
router.get("/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));

  if (!user) return res.status(404).json({ error: "User not found" });

  res.json(user);
});

// POST - Skapa ny användare
router.post("/", (req, res) => {
  const { id, name } = req.body;

  if (!id || !name || name.trim().length < 2)
    return res.status(400).json({
      error:
        "Id and name are required, and name must be minmum than 2 characters",
    });

  const exist = users.find((user) => user.id === id);

  if (exist) {
    return res
      .status(409)
      .json({ error: `A user with id "${id}" already exists.` });
  }
  const newUser = { id, name };

  users.push(newUser);

  res.status(201).json(newUser);
});

// PUT - Uppdatera användare
router.put("/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));

  if (!user) return res.status(404).json({ error: "User not found" });

  const { name } = req.body;

  if (!name) return res.status(400).json({ error: "Name is required" });
  user.name = name;

  const index = users.findIndex((u) => u.id === user.id);

  if (index !== -1) {
    users[index].name = name;
    res.status(200).json({ message: "User is updated", user: users[index] });
  } else {
    res
      .status(404)
      .json({ error: "User was not found and couldn`t be updated" });
  }
});

// DELETE - Ta bort användare
router.delete("/:id", (req, res) => {
  const index = users.findIndex((u) => u.id === parseInt(req.params.id));

  const userId = parseInt(req.params.id);

  if (isNaN(userId)) {
    return res.status(400).json({ error: "Not a valid data for the id" });
  }

  if (index !== -1) {
    const deletedUser = users.splice(index, 1)[0];

    res
      .status(200)
      .json({ message: "User is deleted", deletedUser: deletedUser });
  } else {
    res
      .status(404)
      .json({ error: "User was not found and couldn`t be deleted" });
  }
});

export default router;
