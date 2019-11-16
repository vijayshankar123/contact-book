import React,{useReducer} from "react";
import uuid from "uuid";
import axios from "axios";
import ContactContext from "./contactContext";
import contactReducer from "./contactReducer";
import {
    ADD_CONTACT,
    GET_CONTACTS,
    CLEAR_CONTACTS,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER,
    CONTACT_ERROR
} from "../types";

const ContactState =(props) =>{
   const initialState ={
       contacts:null,
       current:null,
       error:null
   };
   const [state,dispatch] = useReducer(contactReducer,initialState)
   //get contacts
   const getContacts = async () =>{

    
    try {
        const res = await axios.get("/api/contacts")
        dispatch({type: GET_CONTACTS,payload: res.data})
     } catch (err) {
        dispatch({type:CONTACT_ERROR,payload:err.response.msg})
    }
  }

   //add contact
     const addContact = async contact =>{
       const config = {
           headers:{
               "Content-Type":"application/json"
           }
       }
       try {
           const res = await axios.post("/api/contacts",contact,config)
           dispatch({type: ADD_CONTACT,payload: res.data})
        } catch (err) {
           dispatch({type:CONTACT_ERROR,payload:err.response.msg})
       }
     }
   //delete contact
     const deleteContact = async id =>{
        try {
          await axios.delete("/api/contacts/"+id)
          dispatch({type: DELETE_CONTACT,payload: id})
         } catch (err) {
            dispatch({type:CONTACT_ERROR,payload:err.response.msg})
        }
           dispatch({type: DELETE_CONTACT,payload: id})
     }
       //update contact
    const updateContact = async contact =>{
        const config = {
            headers:{
                "Content-Type":"application/json"
            }
        }
        try {
            const res = await axios.put("/api/contacts/"+contact._id,contact,config)
            dispatch({type: UPDATE_CONTACT,payload: res.data})
         } catch (err) {
            dispatch({type:CONTACT_ERROR,payload:err.response.msg})
        }
        
       }

     //clear contacts
     const clearContacts = ()=>{
        dispatch({type: CLEAR_CONTACTS})
       }

   //set current contact
   const setCurrent = contact =>{
    
    dispatch({type: SET_CURRENT,payload: contact})
   }
   //clear current contact
   const clearCurrent = ()=>{
    dispatch({type: CLEAR_CURRENT})
   }
  

   //filter contact

   //clear filter

   return(
       <ContactContext.Provider 
       value={{
          contacts: state.contacts,
          error:state.error,
          current:state.current,
          addContact,
          deleteContact,
          setCurrent,
          clearCurrent,
          updateContact,
          getContacts,
          clearContacts
       }}>

         { props.children }
       </ContactContext.Provider>
   
    )
}

export default ContactState;