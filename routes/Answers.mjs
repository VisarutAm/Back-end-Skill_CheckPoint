import { Router } from "express";
import connectionPool from "../utils/db.mjs";

const answersRouter = Router()

//Create Answers//
answersRouter.post("/:id/answers", async (req, res) => {
      const question_id = req.params.id;
      const content= req.body.content;
      const newAnswer = {
      ...req.body,      
      question_id,
      content,
      created_at:new Date(),
      updated_at:new Date(),  
      };

      if (req.body.content.length > 500) {
        return res.status(400).json({
          message: "Content must be less than 500 characters.",
        });
      };   
    try {
      if(!newAnswer.content) {
        return res.status(400).json({ 
          "Bad Request": "Missing or invalid request data"
          })
        };
        
    await connectionPool.query (
      `insert into answers (question_id, content, created_at, updated_at)
      values ($1,$2,$3,$4)`,
      [
        newAnswer.question_id,
        newAnswer.content,
        newAnswer.created_at,
        newAnswer.updated_at
        
      ]
    );
    
    return res.status(201).json({
      Created: " Answer created successfully."
    })
  } catch (error){
    return res.status(500).json({
      message: "Server could not create question because database connection"
    })
  }
  });
 //Get_ID Questions//
 answersRouter.get("/:id/answers",async (req, res)=>{
  const answersIDFormClient = req.params.id;
    let result 
    try {
    result = await connectionPool.query(
      `select * from answers where question_id=$1`,[answersIDFormClient]
    );
    } catch {
      return res.status(500).json({
        message: "Server could not read question because database connection" 
      });
    }
  
    if(!result.rows[0]) {
      return res.status(404).json({
        "Not Found": "Question not found", 
      });
    }
    return res.status(200).json({  
        OK: "Successfully retrieved the question.",
        data: result.rows   
    });
  });
 //Delete Question//
 //Use DELETE with query to delete the question.
 //------------------------//

  export default answersRouter;