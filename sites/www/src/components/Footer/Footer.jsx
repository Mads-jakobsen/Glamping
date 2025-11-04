import React from "react"
import styles from './Footer.module.css'
import logo from '../../assets/logo.png'



export default function Footer(){
return(
  <div className={styles.Footer}>

<div>

<a href="https://www.facebook.com/"><i class="fa-brands fa-square-facebook"></i></a>
<a href="https://www.instagram.com/"><i class="fa-brands fa-instagram"></i></a></div>



<div className={styles.FooterLogo}>

<img src={logo} alt={logo} />
<p>Gittes Glamping</p>
</div>


  </div>
)


}