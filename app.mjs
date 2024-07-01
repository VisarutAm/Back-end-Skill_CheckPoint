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
 *     summary: Use to create a new question
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *                 
 *     responses:
 *       '201':
 *         description: Question created successfully.
 *       '400':
 *         description: "Bad Request: Missing or invalid request data."
 *       '500':
 *         description: Server could not create question because database connection.
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
 *       '500':
 *         description: Server could not read questions because database connection.
 */

//----Get with ID----//
/**
 * @swagger
 * /questions/{id}:
 *   get:
 *     summary: Use to request a question by its parameter ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the question to retrieve
 *     responses:
 *       '200':
 *         description: Successfully retrieved the question.
 *       '404':
 *         description: Question not found.
 *       '500':
 *         description: Server could not read question because database connection.
 */

//----Update----//
/**
 * @swagger
 * /questions/{id}:
 *   put:
 *     summary: Use to update a question by its parameter ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the question to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *                 
 *     responses:
 *       '200':
 *         description: Successfully updated the question.
 *       '400':
 *         description: "Bad Request: Missing or invalid request data."
 *       '404':
 *         description: Question not found.
 *       '500':
 *         description: Server could not update question because database connection.
 */

//-----Delete-----//
/**
 * @swagger
 * /questions/{id}:
 *   delete:
 *     summary: Use to delete a question by its parameter ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the question to delete
 *     responses:
 *       '200':
 *         description: Successfully deleted the question.
 *       '404':
 *         description: Question not found.
 *       '500':
 *         description: Server could not delete question because database connection.
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
