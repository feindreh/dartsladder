"use client"
import { useState } from "react";

export default function Home() {
  
  const [hello,setHello] = useState("Bye")
  
  const handler = (str) => {
    setHello(str)
  }

  return (
    <main>
      <div>{hello}</div>
      <button onClick = {()=>{handler("Bye")}}>
        Leiter Anschauen
      </button>
      <button onClick = {()=>{handler("Hello")}}>
        Spiel Eintragen
      </button>
    </main>
  );
}
