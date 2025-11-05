import React from "react";
import styles from './Homepage.module.css';
import Header from '../../components/Header/Header'
import Logo from '../../assets/logo.png'
import Stay from "../../components/Stay/Stay";
import Review from "../../components/Review/Review";

export default function Homepage() {
  return (


    <div>
      
      <div className={styles.background}>
        <Header /> 

        <div className={styles.imageContainer}>
          <img src={Logo} alt="Logo" />
          <div>
            <h2>Gittes</h2>
            <h1>Glamping</h1>
            <button className={styles.Book}>Book nu</button>
          </div>
        </div>
      </div>

      
      <Stay />
      <Review />
    </div>
  );
}

      
  