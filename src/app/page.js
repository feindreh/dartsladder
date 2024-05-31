"use client"
import Link from "next/link";

export default function Home() {

  return (
    <main className="container">
      <div className ="container2">
        <button className="MainButton">
          <Link href ="/ladder">
              Leiter anschauen
          </Link>
        </button>
        <button className="MainButton">
          <Link  href="/game">
              Spiel eintragen
          </Link>
        </button>
        <button className="MainButton">
          <Link  href="/player">
              Neuer Spieler
          </Link>
        </button >
      </div>
    </main>
  );
}

