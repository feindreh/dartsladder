"use client"


import HomeButton from "../elements/home"
import { useState } from "react";

import { hasName,updateElo,updateMMR,getPlayer,addMatch} from "../firebase/addData";
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

        const changes = {} // {name:mmr}
        for(let i = 0;i<playerArray.length;i++){
            changes[playerArray[i].name] = 0
        }
        

        for(let i = 0;i<playerArray.length;i++){

            const p1 = playerArray[index]
            const p2 = playerArray[i]
            const res = calculateChange(p1.mmr,p2.mmr,1)
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

        const makeDataArray = async () => {
            const res = []
            const arr = [...players]
            for(let i = 0;i<arr.length;i++){
                const n = await getPlayer(arr[i])
                res.push(n)
            }
            return res
        }
        const DataArray = await makeDataArray()
        const changes = await handleGame(DataArray,win)
        

        const getResults = () => {
            const res = {}
            for(let i = 0;i<DataArray.length;i++){
                const p = DataArray[i]

                const mmrOld = p.mmr
                const mmrChange = changes[p.name]
                const mmrNew =  p.mmr + mmrChange

                const eloOld = p.elo
                const eloChange = (() => {

                    const difference = mmrNew - p.elo
                    // Math.sqrt(-1) => NaN !!!!!!
                    // difference CAN be negative

                    const changeFromMMR = difference/5
                    if(changes[p.name] >= 0){
                        //dont loose elo when winning
                        return Math.max(changes[p.name] + changeFromMMR,0)
                    }else{
                        //dont win elo when loosing
                        return Math.min(changes[p.name] + changeFromMMR,0)
                    }
                })()
                const eloNew = p.elo+ eloChange

                res[p.name] = {mmrOld,mmrChange,mmrNew,eloOld,eloChange,eloNew}
            }
            return res
        }

        const results = getResults()
        console.log("Results",results)
        

        setPopUpMessage("Updating Results")
        // update changes
        

        for(let key in results){
            await updateElo(key,results[key].eloNew)
            await updateMMR(key,results[key].mmrNew)
        }
        // add match to db

        

        addMatch(results)
        // display changes

        let resultArr = []
        for(let name in results){
            const player = results[name]
            console.log(player)
            let str = name
            if(player.eloChange >= 0){str += " + "}else{str += " - "}
            str += ` ${Math.abs(player.eloChange.toFixed(1))} `
            str += "--->"
            str += ` ${player.eloOld.toFixed(0)} => ${player.eloNew.toFixed(0)} ` 
            console.log(str)
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

            <button className = "MainButton box" style={{"marginBottom":"20px"}} type="button" onClick = {()=>{handleButton()}} >
                Eintragen
            </button> 

            
            
        </div>  
    )
}