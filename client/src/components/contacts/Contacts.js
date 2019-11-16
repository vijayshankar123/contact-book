import React,{useContext,useEffect} from "react";
import ContactItem from "./ContactItem";
import {CSSTransition,TransitionGroup} from "react-transition-group";
import ContactContext from "../../context/contact/contactContext";
import Spinner from "../layout/Spinner";
const Contacts =() =>{

   const contactContext =useContext(ContactContext);
   const { contacts,getContacts,loading } = contactContext;

   useEffect (() =>{
       getContacts();
      //eslint-disable-next-line
   },[])

   if(contacts !== null && contacts.length ===0 && !loading){
       return <h4>Please add a contact</h4>
   }
    return (
        <div>
            {contacts !==null && !loading ? 
            ( <TransitionGroup>
            {contacts.map(contact =>(
            <CSSTransition key={contact._id} timeout = {500} classNames="item">    
              <ContactItem  contact={contact}/>
              </CSSTransition>))}
              </TransitionGroup>): <Spinner />}
       
  
        </div>
        

    )
}
export default Contacts;