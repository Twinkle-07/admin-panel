require("./config/db")
const express = require("express");
const userRoutes = require("./routes/userRouts");
const productRouts = require("./routes/productRout");


// const userRoute = require("./routes/userRouts")
const app = express();
const port = 5000;
app.use(express.json());

app.use(userRoutes,productRouts);



app.listen(port,()=>{
    console.log(`server is connected to ${port}`);
})