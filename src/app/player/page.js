"use client"

import HomeButton from "../elements/home"
import { useState } from "react"


export default function Hello(){

    const [name,setName] = useState("")
    const [nameError,setNameError] = useState("")

    const handleSubmit = () =>{
        if(nameError !== "Valid Name"){return}
        console.log("Submit",name)
    }

    const handleChange = (e) => {
        setName(e.target.value)
        if(e.target.value === ""){setNameError("Enter Name");return}
        if(e.target.value.length >= 10){setNameError("Name too Long, 10 Characters Max");return}
        setNameError("Valid Name")
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