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
    const [popUpValue,setPopUpValue] = useState([])
    

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

    const handleGame = async (playerArray,index) => {

        if(playerArray.length < 2){console.log("hmm");return {}}
        if(index >= playerArray.length){console.log("uhmmm");return {}}

        const factor = (playerArray.length * 0.5)/(playerArray.length - 1)
        // balance games with multiple players
        // denominator splits the  numerator("the value of the game") between the player
        // factor should be 1 at arr.length === 2

        setPopUpMessage("calculating ....")

        const changes = {} // {name:elo}
        for(let i = 0;i<playerArray.length;i++){
            changes[playerArray[i].name] = 0
        }
        

        for(let i = 0;i<playerArray.length;i++){

            const p1 = playerArray[index]
            const p2 = playerArray[i]
            const res = calculateChange(p1.elo,p2.elo,1)
            changes[p1.name] += res[0] * factor
            changes[p2.name] += res[1] * factor
            
        }

        setPopUpMessage("calculated !!!")

        return changes

        
    }

    const handleButton = async (e) => {

        setPopUpMessage("hmm .....")
        popit()
        
        if((await checkName()) === false){return}
        if(win === undefined){setPopUpMessage("win wrong");return}

        const DataArray = []
        const arr = [...players]
        for(let i = 0;i<arr.length;i++){
            const n = await getPlayer(arr[i])
            DataArray.push(n)
        }

        const changes = await handleGame(DataArray,win)

        const results = {}

        for(let i = 0;i<DataArray.length;i++){
            const p = DataArray[i]

            const oldElo = p.elo
            const change = changes[p.name]
            const newElo = p.elo+changes[p.name]

            results[p.name] = {"oldElo":oldElo,"change":change,"newElo":newElo}
        }

        setPopUpMessage("Updating Results")
        // update changes
        console.log(results)
        for(let key in results){
            await updateElo(key,results[key].newElo)
        }
        // display changes

        let resultArr = []
        for(let name in results){
            const player = results[name]
            let str = name
            if(player.change >= 0){str += " + "}else{str += " - "}
            str += ` ${Math.abs(player.change.toFixed(1))} `
            str += "--->"
            str += ` ${player.oldElo.toFixed(0)} => ${player.newElo.toFixed(0)} ` 
            resultArr.push(str)
        }
        setPopUpMessage("Results:")
        setPopUpValue(resultArr)
    }

    return (
        <div className = "container2">

            <PopUp message = {popUpMessage} value={popUpValue}/>

            <HomeButton/>

            <div className = "box ladder"  >
                {players.map((name,i) => <Player key={i} name = {name} index = {i} callback = {updatePlayerName} delete = {deletePlayer}/>)}
            </div>

            <button className="MainButton box" type = "button" onClick = {()=>{setPlayers([...players,"NewOne"])}}>
                Mehr Spieler 
            </button>

            <div className = "box ladder">
                <fieldset className = "winners">
                    <legend>Winner</legend>
                    {players.map((name,i) => <Winner key = {i} name = {name} index = {i} callback = {setWin}/>)}
                </fieldset>
            </div>

            <button className = "MainButton box" style={{"margin-bottom":"20px"}} type="button" onClick = {()=>{handleButton()}} >
                Eintragen
            </button> 

            
            
        </div>  
    )
}