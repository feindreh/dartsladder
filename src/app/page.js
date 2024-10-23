"use client"
import Link from "next/link";

export default function Home() {

  return (
        <div className = "container2">
          <Link href ="/ladder">
            <button className="MainButton box">
              Leiter anschauen
            </button>
          </Link>
          <Link  href="/game">
            <button className="MainButton box">
              Spiel eintragen
            </button>
          </Link>
          <Link  href="/player">
            <button className="MainButton box">
              Neuer Spieler
            </button >
          </Link>
          <Link  href="/profile">
            <button className="MainButton box">
              Profile
            </button >
          </Link>
        </div>
  );
}

