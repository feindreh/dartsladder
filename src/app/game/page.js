"use client"

import { useState } from "react"

import HomeButton from "../elements/home"
import Player from "./player"

export default function Hello(){


    const [players,setPlayers] = useState([])

    const newPlayer = () => {
        console.log("newPlayer")
    }


    return (
        <div>
            <HomeButton/>
            <div>game</div>
            <div>
                {players.map((a,i) => <  Player key = {i}/>)}
                <button type="button" onClick = {()=>newPlayer()}>New Player</button>
            </div>
            
            
        </div>  
    )
}