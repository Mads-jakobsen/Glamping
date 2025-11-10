import React from "react";
import styles from './Activities.module.css';
import Header from '../../components/Header/Header'
import Logo from '../../assets/logo.png'
import ActivitiesAll from "../../components/ActivitiesAll/ActivitiesAll";
import {Link} from 'react-router-dom'


export default function Activities() {
  return (
   

    
        <div>
          
          <div className={styles.background}>
               <div className={styles.headerLogo}>
                    <Link to="/"> <img src={Logo} alt="Logo" className={styles.logo} /></Link>
                      <Header />
                  </div>
    
          
              
             <div className={styles.h1activities}>
                     <h1 className={styles.h1active}>Aktiviteter</h1>
                   </div>
            
          </div>
           <div className={styles.Activities}>
                  <h2>Ingen skal kede sig hos Gitte</h2>
                  <p>Glamping er mere end blot en indkvartering - det er en mulighed for at fordybe dig i naturen og skabe minder, der varer livet ud. Uanset om du foretrækker en eventyrlig kanotur, en oplysende naturvandring, hjertevarm samvær omkring bålet, smagfulde oplevelser som vinsmagning eller morgenyoga, der giver dig indre ro og balance i naturens skød - vil vi hos Gittes Glamping imødekomme dine ønsker.</p>
                  </div>
                

                <ActivitiesAll />


    
          
          
        </div>
  );
}