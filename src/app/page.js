"use client"
import Link from "next/link";

export default function Home() {

  return (
        <div className = "container2">
          <Link href ="/ladder">
            <button className="MainButton">
              Leiter anschauen
            </button>
          </Link>
          <Link  href="/game">
            <button className="MainButton">
              Spiel eintragen
            </button>
          </Link>
          <Link  href="/player">
            <button className="MainButton">
              Neuer Spieler
            </button >
          </Link>
        </div>
  );
}

