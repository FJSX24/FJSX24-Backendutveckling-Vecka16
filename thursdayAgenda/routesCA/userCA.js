import express from "express";

const router = express.Router();

// swagger info om GET anropet

/**
 * @swagger
 * /api/users:
 *   get:
 *     tags:
 *       - users
 *     summary: Hämta alla användare
 *     description: Returnerar en lista med alla användare
 *     responses:
 *       200:
 *         description: Lyckad hämtning av användare
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: Användarens unika ID
 *                   name:
 *                     type: string
 *                     description: Användarens namn
 */

// skapa en GET route för att hämta alla users
router.get("/", (req, res) => {
  const users = [
    { id: 1, name: "Mandus" },
    { id: 2, name: "Klas" },
  ];

  res.json(users);
});

// swagger info om POST anropet

/**
 * @swagger
 * /api/users:
 *   post:
 *     tags:
 *       - users
 *     summary: Skapa en ny användare
 *     description: Skapar en användare med ett namn
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Namnet på användaren
 *                 example: "Kristina"
 *     responses:
 *       201:
 *         description: Användare skapad
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Bekräftelsemeddelande
 *                 user:
 *                   type: object
 *                   description: Den skapade användaren
 */

// Skapa en POST route för att kunna skapa en ny user
router.post("/", (req, res) => {
  const newUser = req.body;

  res.status(201).json({ message: "Användaren är skapad", user: newUser });
});

export default router;
