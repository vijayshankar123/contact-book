const express = require("express");
const connectDB = require("./config/db")
const path = require("path");



var users = require("./routes/users");
var auth = require("./routes/auth");
var contacts = require("./routes/contacts");

const app=express();
//connect database
connectDB();

//middleware initializing(instead of body parser)
app.use(express.json({extended: false}));






app.use(users);
app.use(auth);
app.use(contacts);

//serve static assets in production
if(process.env.NODE_ENV === "production"){
    //set static folder
    app.use(express.static("client/build"))
app.get("*",(req,res) => res.sendFile(path.resolve(__dirname,"client","build","index.html")));
}


const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log("contactkeeper has started")
})