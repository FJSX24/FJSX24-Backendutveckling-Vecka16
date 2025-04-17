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
    servers: [
      {
        url: "http://localhost:8000",
        description: "Local dev server",
      },
    ],
    components: {
      schemas: {
        User: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              description: "Användarens unika id",
              example: 1,
            },
            name: {
              type: "string",
              description: "Användarens namn",
              example: "Kajsa",
            },
          },
        },
        UserResponse: {
          type: "object",
          properties: {
            message: {
              type: "string",
              description: "Bekräftelsemeddelande",
            },
            user: {
              $ref: "#/components/schemas/User",
            },
          },
        },
      },
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
