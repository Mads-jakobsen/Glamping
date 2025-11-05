 import styles from './Stay.module.css'
 import Gitte from '../../assets/gitte.jpg'
 


 export default function Stay (){
  return(
 
 <div className={styles.stay}>
         <h3>Kom og prøv glamping hos Gitte!</h3>
         <p>Vi er stolte af at byde dig velkommen til Gitte’s Glamping, hvor hjertevarme og omsorg møder naturens skønhed og eventyr. Vores dedikerede team, anført af Gitte selv, er her for at skabe den perfekte ramme om din luksuriøse udendørsoplevelse. Vi stræber efter at skabe minder og fordybelse, uanset om du besøger os som par, familie eller soloeventyrer. Vi tilbyder en bred vifte af aktiviteter og arrangementer, der passer til alle aldre og interesser. Udforsk naturen, slap af ved bålet, del historier med nye venner, eller find indre ro med vores wellnessaktiviteter.</p>

         <img src={Gitte} alt="Gitte" />
        
        
         <div>

         <button className={styles.stays}> Se vores ophold </button></div>


         
         </div>

          
         
        )
         
        }