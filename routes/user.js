import express from "express";

const router = express.Router();

let users = [
  { id: 1, name: "Mandus" },
  { id: 2, name: "Hubert" },
];

// Swagger info: GET / behöver vi dokumentera

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
 *         description: Lyckad hämtning av alla användare
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: Användarens unika id
 *                   name:
 *                     type: string
 *                     description: Användarens namn
 */

router.get("/", (req, res) => {
  res.status(200).json(users);
});

// Swagger info: POST / behöver vi dokumentera

/**
 * @swagger
 * /api/users:
 *   post:
 *     tags:
 *       - users
 *     summary: Skapa en ny användare
 *     description: Skapar en ny användare
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Användare skapad
 *         content:
 *           application/json:
 *            schema:
 *               $ref: '#/components/schemas/UserResponse'
 */

router.post("/", (req, res) => {
  const newUser = req.body;

  users.push(newUser);

  res.status(201).json({ message: "Användare skapad", user: newUser });
});

export default router;
