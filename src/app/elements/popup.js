export default function PopUp(props){



    const closePopUp = () => {
        
        const PopUp = document.getElementById('PopUp');
        PopUp.style.visibility = "hidden"


    }

    return (
        <div id="PopUp" style = {{visibility:"hidden"}}>
            <div > 
                <div>{props.message?props.message:"Hi"}</div>
                <button type="button" onClick={()=>{closePopUp()}}>Ok</button>
            </div>
        </div>
    )
}   