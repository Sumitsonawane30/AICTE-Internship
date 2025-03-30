import express from "express";
import mongoose from "mongoose";
import bodyParser from 'express'
import userRouter from './routes/user.js'
import recipeRouter from './routes/recipe.js'
import cors from 'cors'
const app = express(); 


app.use(bodyParser.json())
app.use(cors({
  origin:"https://live-project-3qzc.onrender.com",
  methods:["GET","POST","PUT","DELETE"],
  credentials:true
 
}))

// // userRouter
app.use('/api',userRouter)

// recipeRouter
app.use('/api',recipeRouter)

mongoose
  .connect(
    "mongodb+srv://sumitsonawane:Sumit%40123@cluster0.1wjza.mongodb.net/",
    {
      dbName: "Recipe_Web",
    }
  )
  .then(() => console.log("MongoDB is Connected..!"))
  .catch((err) => console.log(err.message));

const port = 3000;
app.listen(port, () => console.log(`server is running on port ${port}`));


console.log("Server is working!!!")

