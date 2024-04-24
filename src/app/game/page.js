"use client"


import HomeButton from "../elements/home"
import { useState } from "react";

import { hasName,updateElo,getPlayer } from "../firebase/addData";
import calculateChange from "../firebase/elo";

export default function Hello(){
    
    const [player1,setPlayer1] = useState("Flx")
    const [player2,setPlayer2] = useState("Cll")
    const [win,setWin] = useState()
    

    const checkName = async (name1,name2) => {
        if(name1 === name2){console.log("same Name");return false}
        if(await hasName(name1) === false){console.log("Player1 wrong Name");return false}
        if(await hasName(name2) === false){console.log("Player2 wrong Name");return false}
        return true
    }   

    const handleGame = async (p1,p2,win) => {
        
        const res = calculateChange(p1.elo,p2.elo,win)
        await updateElo(p1.name,Number((p1.elo+res[0]).toFixed(2)))
        await updateElo(p2.name,Number((p2.elo+res[1]).toFixed(2)))
        console.log("finished")
    }

    const handleButton = async (e) => {
        e.preventDefault();
        if((await checkName(player1,player2)) === false){return}
        if(win === undefined){console.log("win wrong");return}

        const p1 = await getPlayer(player1)
        const p2 = await getPlayer(player2)
        if(p1 === false || p2 === false){console.log("db problem ?");return}

        handleGame(p1,p2,win)
    }

    return (
        <div>
            <HomeButton/>
            <div>game</div>
            <form onSubmit = {handleButton}>
                <div>
                    <label>Player 1</label>
                    <input type="text" value={player1} onChange = {(e)=>{setPlayer1(e.target.value)}}></input>
                </div>
                <div>
                    <label>Player 2</label>
                    <input type="text" value= {player2} onChange = {(e)=>{setPlayer2(e.target.value)}}></input>
                </div>
                <div>
                    <fieldset style = {{maxWidth:"200px",display:"flex",gap:"5px",justifyContent:"center"}}>
                        <legend>Winner</legend>
                        <label>Player1</label>
                        <input type="radio" name="group1" value={1} onChange = {(e)=>{setWin(e.target.value)}}></input>
                        <label>Player2</label>
                        <input type="radio" name="group1" value={0} onChange = {(e)=>{setWin(e.target.value)}}></input>
                    </fieldset>
                </div>
                <button type="submit">Sumbit</button>
            </form>
            
        </div>  
    )
}