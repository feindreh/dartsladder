"use client"

import HomeButton from "../elements/home"

export default function Hello(){

    const handleClick = () => {
        console.log("HI")
    }


    return (
        <div>
            <HomeButton/>
            <div>game</div>
            <div style={{display:"flex",flexDirection:"column",gap:"10px",alignItems:"center"}}>
                <div>Player1</div>
                <input type="text" />
                <div>Player2</div>
                <input type="text" />
                <div>Result</div>
                <input type="text" />
                <button type="button" onClick = {()=>{handleClick()}}>Submit</button>
            </div>
        </div>  
    )
}