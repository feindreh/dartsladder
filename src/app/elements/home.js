import Link from "next/link"

export default function HomeButton(){
    return (
       
        <Link  href="/">
            <button className="box MainButton" style={{"margin-top":"20px"}}>
                Nach Hause
            </button>
        </Link>

       
    )
}