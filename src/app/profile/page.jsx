"use client";
import { useEffect } from "react";
import Link from "next/link";
import "./styles.css";
import Image from "next/image";
import { Audiowide } from 'next/font/google'
import { useState } from "react";
import ColorPickerAnimato from '../extra components/color-picker-animato.jsx';
import auroraDevilImage from './profile-assets/aurora-devil-bg.960Z.png';


const audiowide = Audiowide({
  subsets: ['latin'],
  weight: '400', // Audiowide only has 400
  display: 'swap',
})

export default function Page() {
  const [bgImage, setBgImage] = useState(auroraDevilImage);
  const [textColor, setTextColor] = useState('#2A7A8C');

    // --- LOCAL STORAGE LOGIC ---

  // HOOK 1: Read from localStorage when the component mounts.
  // This runs only once on the client-side after the initial render.
  useEffect(() => {
    // We check if a color is saved in localStorage
    const savedTextColor = localStorage.getItem('globalTextColor');
    if (savedTextColor) {
      // If a color is found, we update our state to use it
      setTextColor(savedTextColor);
          }
  }, []); // The empty dependency array [] ensures this effect runs only once.

   useEffect(() => {
    // We save the current textColor into localStorage.
    // The key 'globalTextColor' can be any name you choose.
    localStorage.setItem('globalTextColor', textColor);
  }, [textColor]);

  return(
    <>
    <div style={{textAlign: "center", float: "left" }}>
    <Image style={{ marginLeft: "15px", marginTop: "15px", borderRadius: "50%", float: "left", background: "linear-gradient(to top right, #FF0000ff, #ff0AfAff, #0000ffff)", padding: "8px",}} src="/FURY/dagger of deep terror.png" alt="profile image" width={150} height={150} />

    <h1 className={audiowide.className}  style={{textAlign: "center", fontSize: "35px",float: "left", color: textColor}}> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <b> <br /> NAME </b> </h1>

     <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />
     <p> <b> About: Lorem Ipsum </b> </p>

      <br /> <br /> <br />

      <Image src={bgImage} alt="aurora-devil" width={600} height={500} />

    </div>

        <div style={{justifyContent:"center", backgroundColor: "#d9d9d9", width: "fit-content", top: "0", float: "right", padding: "12px" }}>
        <h1 style={{fontSize: "24px", fontWeight: "bold"}}> Personalisation </h1>
            <p> Customise your profile settings and preferences </p>
 <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition">
      <div className="flex flex-col items-center justify-center pt-5 pb-6">
<svg
  xmlns="http://www.w3.org/2000/svg"
  className="w-8 h-8 mb-3 text-gray-400"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
  strokeWidth={2}
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 9l5-5m0 0l5 5m-5-5v12"
  />
</svg>    <p className="mb-2 text-sm text-gray-500">
          <span className="font-semibold">Click to upload</span> or drag and drop
        </p>
        <p className="text-xs text-gray-500">PNG, JPG, WEBP (MAX. 10MB)</p>
      </div>
      <input onChange={(e) => setBgImage(URL.createObjectURL(e.target.files[0]))} type="file" className="hidden" />
    </label>
        <br /> <br />

  <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', width: '100%' }}>
        <h2 style={{ textAlign: 'center' }}>Choose Your Name's Colour</h2>
        <div style={{
          backgroundColor: '#1F2937', 
          padding: '2rem 1rem',
          borderRadius: '1rem',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          {/* 3. WIRING THE COMPONENT: onColorSelect is hooked up to setTextColor */}
          <ColorPickerAnimato onColorSelect={setTextColor} />
        </div>
      </section>
        </div>

        <footer style={{ backgroundColor: "#999999", color: "#000000", padding: "20px", position:"fixed", bottom:"0", width:"100%"}}>
          <nav>
              <button style={{padding: "10px", backgroundColor: "#d9d9d9", width: "120px",}}>
                <Link style={{float: "left"}} href="/"> Home</Link>
              </button>
                &nbsp; &nbsp; &nbsp; &nbsp;
              <button>
                <Link href="/profile">Profile</Link>
              </button>
                &nbsp; &nbsp; &nbsp; &nbsp;
              <button>
                <Link href="/settings">Settings</Link>
              </button>
          </nav>
        </footer>
    </> 

)}