export default function PopUp(props){

    // take props.message
    
    return (
        <div id="PopUp" style = {{visibility:props.visible?"visible":"hidden"}}>
            <div > 
                <div>{props.message}</div>
                <button type="button" onClick={()=>{props.close()}}>Ok</button>
            </div>
        </div>
    )
}   