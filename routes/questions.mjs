import { Router } from "express";
import connectionPool from "../utils/db.mjs";

const questionsRouter = Router()

//Create Questions//
questionsRouter.post("/", async (req, res) => {
    const newQuestion = {
      ...req.body,
      created_at:new Date(),
      updated_at:new Date(),  
      };
    
    try {
      if(!newQuestion.title || !newQuestion.description ) {
        return res.status(400).json({ 
          "Bad Request": "Missing or invalid request data"
          })
        };
    await connectionPool.query(
      `insert into questions (title,description,category,created_at,updated_at)
      values ($1,$2,$3,$4,$5)`,
      [
        newQuestion.title,
        newQuestion.description,
        newQuestion.category,      
        newQuestion.created_at,
        newQuestion.updated_at
        
      ]
    );
    
    return res.status(201).json({
      Created: "Question created successfully."
    })
  } catch (error){
    return res.status(500).json({
      message: "Server could not create question because database connection"
    })
  }
  });
  //Get Questions//
  questionsRouter.get("/",async (req, res)=>{
    let result
    try{
     result = await connectionPool.query(`select * from questions`);
    } catch {
      return res.status(500).json({    
        message: "Server could not read questions because database connection" 
  });
    }
    return res.status(200).json({ 
    OK: "Successfully retrieved the list of questions.",        
    data: result.rows,    
  });
  })
  //Get_ID Questions//
  questionsRouter.get("/:id",async (req, res)=>{
  const questionIDFormClient = req.params.id;
    let result 
    try {
    result = await connectionPool.query(
      `select * from questions where id=$1`,[questionIDFormClient]
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
        data: result.rows[0]    
    });
  });
  //Update Question//
  questionsRouter.put("/:id", async (req,res)=>{
    const questionIDFormClient = req.params.id;
    const updatedQuestion = {...req.body, updated_at:new Date()}
  let result
    try{
      if(!updatedQuestion.title || !updatedQuestion.description ) {
        return res.status(400).json({ 
          "Bad Request": "Missing or invalid request data"
          })
        };    
    result = await connectionPool.query(
    `
    update questions
    set title = $2,
        description =$3,
        category =$4,
        updated_at =$5
    where id=$1
    `,
    [
      questionIDFormClient,
      updatedQuestion.title,
      updatedQuestion.description,
      updatedQuestion.category,
      updatedQuestion.updated_at,
    ]
  );
  
  //  console.log(result)
  if(result.rowCount==0) {
    return res.status(404).json({
      "Not Found": "Question not found",
    });
  }
  return res.status(200).json({    
    OK: "Successfully updated the question.", 
  });
  } catch (error) {
      return res.status(500).json({
        message: "Server could not update question because database connection" 
      })
  }
  }) 
  //Delete Question//
  questionsRouter.delete("/:id", async (req,res)=>{
    const questionIDFormClient = req.params.id;
   let result
    try{  
    result = await connectionPool.query(
    `
    delete from questions
      where id=$1
    `,[questionIDFormClient]  
  );
  
  // console.log(result)
  if(result.rowCount==0) {
    return res.status(404).json({
      "Not Found": "Question not found"
   
    });
  }
  return res.status(200).json({    
    OK: "Successfully deleted the question" 
  });
  
  } catch (error) {
      return res.status(500).json({
        message: "Server could not delete question because database connection" 
      })
  }
  });
  //------------------------//

  export default questionsRouter;