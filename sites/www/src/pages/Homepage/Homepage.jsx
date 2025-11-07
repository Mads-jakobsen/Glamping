import React from "react";
import styles from './Homepage.module.css';
import Header from '../../components/Header/Header'
import Logo from '../../assets/logo.png'
import Stay from "../../components/Stay/Stay";
import Review from "../../components/Review/Review";
import{ Link } from 'react-router-dom'

export default function Homepage() {
  return (


    <div>
      
      <div className={styles.background}>
        <Header /> 

        <div className={styles.imageContainer}>
          <img src={Logo} alt="Logo" />
          <div>
            <h2 className={styles.h2Home}>Gittes</h2>
            <h1 className={styles.h1Home}>Glamping</h1>
            
              <Link to="/Contact" className={styles.Book}>
              Book nu
            </Link>
          </div>
        </div>
      </div>

      
      <Stay />
      <Review />
    </div>
  );
}

      
  