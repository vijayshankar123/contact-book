const express = require("express");
const router = express.Router();


router.get("/api/auth",(req,res) =>{
    res.send(" get loggin user")
})

router.post("/api/auth",(req,res) =>{
    res.send("log in user")
})


module.exports = router;