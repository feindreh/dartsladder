"use client"

import HomeButton from "../elements/home"

import { useState } from "react";

import { hasName } from "../firebase/addData";

export default function Hello(){

    const [player,setPlayer] = useState("Hello")

    const handleChange = (e) => {
        setPlayer(e)
    }

    const displayMessage = () => {
       throw Error("Implement Display")
    }

    const displayMatches = () => {
        throw Error("Implement Matches")
    }

    const handleButton = async (e) => {
        const nameIsRight = await hasName(player)
        if(nameIsRight === false){
            displayMessage(`${player} not in Dataset`)
        }else{
            displayMessage("Name is Okay")
            displayMatches()
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
        </div>  
    )
}