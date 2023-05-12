import React, { useContext, useEffect, useState } from 'react';
import styles from "./home.module.css";
import { Link } from "react-router-dom"
import { contactContext } from '../../context/dataContext';

const Home = () => {
    const { contacts, getContacts, deleteContact } = useContext(contactContext);

    useEffect(() => {
        getContacts();
    }, [])

    return (
        <div className={styles.home_main_div}>
            <Link to={"/addcontact"} >
                <button className={styles.home_add_button}><i className="uil uil-plus"></i> Add Contact</button>
            </Link>
            <div className={styles.home_contact_detail_main_div}>
                {contacts.length > 0 && contacts?.map((el, i) => {
                    return (
                        <div key={i} className={styles.home_list_each_item}>
                            <div className={styles.home_contact_detail}>
                                <p>Company Name : {el.companyname}</p>
                                <p>Person Name : {el.personname}</p>
                                <p>Contact Number : {el.contactnumber}</p>
                                <p>Refrence Person : {el.refrenceperson !== null ? `${el.refrenceperson.refrence} : ${el.refrenceperson.mobilenumber}` : "No Refrences"  }</p>
                            </div>
                            <div className={styles.home_button_div}>
                                <Link to={`/edit/${el._id}`}>
                                <button><i className="uil uil-edit"></i></button>
                                </Link>
                                <button onClick={()=>deleteContact(el._id)}><i className="uil uil-trash-alt"></i></button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Home;