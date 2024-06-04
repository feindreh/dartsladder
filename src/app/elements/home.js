import Link from "next/link"

export default function HomeButton(){
    return (
       
        <Link  href="/">
            <button className="box MainButton">
                Nach Hause
            </button>
        </Link>

       
    )
}