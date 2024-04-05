"use client"
import Link from "next/link";

export default function Home() {

  return (
    <main>
      <button>
        <Link href ="/ladder">
            Leiter anschauen
        </Link>
      </button>
      <button >
        <Link  href="/game">
            Spiel eintragen
        </Link>
      </button>
      <button >
        <Link  href="/player">
            Neuer Spieler
        </Link>
      </button>
    </main>
  );
}

