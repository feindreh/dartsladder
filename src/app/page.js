"use client"
import Link from "next/link";

export default function Home() {

  return (
    <main>
      <div>{hello}</div>
      <button>
        <Link href ="/ladder">
            Leiter
        </Link>
      </button>
      <button >
        <Link  href="/game">
            Game
        </Link>
      </button>
    </main>
  );
}

