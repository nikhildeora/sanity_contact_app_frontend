import React, { useContext, useRef } from 'react'
import styles from "./addcontact.module.css";
import { client } from '../../client';
import {useNavigate} from "react-router-dom";
import { contactContext } from '../../context/dataContext';
import { useEffect } from 'react';
import { useState } from 'react';

const AddContact = () => {
   const comRef = useRef(null);
   const perRef = useRef(null);
   const numRef = useRef(null);
   const refRef = useRef(null);
   const refNameRef = useRef(null);
   const refNumRef = useRef(null);
   const navigate = useNavigate();
   const [refrenceForm, setrefrenceForm] = useState(false);
   const { getContacts,allReferences,getAllRefrences } = useContext(contactContext);

   useEffect(()=>{
    getAllRefrences();
   },[])

    const getData = (e) => {
      e.preventDefault();
      if(comRef.current.value=="" || perRef.current.value=="" || numRef.current.value==""){
           alert("All fields mandatory");
           return;
      }

      const obj = {
        _type : "contactDetail",
        companyname : comRef.current.value,
        personname : perRef.current.value,
        contactnumber : +numRef.current.value,
        refrenceperson : {_ref:refRef.current.value, _type: "reference"} 
      }

      client.create(obj)
      .then((res)=>{
        alert("new contact added");
        setTimeout(()=>{
            getContacts();
        },8000)
        navigate("/");
    })
      .catch((err)=>console.log(err))
    }

    const getRefrenceContactDetail = (e) => {
         e.preventDefault();
         if(refNameRef.current.value=="" || refNumRef.current.value==""){
          alert("all fields mandatory");
          return;
         }

         let refObj = {
          _type : "contactrefrence",
          refrence : refNameRef.current.value,
          mobilenumber : refNumRef.current.value
         }

         client.create(refObj)
         .then(()=>{
          alert("new refrence added");
          setTimeout(()=>{
            getAllRefrences()
          },8000);
          refNameRef.current.value = null;
          refNumRef.current.value = null;
          setrefrenceForm(!refrenceForm);
         })
         .catch((err)=>console.log(err))
    }

  return (
    <div>
        <h1>Add New Contact</h1>
       
         <button onClick={()=>setrefrenceForm(!refrenceForm)} className={styles.add_contact_addrefrence_button}><i className="uil uil-plus"></i> Create New Refrence</button>        
         {refrenceForm && 
         <form className={styles.add_contact_form} style={{marginBottom:"30px"}} onSubmit={(e)=>getRefrenceContactDetail(e)}>
          <input ref={refNameRef} type='text' placeholder='Contact Refrence Name' />
          <input ref={refNumRef} type='number' placeholder='Contact Refrence Number' />
          <input type='submit' value={"Add"} />
          </form>}

        <form className={styles.add_contact_form} onSubmit={(e)=>getData(e)}>
            <input ref={comRef} type="text" placeholder='Enter company name' />
            <input ref={perRef} type="text" placeholder='Enter person name' />
            <input ref={numRef} type="number" placeholder='Enter contact number' />
            <select ref={refRef} >
               <option value={null}>Select any one</option>
              {allReferences.length>0 && allReferences.map((el,i)=>{
                return (
                  <option key={i} value={el._id}>
                     {el.refrence}
                  </option>
                )
              })}
            </select>
            <input type="submit" value={"Add"} />
        </form>
    </div>
  )
}

export default AddContact;