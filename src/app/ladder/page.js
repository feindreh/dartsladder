"use client"

import HomeButton from "../elements/home"
import { getLadder } from "../firebase/addData"

import { useEffect,useState } from "react"

export default function Hello(){

    const [players,SetPlayers] = useState([])

    const loadData = async() => {
        const data = await getLadder()
        data.sort((a,b) => b.elo - a.elo)
        SetPlayers(data)
    }

    useEffect(()=>{
        loadData()
    },[])


    return (
        <div>
            <HomeButton/>
            <div>Ladder</div>
        </div>  
    )
}