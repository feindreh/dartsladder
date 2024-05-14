"use client"


import HomeButton from "../elements/home"
import { useState } from "react";

import { hasName,updateElo,getPlayer } from "../firebase/addData";
import calculateChange from "../firebase/elo";
import PopUp from "../elements/popup";
import Player from "./player";
import Winner from "./winner";

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

    const deletePlayer = (index) => {
        const newArray = players.filter((a,i) => i !== index)
        setPlayers(newArray)
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
        console.log("Handle Game")
        // ToDo
        // const res = calculateChange(p1.elo,p2.elo,win)
        // await updateElo(p1.name,Number((p1.elo+res[0]).toFixed(2)))
        // await updateElo(p2.name,Number((p2.elo+res[1]).toFixed(2)))
        // setPopUpMessage("finished")
    }

    const handleButton = async (e) => {

        e.preventDefault()

        setPopUpMessage("hmm .....")
        popit()
        
        if((await checkName()) === false){return}
        if(win === undefined){setPopUpMessage("win wrong");return}

        console.log(players)
        console.log(win)
        console.log("handle Button")
        // ToDo
        // const p1 = await getPlayer(players[0])
        // const p2 = await getPlayer(players[1])
        // if(p1 === false || p2 === false){setPopUpMessage("db problem ?");return}

        // handleGame(p1,p2,win)
    }

    return (
        <div>
            <PopUp message = {popUpMessage}/>
            <HomeButton/>
            <div>game</div>
            <form onSubmit = {handleButton}>
                {players.map((name,i) => <Player key={i} name = {name} index = {i} callback = {updatePlayerName} delete = {deletePlayer}/>)}
                <div>
                    <fieldset style = {{maxWidth:"200px",display:"flex",gap:"5px",justifyContent:"center"}}>
                        <legend>Winner</legend>
                        {players.map((name,i) => <Winner key = {i} name = {name} index = {i} callback = {setWin}/>)}
                    </fieldset>
                </div>
                <button type="submit">Sumbit</button>
            </form>

            <button type = "button" onClick = {()=>{setPlayers([...players,"NewOne"])}}> New Player </button>
            
        </div>  
    )
}