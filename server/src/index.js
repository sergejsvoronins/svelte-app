import express from "express";
import {todoRouter} from "../src/routes/todoRouter.js";
import bodyParser from "body-parser";
import cors from "cors";


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded());
app.use("/todos", todoRouter);
app.listen(8001, ()=> {
    console.log("Listening on localhost, port: 8001");
})