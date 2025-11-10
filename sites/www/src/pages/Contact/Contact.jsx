import React from "react";
import styles from './Contact.module.css';
import Header from '../../components/Header/Header'
import ContactForm from "../../components/ContactForm/ContactForm";
import Logo from '../../assets/logo.png';
import {Link} from 'react-router-dom'

export default function Contact() {
  return (
    <div>
      <div>
      <div className={styles.backgroundContact}>
        
        <div className={styles.headerLogo}>
          
          <Link to="/"> <img src={Logo} alt="Logo" className={styles.logo} /></Link>

          
          <Header />
        </div>

        <h1 className={styles.h1Contact}>kontakt gitte</h1>
      </div>

      <ContactForm/>
    </div>
    
    </div>
  );
}