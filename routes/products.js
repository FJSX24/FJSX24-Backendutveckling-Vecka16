import express from "express";

const router = express.Router();

let products = [
  { id: 1, name: "Computer" },
  { id: 2, name: "Headphone" },
];

//   CRUD med products

// GET - Hämta alla products
router.get("/", (req, res) => {
  res.status(200).json(products);
});

// GET med specifik product
router.get("/:id", (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));

  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  } else {
    res.status(200).json(product);
  }
});

// POST - Skapa ny product
router.post("/", (req, res) => {
  const newProduct = req.body;

  if (!newProduct) {
    return res.status(404).json({ error: "Product was not created" });
  } else {
    res
      .status(201)
      .json({ message: "Product was created", product: newProduct });
    products.push(newProduct);
  }
});

// PUT - Update a product
router.put("/:id", (req, res) => {
  const updatedProduct = req.body;

  const index = products.findIndex((p) => p.id === parseInt(req.params.id));

  if (index !== -1) {
    products[index] = updatedProduct;

    res
      .status(200)
      .json({ message: "Product is updated", product: updatedProduct });
  } else {
    res
      .status(404)
      .json({ error: "Product was not found and couldn`t be updated" });
  }
});

// DELETE - Delete a product
router.delete("/:id", (req, res) => {
  const index = products.findIndex((p) => p.id === parseInt(req.params.id));

  if (index !== -1) {
    products.splice(index, 1);
    res.status(200).json({
      message: `Product with id: ${parseInt(req.params.id)} is deleted`,
    });
  } else {
    res
      .status(404)
      .json({ error: "Product was not found and couldn`t be deleted" });
  }
});

export default router;
