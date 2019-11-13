const express = require("express");




var users = require("./routes/users");
var auth = require("./routes/auth");
var contacts = require("./routes/contacts");
const app=express();

app.get("/",(req,res) =>{
    res.json({msg:"hello world"});
})


app.use(users);
app.use(auth);
app.use(contacts);


const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log("contactkeeper has started")
})