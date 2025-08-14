"use client";
import "./globals.css";
import Link from "next/link";
import { useEffect } from "react";
import Image from "next/image";
import { Audiowide } from 'next/font/google'

const audiowide = Audiowide({
  fontFamily: 'Audiowide',
  preload: false,
  weight: '400', // Audiowide only has 400
  display: 'swap',
})

export default function Page() {

  const box = {
    width: 200,
    height: 150,
    backgroundColor: "#000000",
    borderRadius: 5,
    cursor: "pointer",
    willChange: "box-shadow",
}

  return(
    <>
    <br></br>
    <h1 className={audiowide.className} style={{textAlign: "center", fontSize: "35px" }}> <b> WELCOME TO TANGENT.DEV </b> </h1>
 <center>
    <Image style={{left: "50%", transform:"translateX(8%)",}} src="/favicon.ico" alt="logo" width={170} height={170} />
          <br /> <br /> &nbsp; &nbsp; &nbsp;
      <Link href="/login"> <button className="loginBtn" style={{backgroundColor:"#ff8640", padding: "8px", borderRadius: "12px", cursor:"pointer", transition: "all 1s", border: "1px solid #ff8640", fontWeight: "700",}}> <b> Move To Login </b></button> </Link>
      <br></br> <br></br>
    <h1 className={audiowide.className} style={{textAlign: "center", fontSize: "35px" }}> <b> EXPLORE THE WONDERS <br /> OF TANGENT.DEV </b> </h1>
    <br /> <br />
 <h3 style={{textDecoration:"underline", fontSize:"25px", paddingLeft:"15px"}}> Posts </h3>
  <div className="posts">
        <br />
      <div className="post">
        <Image className="postimg" src="/Extra Assets/canvas_spill.png" alt="post1img" width={260} height={260} />
        <h2> <br /> <b> Post Title </b> </h2>
        <p> Some Text... Some Text... <br /> Some Text... Some Text... <br /> Some Text... Some Text... <br /> Some Text... Some Text... </p>
      </div>
        &nbsp; &nbsp;
      <div className="post">
        <Image className="postimg" src="/Extra Assets/celestial knight3.png" alt="post1img" width={260} height={260} />  
        <h2> <br /> &nbsp; <b> Post Title </b> </h2>
        <p> Some Text... Some Text... <br /> Some Text... Some Text... <br /> Some Text... Some Text... <br /> Some Text... Some Text... </p>
      </div>
        <br /> <br />
      <div className="post">
        <Image className="postimg" src="/Extra Assets/blossoming girl.png" alt="post1img" width={260} height={260} />  
        <h2> <br /> &nbsp; <b> Post Title </b> </h2>
        <p> Some Text... Some Text... <br /> Some Text... Some Text... <br /> Some Text... Some Text... <br /> Some Text... Some Text... </p>
      </div>
  </div>
    <br /> <br /> <br />
  <h3 style={{textDecoration:"underline", fontSize:"25px", paddingLeft:"15px"}}> Chat Worlds </h3>
      <br />
  <div className="chatworlds">

        <h3> Hello Everyone, I am a human ! </h3>
  </div>
    <br /> <br />
 </center>
  </> 
  
)}