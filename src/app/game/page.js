"use client"


import HomeButton from "../elements/home"
import { useState } from "react";

import { hasName,updateElo,getPlayer } from "../firebase/addData";
import calculateChange from "../firebase/elo";
import PopUp from "../elements/popup";

export default function Hello(){
    
    const [players,setPlayers] = useState(["Hello","World"])
    const [win,setWin] = useState()

    const [popUpMessage,setPopUpMessage] = useState("Hello")
    

    const updatePlayerName = (newName,index) => {
        const newArr = players.map((oldName,i) => {
            if(i === index){return newName}else{return oldName}
        })
        setPlayers(newArr)
    }


    const popit = () => {
        const p = document.getElementById("PopUp")
        p.style.visibility = "visible"
    }

    const checkName = async () => {
        const count = {}
        for(let i = 0; i< players.length;i++){
            if(await hasName(players[i]) === false){
                // check if name is spelled right
                setPopUpMessage(`Player ${i+1} wrong Name`)
                return false
            }
            if(count[players[i]] === undefined){
                // check if name is already in use
                count[players[i]] = 1
            }else{
                setPopUpMessage("Same Name")
                return false
            }
        }
        return true
    }   

    const handleGame = async (p1,p2,win) => {
        
        const res = calculateChange(p1.elo,p2.elo,win)
        await updateElo(p1.name,Number((p1.elo+res[0]).toFixed(2)))
        await updateElo(p2.name,Number((p2.elo+res[1]).toFixed(2)))
        setPopUpMessage("finished")
    }

    const handleButton = async (e) => {
        e.preventDefault();
        setPopUpMessage("hmm .....")
        popit()
        if((await checkName(players[0],players[1])) === false){return}
        if(win === undefined){setPopUpMessage("win wrong");return}

        const p1 = await getPlayer(players[0])
        const p2 = await getPlayer(players[1])
        if(p1 === false || p2 === false){setPopUpMessage("db problem ?");return}

        handleGame(p1,p2,win)
    }

    return (
        <div>
            <PopUp message = {popUpMessage}/>
            <HomeButton/>
            <div>game</div>
            <form onSubmit = {handleButton}>
                <div>
                    <label>Player 1</label>
                    <input type="text" value={players[0]} onChange = {(e)=>{updatePlayerName(e.target.value,0)}}></input>
                </div>
                <div>
                    <label>Player 2</label>
                    <input type="text" value= {players[1]} onChange = {(e)=>{updatePlayerName(e.target.value,1)}}></input>
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