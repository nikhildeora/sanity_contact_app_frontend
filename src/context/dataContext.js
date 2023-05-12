import { createContext, useState } from "react";
import { client } from "../client";

export const contactContext = createContext();

export default function ContactContextProvider({children}){
    const [contacts,setContact] = useState([]);
    const [allReferences , setAllRefrences] = useState([]);
    

    const getContacts = async () => {
        try {
            let response = await client.fetch(`*[_type == "contactDetail"]{
                ... ,
              refrenceperson->
            }`);
            setContact(response);    
        } catch (error) {
            console.log(error);
        }
     }
   
     const deleteContact = async (id) => {
        client.delete(id)
        .then(()=>{
            alert("item deleted")
            setTimeout(()=>{
                getContacts()
            },8000)
            })
        .catch((err)=>console.log(err))
     }
    
     const getAllRefrences = async () => {
        try {
            let response = await client.fetch(`*[_type == "contactrefrence"]`);
            setAllRefrences(response);    
        } catch (error) {
            console.log(error);
        }
     }

    return(
    <contactContext.Provider value={{contacts,setContact,getContacts,deleteContact,allReferences,getAllRefrences}}>
        {children}
    </contactContext.Provider>
    )
}