import React from "react";
import styles from './Homepage.module.css';
import Header from '../../components/Header/Header'

export default function Homepage() {
  return (
    <div className={styles.background}>
      <Header /> 
      
    </div>
  );
}