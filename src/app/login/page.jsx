"use client";
import { useEffect } from "react";
import Link from "next/link";
import "../globals.css";
import Image from "next/image";
import { Audiowide } from 'next/font/google'
import { useState } from "react";


const audiowide = Audiowide({
  subsets: ['latin'],
  weight: '400', // Audiowide only has 400
  display: 'swap',
})

export default function Page() {

  useEffect(() => {
  const name = document.getElementById("user");
  const about = document.getElementById("detail")
  const email = document.getElementById("mail");
  });


    const [name, setname] = useState(""); 
    const [about, setAbout] = useState("");
    const [email, setEmail] = useState("");

    function handleChange(){
      alert(`Username: ${name} \nAbout: ${about} \nEmail: ${email}`)

    }

  return(
    <>
          <br></br>
        <h1 className={audiowide.className} style={{textAlign: "center", fontSize: "38px", fontWeight: "600"}}> LOGIN TO TANGENT.DEV </h1>
          <br /> 
        <form> 
        &nbsp; &nbsp;
          <input onChange={(e) => setname(e.target.value)} id="user" style={{width: "30%", fontWeight: "900"}} type="text" placeholder="Username..." /> <br /> <br />
        &nbsp; &nbsp;
          <input onChange={(e) => setAbout(e.target.value)} id="detail" style={{width: "30%", fontWeight: "900"}} type="text" placeholder="About..." />  <br /> <br />
        &nbsp; &nbsp;
          <input onChange={(e) => setEmail(e.target.value)} id="mail" style={{width: "30%", fontWeight: "900"}} type="email" placeholder="E-Mail Id..." /> <br /> <br />
        &nbsp; &nbsp;
         <Link href="../profile"> <button onClick={handleChange} style={{fontWeight: "900", cursor: "pointer", border: "1px solid #ff8640", backgroundColor: "#ff8640", borderRadius: "5px", padding: "4px"}} type="submit">Login</button> </Link>
       </form>
    </> 
  
)}