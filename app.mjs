import express from "express";
import questionsRouter from "./routes/Questions.mjs";
import answersRouter from "./routes/Answers.mjs";
import votesRouter from "./routes/Vote.mjs";

import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const app = express();
const port = 4000;

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: "Question API",
      description: "Question API Information",
      contact: {
        name: "Question"
      },
    },
    servers: [
      {
        url: "http://localhost:4000"
      }
    ]
  },
  apis: ["app.mjs"]
};
// const swaggerOptions = {
//   definition: {
//     openapi: '3.0.0',
//     info: {
//       title:"Question API",
//       description:"Question API Informations",
//       contact: {
//         name: "Question"
//       },
//       servers: [
//         {
//           url: "http://localhost:4000"
//         }
//       ]
//     }
//   },
//   apis:["app.mjs"]
// };

const swaggerDocs=swaggerJsDoc(swaggerOptions);
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerDocs));

// Swagger JSDoc comments should be correctly formatted
//------Create-----//
/**
 * @swagger
 * /questions:
 *   post:
 *     description: Use to create new question
 *     responses:
 *       '201':
 *         description: Question created successfully
 */
//----Get----//
/**
 * @swagger
 * /questions:
 *   get:
 *     description: Use to request all question
 *     responses:
 *       '200':
 *         description: Successfully retrieved the list of questions.
 */

//----Get with ID----//
/**
 * @swagger
 * /questions/2:
 *   get:
 *     description: Use to request by its parameter ID
 *     responses:
 *       '200':
 *         description: Successfully retrieved the question.
 */
//----Update----//
/**
 * @swagger
 * /questions/2:
 *   put:
 *     description: Use to update a question by its parameter ID
 *     responses:
 *       '200':
 *         description: Successfully updated the question.
 */
//-----Delete-----//
/**
 * @swagger
 * /questions/2:
 *   delete:
 *     description: Use to delete a question by its parameter ID
 *     responses:
 *       '200':
 *         description: Successfully deleted the question
 */

app.use(express.json());
app.use("/questions",questionsRouter)
app.use("/questions",answersRouter)
app.use("/questions",votesRouter)


app.get("/test", (req, res) => {
  return res.json("Server API is working 🚀");
});

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
