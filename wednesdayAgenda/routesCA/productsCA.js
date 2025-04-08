import express from "express";
const router = express.Router();

// Dummy-databas (simulerade produkter)
const products = [
  { id: 1, name: "Laptop" },
  { id: 2, name: "Smartphone" },
];

// GET - Hämta alla produkter
router.get("/", (req, res) => {
  res.status(200).json(products);
});

// GET - Hämta en specifik produkt
router.get("/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find((p) => p.id === productId);
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json({ message: "Produkt hittades inte" });
  }
});

// POST - Lägg till en ny produkt
router.post("/", (req, res) => {
  const newProduct = req.body;
  products.push(newProduct);
  res.status(201).json({ message: "Produkt skapad", product: newProduct });
});

// PUT - Uppdatera en produkt
router.put("/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const updatedProduct = req.body;
  const index = products.findIndex((p) => p.id === productId);

  if (index !== -1) {
    products[index] = updatedProduct;
    res
      .status(200)
      .json({ message: "Produkt uppdaterad", product: updatedProduct });
  } else {
    res.status(404).json({ message: "Produkt hittades inte" });
  }
});

// DELETE - Ta bort en produkt
router.delete("/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const index = products.findIndex((p) => p.id === productId);

  if (index !== -1) {
    products.splice(index, 1);
    res.status(200).json({ message: `Produkt med id ${productId} raderad` });
  } else {
    res.status(404).json({ message: "Produkt hittades inte" });
  }
});

export default router;
