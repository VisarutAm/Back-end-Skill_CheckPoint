import { Router } from "express";
import connectionPool from "../utils/db.mjs";

const votesRouter = Router()

 //----------Questions Vote-----------//
 
 //Create Questions Up_Vote//
votesRouter.post("/:id/upvote", async (req, res) => {    
    const question_id = req.params.id;
    const newVote = {
        ...req.body,           
        question_id,
        vote: 1,
        created_at: new Date(),
        updated_at: new Date(),  
    };
    
    let question;
    try { 
        question = await connectionPool.query(
            `SELECT * FROM questions WHERE id = $1`,
            [question_id]
        );
        // console.log(question.rows)
        if (question.rows.length === 0) {
            return res.status(404).json({
                "Not Found": "Question not found."
            });
        }

        await connectionPool.query(
            `INSERT INTO question_votes (question_id, vote, created_at, updated_at)
            VALUES ($1, $2, $3, $4)`,
            [
                newVote.question_id,
                newVote.vote,
                newVote.created_at,
                newVote.updated_at      
            ]
        );

        const upvoteCount = await connectionPool.query(
            `SELECT COUNT(*) AS total_upvotes FROM question_votes WHERE question_id = $1 AND vote = 1`,
            [question_id]
        );

        const downvoteCount = await connectionPool.query(
            `SELECT SUM(vote) AS total_downvotes FROM question_votes WHERE question_id = $1 AND vote = -1`,
            [question_id]
        );

        // const total_upvotes = Number(upvoteCount.rows[0].total_upvotes);
        // const total_downvotes = (downvoteCount.rows[0].total_downvotes);

        // console.log(downvoteCount.rows[0])
        return res.status(200).json({  
            message: "Successfully upvoted the question.",
            data: {
                ...question.rows[0],
                id:String(question.rows[0].id),
                total_upvotes:Number(upvoteCount.rows[0].total_upvotes),
                total_downvotes:Number(downvoteCount.rows[0].total_downvotes)
            } 
        }); 
    } catch (error) {
        return res.status(500).json({
            message: "Server could not create the vote due to a database connection error."
        });
    }  
});

 //Create Questions Down_Vote//
 votesRouter.post("/:id/downvote", async (req, res) => {    
    const question_id = req.params.id;
    const newVote = {
        ...req.body,           
        question_id,
        vote: -1,
        created_at: new Date(),
        updated_at: new Date(),  
    };
    
    let question;
    try { 
        question = await connectionPool.query(
            `SELECT * FROM questions WHERE id = $1`,
            [question_id]
        );
        
        if (question.rows.length === 0) {
            return res.status(404).json({
                "Not Found": "Question not found."
            });
        }

        await connectionPool.query(
            `INSERT INTO question_votes (question_id, vote, created_at, updated_at)
            VALUES ($1, $2, $3, $4)`,
            [
                newVote.question_id,
                newVote.vote,
                newVote.created_at,
                newVote.updated_at      
            ]
        );

        const upvoteCount = await connectionPool.query(
            `SELECT COUNT(*) AS total_upvotes FROM question_votes WHERE question_id = $1 AND vote = 1`,
            [question_id]
        );

        const downvoteCount = await connectionPool.query(
            `SELECT SUM(vote) AS total_downvotes FROM question_votes WHERE question_id = $1 AND vote = -1`,
            [question_id]
        );
     
        return res.status(200).json({  
            OK: "Successfully downvoted the question.",
            data: {
                ...question.rows[0],
                id:String(question.rows[0].id),
                total_upvotes:Number(upvoteCount.rows[0].total_upvotes),
                total_downvotes:Number(downvoteCount.rows[0].total_downvotes)
            } 
        }); 
    } catch (error) {
        return res.status(500).json({
            message: "Server could not create the vote due to a database connection error."
        });
    }  
});
//----------Answers Vote-----------//
 //Create Answers Up_Vote//
