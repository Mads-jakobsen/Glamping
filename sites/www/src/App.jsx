import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Footer from "./components/Footer/Footer";
import Styles from './App.module.css'
import Homepage from "./pages/Homepage/Homepage";
import Stays from "./pages/Stays/Stays";
import Activities from "./pages/Activities/Activities";
import Contact from "./pages/Contact/Contact";





export default function App(){
return (
<BrowserRouter>
 
<Routes>


    <Route path="/" element={<Homepage />} />
    <Route path="/Stays" element={<Stays />} />
    <Route path="/Activities" element={<Activities />} />
    <Route path="/Contact" element={<Contact />} />
    


</Routes>

<Footer /> 


</BrowserRouter>

)



}
