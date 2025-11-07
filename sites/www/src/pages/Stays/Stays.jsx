import React from "react";
import styles from './Stays.module.css';
import Header from '../../components/Header/Header'
import Logo from '../../assets/logo.png'
import Trip from "../../components/Trip/Trip";

export default function Stays() {
return (
    <div>
     
      <div className={styles.backgroundStays}>
        <div className={styles.headerLogo}>
          <img src={Logo} alt="Logo" className={styles.logo} />
          <Header />
        </div>
        <div className={styles.h1Stays}>
          <h1>Vores ophold</h1>
        </div>
      </div>
      <div className={styles.trip}>
        <h3>Vi har ophold til enhver smag</h3>
        <p>Vores glampingophold er skabt til at tilbyde en kombination af eventyr og afslapning. Det er den ideelle flugt fra byens støj og stress, og det perfekte sted at genoplade batterierne i en naturskøn indstilling.
Book dit ophold i dag og giv dig selv lov til at fordybe dig i naturen og nyde luksus i det fri. Vi ser frem tid at byde dig velkommen til en oplevelse fyldt med komfort, eventyr og skønhed.</p>
      </div>
      <Trip/>

      


     
    
    </div>
  );
}