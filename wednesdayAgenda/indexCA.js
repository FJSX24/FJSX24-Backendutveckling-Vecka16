import express from "express";
import userRouterCA from "./routesCA/userCA.js";
import productRouterCA from "./routesCA/productsCA.js";

const app = express();

const PORT = process.env.PORT || 8000;

// Middleware för att hantera JSON-data
app.use(express.json());

// Använd olika routers för olika resursvägar

app.use("/api/users", userRouterCA);
app.use("/api/products", productRouterCA);

// Bara för att visa upp något på startsidan
app.get("/", (req, res) => {
  res.send("Välkommen till apiet");
});

// lyssna på servern
app.listen(PORT, () => {
  console.log(`Servern körs på http://localhost:${PORT}`);
});
