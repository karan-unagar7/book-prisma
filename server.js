import express from "express";
import router from "./router/index.js";
import { PORT } from "./config/config.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api/v1' , router);


app.listen(PORT,()=>{
    console.log(`Server Start At ${PORT}`);
});