 import styles from './Header.module.css';
 import { NavLink } from 'react-router-dom';
 import { useState } from "react";
 import { RxHamburgerMenu } from 'react-icons/rx';
 import { IoClose } from 'react-icons/io5';

 export default function Header() {

   const [menuOpen, setMenuOpen] = useState(false);
   const handleLinkClick = () => setMenuOpen(false);

   return (
     <header className={styles.header}>
      

       <nav className={styles.desktopNav}>
         <NavLink to="/" className={styles.link}>Forside</NavLink>
         <NavLink to="/Stays" className={styles.link}>Ophold</NavLink>
         <NavLink to="/Contact" className={styles.link}>Kontakt</NavLink>
         <NavLink to="/Activities" className={styles.link}>Aktiviter</NavLink>
        
        
       </nav>

       <div className={styles.burgerIcon} onClick={() => setMenuOpen(true)}>
         <RxHamburgerMenu size={28} />
       </div>

       <div className={`${styles.overlay} ${menuOpen ? styles.show : ''}`}>
        <div className={styles.closeIcon} onClick={() => setMenuOpen(false)}>
           <IoClose size={28} />
         </div>


         <nav className={styles.mobileNav}>
         <NavLink to="/" className={styles.link}>Forside</NavLink>
         <NavLink to="/Stays" className={styles.link}>Ophold</NavLink>
         <NavLink to="/Contact" className={styles.link}>Kontakt</NavLink>
         <NavLink to="/Activities" className={styles.link}>Aktiviter</NavLink>
        
         </nav>
       </div>
     </header>
   );
 }

