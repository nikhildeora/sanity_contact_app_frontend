import React, { useContext, useEffect, useRef } from 'react'
import styles from "./editcontact.module.css";
import { client } from '../../client';
import {useNavigate, useParams} from "react-router-dom";
import { contactContext } from '../../context/dataContext';

const EditContact = () => {
   const comRef = useRef(null);
   const perRef = useRef(null);
   const numRef = useRef(null);
   const refRef = useRef(null);
   const navigate = useNavigate();
   const {id} = useParams();
   const { getContacts,allReferences,getAllRefrences } = useContext(contactContext);
   

   useEffect(()=>{
    getAllRefrences();

    client.getDocument(id)
    .then((res)=>{
      if(res.refrenceperson){
         client.getDocument(res.refrenceperson._ref)
         .then((perres)=>{
           refRef.current.value = perres._id;
          })      
        }
        comRef.current.value = res.companyname;
        perRef.current.value = res.personname;
        numRef.current.value = res.contactnumber
    })
    .catch((err)=>console.log(err))

    return () => {
      refRef.current = "";
    }
     
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

      client.patch(id)
      .set(obj)
      .commit()
      .then((res)=>{
        alert("contact updated");
        setTimeout(()=>{
            getContacts();
        },8000)
        navigate("/");
    })
      .catch((err)=>console.log(err))
    }

  return (
    <div>
        <h1>Edit Contact</h1>
        <form className={styles.add_contact_form} onSubmit={(e)=>getData(e)}>
            <input ref={comRef} type="text" placeholder='Enter company name' />
            <input ref={perRef} type="text" placeholder='Enter person name' />
            <input ref={numRef} type="number" placeholder='Enter contact number' />
            <select ref={refRef} >
               <option value={""}>Select any one</option>
              {allReferences.length>0 && allReferences.map((el,i)=>{
                return (
                  <option key={i} value={el._id}>
                     {el.refrence}
                  </option>
                )
              })}
            </select>
            <input type="submit" value={"Save"} />
        </form>
    </div>
  )
}

export default EditContact;