"use client"


import HomeButton from "../elements/home"

export default function Hello(){


    
    const handleButton = () => {
        console.log("hi")
    }

    return (
        <div>
            <HomeButton/>
            <div>game</div>
            <div>
                <div>Player 1</div>
                <input type="text"></input>
            </div>
            <div>
                <div>Player 2</div>
                <input type="text"></input>
            </div>
            <div>
                <div>Winner {"(check = Player 1 else Player 2)"}</div>
                <input type="checkbox"></input>
            </div>
            <div>
                <button type="button" onClick = {()=>{handleButton()}}>Sumbit</button>
            </div>
        </div>  
    )
}