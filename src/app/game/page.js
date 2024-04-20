"use client"

import { useState } from "react"

import HomeButton from "../elements/home"
import Player from "./player"

export default function Hello(){


    const [players,setPlayers] = useState([])

    const newPlayer = () => {
        setPlayers([...players,""])
    }

    const deletePlayer = (index) => {
        setPlayers(players.filter((a,i) => i !== index))
    }


    return (
        <div>
            <HomeButton/>
            <div>game</div>
            <div>
                {players.map((a,i) => <  Player key = {i} delete = {deletePlayer} index = {i}/>)}
                <button type="button" onClick = {()=>newPlayer()}>New Player</button>
            </div>
            
            
        </div>  
    )
}