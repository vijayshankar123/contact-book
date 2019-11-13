const express = require("express");
const router = express.Router();


router.post("/api/users",(req,res) =>{
    res.send("register")
})

module.exports = router;