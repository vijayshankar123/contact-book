const express = require("express");
const router = express.Router();
const {check,validationResult} = require("express-validator");
const auth = require("../middleware/auth");
const User = require("../models/User");
const Contact = require("../models/Contact");

router.get("/api/contacts",auth, async (req,res) =>{
    try {
        const contacts = await Contact.find({user:req.user.id}).sort({date:-1});
       console.log(contacts);
       res.send(contacts)
    } catch (err) {
        res.status(500).send("server error");
    }
})

router.post("/api/contacts",[auth,[
    check("name","Name is required").not().isEmpty()
]], async (req,res) =>{
   const errors = validationResult(req);
   if(!errors.isEmpty()){
       return res.status(400).json({errors:errors.array()})
   }
   const {name,email,phone,type} = req.body;
   try {
       const newContact = new Contact({
           name,
           email,
           phone,
           type,
           user:req.user.id
       })
       const contact = await newContact.save();
       res.json(contact);
   } catch (err) {
       console.error(err.message);
       res.status(400).send("server error");
   }
})

router.put("/api/contacts/:id",auth,async (req,res) =>{
    const {name,email,phone,type} = req.body;
    //build contact object
    const contactFields ={};
    if(name) contactFields.name = name;
    if(email) contactFields.email = email;
    if(phone) contactFields.phone = phone;
    if(type) contactFields.type = type;

    try {
        let contact = await Contact.findById(req.params.id);
        if(!contact) return res.status(404).json({msg:"Contact not found"})
       //make sure user owns contact
         if(contact.user.toString() !==req.user.id){
              return res.status(401).json({msg:"not authorized"})
         }
           contact = await Contact.findByIdAndUpdate(req.params.id,
            {$set:contactFields },
            {new:true});
            res.json(contact);

        } catch (err) {
            console.error(err.message)
            res.status(500).send("server error");   
    }
})

router.delete("/api/contacts/:id",auth,async (req,res) =>{
    try {
        let contact = await Contact.findById(req.params.id);
        if(!contact) return res.status(404).json({msg:"Contact not found"})
      
            //make sure user owns contact
         if(contact.user.toString() !==req.user.id){
              return res.status(401).json({msg:"not authorized"})
         }
           await Contact.findByIdAndRemove(req.params.id);
           res.json({msg:"Contact removed"})

        } catch (err) {
            console.error(err.message)
            res.status(500).send("server error");   
    }
})


module.exports = router;