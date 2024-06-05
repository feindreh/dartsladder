

export default function PopUp(props){



    const closePopUp = () => {
        const PopUp = document.getElementById('PopUp');
        PopUp.style.visibility = "hidden"
    }

    return (
        <div id="PopUp"  style = {{visibility:"hidden"}}>
            <div className = "ladder"> 
                <div>{props.message?props.message:"Hi"}</div>

                {props.value.map((a,i) => (<div key={i}>{a}</div>))}

                <button type="button" onClick={()=>{closePopUp()}}>Ok</button>
            </div>
        </div>
    )
}   