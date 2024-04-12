"use client"

import { useState } from "react"

import HomeButton from "../elements/home"

import addName from "../firebase/addData"

export default function Hello(){

    const [name,setName] = useState("")
    const [nameError,setNameError] = useState("Enter Name")

    const checkNameError = (string) => {
        if(string === ""){setNameError("Enter Name");return}
        if(string.length >= 10){setNameError("Name too Long, 10 Characters Max");return}
        setNameError("Valid Name")
    }

    


    const handleSubmit = () =>{
        if(nameError !== "Valid Name"){return}
        addName(name)
    }

    const handleChange = (e) => {
        const str = e.target.value
        setName(str)
        checkNameError(str)
    }



    return (
        <div>
            <HomeButton/>
            <div>Player</div>

            <div>
                <div>{nameError}</div>
                <input type="text" onChange = {(e)=>{handleChange(e)}}></input>
                <button type="button" onClick = {()=>{handleSubmit()}}>Submit</button>
            </div>


        </div>  
    )
}