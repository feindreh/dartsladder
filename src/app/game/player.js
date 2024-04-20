export default function Player(props){
    
    return(
        <div>
            <div>Player</div>
            <button type="button" onClick = {()=>{props.delete(props.index)}}>Delete</button>
        </div>
    )


}