votesRouter.post("/:id/answers/:answer_id/upvote", async (req, res) => {
    const question_id = req.params.id;
    const answer_id = req.params.answer_id
    const newVote = {
        ...req.body,
        answer_id,
        vote: 1,
        created_at: new Date(),
        updated_at: new Date(),
    };

    let answer;
    try {
           answer = await connectionPool.query(
            `SELECT * FROM answers WHERE id = $1`,
            [answer_id]
        );

        if (answer.rows.length === 0) {
            return res.status(404).json({
                "Not Found": "Answer not found."
            });
        }
           await connectionPool.query(
            `INSERT INTO answer_votes (answer_id, vote, created_at, updated_at)
            VALUES ($1, $2, $3, $4)`,
            [
                newVote.answer_id,
                newVote.vote,
                newVote.created_at,
                newVote.updated_at
            ]
        );

        const upvoteCount = await connectionPool.query(
            `SELECT COUNT(*) AS total_upvotes FROM answer_votes WHERE answer_id = $1 AND vote = 1`,
            [answer_id]
        );

        const downvoteCount = await connectionPool.query(
            `SELECT SUM(vote) AS total_downvotes FROM answer_votes WHERE answer_id = $1 AND vote = -1`,
            [answer_id]
        );

        return res.status(200).json({
            OK: "Successfully up_voted the answer.",
            data: {
                ...answer.rows[0],
                id: String(answer.rows[0].id),
                answer_votes:
                {total_upvotes: Number(upvoteCount.rows[0].total_upvotes),
                total_downvotes: Number(downvoteCount.rows[0].total_downvotes)}
            }
        });
    } catch (error) {
        return res.status(500).json({
            message: "Server could not create the vote due to a database connection error."
        });
    }
});
//Create Answers Down_Vote//
votesRouter.post("/:id/answers/:answer_id/downvote", async (req, res) => {
    const question_id = req.params.id;
    const answer_id = req.params.answer_id
    const newVote = {
        ...req.body,
        answer_id,
        vote: -1,
        created_at: new Date(),
        updated_at: new Date(),
    };

    let answer;
    try {
           answer = await connectionPool.query(
            `SELECT * FROM answers WHERE id = $1`,
            [answer_id]
        );

        if (answer.rows.length === 0) {
            return res.status(404).json({
                "Not Found": "Answer not found."
            });
        }
           await connectionPool.query(
            `INSERT INTO answer_votes (answer_id, vote, created_at, updated_at)
            VALUES ($1, $2, $3, $4)`,
            [
                newVote.answer_id,
                newVote.vote,
                newVote.created_at,
                newVote.updated_at
            ]
        );

        const upvoteCount = await connectionPool.query(
            `SELECT COUNT(*) AS total_upvotes FROM answer_votes WHERE answer_id = $1 AND vote = 1`,
            [answer_id]
        );

        const downvoteCount = await connectionPool.query(
            `SELECT SUM(vote) AS total_downvotes FROM answer_votes WHERE answer_id = $1 AND vote = -1`,
            [answer_id]
        );

        return res.status(200).json({
            OK: "Successfully up_voted the answer.",
            data: {
                ...answer.rows[0],
                id: String(answer.rows[0].id),
                answer_votes:
                {total_upvotes: Number(upvoteCount.rows[0].total_upvotes),
                total_downvotes: Number(downvoteCount.rows[0].total_downvotes)}
            }
        });
    } catch (error) {
        return res.status(500).json({
            message: "Server could not create the vote due to a database connection error."
        });
    }
});


 
    export default votesRouter;
    //Create Questions Down_Vote//
//  votesRouter.post("/:id/downvote", async (req, res) => {    
//     const question_id = req.params.id;
//     const newVote = {
//         ...req.body,           
//         question_id,
//         vote: -1,
//         created_at: new Date(),
//         updated_at: new Date(),  
//     };
    
//     let question;
//     try { 
//         question = await connectionPool.query(
//             `SELECT * FROM questions WHERE id = $1`,
//             [question_id]
//         );
        
//         if (question.rows.length === 0) {
//             return res.status(404).json({
//                 "Not Found": "Question not found."
//             });
//         }

//         await connectionPool.query(
//             `INSERT INTO question_votes (question_id, vote, created_at, updated_at)
//             VALUES ($1, $2, $3, $4)`,
//             [
//                 newVote.question_id,
//                 newVote.vote,
//                 newVote.created_at,
//                 newVote.updated_at      
//             ]
//         );

//         const upvoteCount = await connectionPool.query(
//             `SELECT COUNT(*) AS total_upvotes FROM question_votes WHERE question_id = $1 AND vote = 1`,
//             [question_id]
//         );

//         const downvoteCount = await connectionPool.query(
//             `SELECT SUM(vote) AS total_downvotes FROM question_votes WHERE question_id = $1 AND vote = -1`,
//             [question_id]
//         );
     
//         return res.status(200).json({  
//             OK: "Successfully downvoted the question.",
//             data: {
//                 ...question.rows[0],
//                 id:String(question.rows[0].id),
//                 total_upvotes:Number(upvoteCount.rows[0].total_upvotes),
//                 total_downvotes:Number(downvoteCount.rows[0].total_downvotes)
//             } 
//         }); 
//     } catch (error) {
//         return res.status(500).json({
//             message: "Server could not create the vote due to a database connection error."
//         });
//     }  
// });

     //Get Questions//
    //  votesRouter.get("/:id/vote",async (req, res)=>{  
    //     const question_id = req.params.id;        
    //     let result 
    //     try {
    //     result = await connectionPool.query(
    //       `select * from questions where id=$1`,[question_id]
    //     );
    //     } catch {
    //       return res.status(500).json({
    //         message: "Server could not read question because database connection" 
    //       });
    //     }
      
    //     if(!result.rows[0]) {
    //       return res.status(404).json({
    //         "Not Found": "Question not found", 
    //       });
    //     }
    //     return res.status(200).json({  
    //         OK: "Successfully retrieved the votes for the question.",
    //         data: result.rows[0]    
    //     });
    //   });    

    //      answersRouter.post("/:id/upvote", async (req, res) => {
    //     const question_id = req.params.id;
    //     const vote= req.body.vote;
    //     const newVote = {
    //     ...req.body,      
    //     question_id,
    //     vote:1,
    //     created_at:new Date(),
    //     updated_at:new Date(),  
    //     };
    //      try {
    //     if(!newVote.vote) {
    //       return res.status(400).json({ 
    //         "Bad Request": "Missing or invalid request data"
    //         })
    //       };
          
    //   await connectionPool.query (
    //     `insert into question_votes (question_id, vote, created_at, updated_at)
    //     values ($1,$2,$3,$4)`,
    //     [
    //         newVote.question_id,
    //         newVote.vote,
    //         newVote.created_at,
    //         newVote.updated_at
          
    //     ]
    //   );
      
    //   return res.status(201).json({
    //     Created: " Answer created successfully."
    //   })
    // } catch (error){
    //   return res.status(500).json({
    //     message: "Server could not create question because database connection"
    //   })
    // }
    // });