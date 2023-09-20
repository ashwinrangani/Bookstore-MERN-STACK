import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import BooksRoute from './routes/BooksRoute.js'
import cors from 'cors'

const app = express();


//Middlewares

app.use(express.json());
app.get('/', (request, response) => {
    return response.status(234).send('Welcome to MERN STACK')
});

app.use(cors());

app.use('/books', BooksRoute);


mongoose.connect(mongoDBURL)
        .then(()=>{
            console.log("App connected to DB")
            app.listen(PORT, ()=> {
                console.log(`App is listening to port: ${PORT}`)
            })
        })
        .catch((error)=>{
            console.log(error)
            
        })
