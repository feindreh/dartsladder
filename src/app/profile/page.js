"use client"

import HomeButton from "../elements/home"
import Matches from "./matches";


import { useState } from "react";

import { getMatches, hasName } from "../firebase/addData";

export default function Hello(){

    const [player,setPlayer] = useState("Hello")
    const [rightName,setRightName] = useState(false)
    const [history,setHistory] = useState([])

    const handleChange = (e) => {
        setPlayer(e)
    }

    const handleButton = async (e) => {
        const nameIsRight = await hasName(player)
        if(nameIsRight === false){
            setRightName(false)
        }else{
            setRightName(true)
            const arr = await getMatches()
            setHistory(arr.filter((a) => a.game[player] !== undefined).sort((a,b) => b.time-a.time))
        }
    }



    return (
        <div className = "container2">
            <HomeButton/>
            <div className = "box ladder" >
                <div>Profile</div>
            </div>
           <div className = "box ladder">
                <input type="text" value = {player} onChange = {(e)=>{handleChange(e.target.value)}}>
                </input>
           </div>
            <button className= "box MainButton" style={{"margin-top":"20px"}} onClick = {()=>{handleButton()}} >
                looki looki
            </button> 
            <Matches rightName = {rightName} history = {history}/>
        </div>  
    )
}