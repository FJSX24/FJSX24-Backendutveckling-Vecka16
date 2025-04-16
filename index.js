import express from "express";
import userRouter from "./routes/user.js";
import productRouter from "./routes/products.js";

const app = express();

const PORT = process.env.PORT || 8000;

// Middleware för att läsa JSON
app.use(express.json());

// Bara för att visa upp något på startsidan
app.get("/", (req, res) => {
  res.send("Hello express server");
});

// Middleware för att använda users routen
app.use("/api/users", userRouter);
// Middleware för att använda products routen
app.use("/api/products", productRouter);

// Starta servern
app.listen(PORT, () => {
  console.log(`Servern körs på http://localhost:${PORT}`);
});
