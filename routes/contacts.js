const express = require("express");
const router = express.Router();


router.get("/api/contacts",(req,res) =>{
    res.send("get all contacts")
})

router.post("/api/contacts",(req,res) =>{
    res.send("add contact")
})

router.put("/api/contacts/:id",(req,res) =>{
    res.send("update contacts")
})

router.delete("/api/contacts/:id",(req,res) =>{
    res.send("delete contacts")
})


module.exports = router;