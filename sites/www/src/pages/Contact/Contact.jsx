import React from "react";
import styles from './Contact.module.css';
import Header from '../../components/Header/Header'
import ContactForm from "../../components/ContactForm/ContactForm";
import Logo from '../../assets/logo.png';

export default function Contact() {
  return (
    <div>
      <div>
      <div className={styles.backgroundContact}>
        
        <div className={styles.headerLogo}>
          
          <img src={Logo} alt="Logo" className={styles.logo} />

          
          <Header />
        </div>

        <h1 className={styles.h1Contact}>kontakt gitte</h1>
      </div>

      <ContactForm/>
    </div>
    
    </div>
  );
}