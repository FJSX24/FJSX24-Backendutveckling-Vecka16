import express from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import userRouter from "./routes/user.js";

const app = express();
const PORT = 8000;

// Swagger-dokumentations inställningar, för att generera en api-dokumentation
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Mandus RESTful API",
      description: "API-dokumentation med Swagger",
      version: "1.0.0",
    },
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(express.json());

// route middleware för user
app.use("/api/users", userRouter);

app.listen(PORT, () => {
  console.log("servern körs på : http://localhost:8000");
});
