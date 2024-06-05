export default function Player (props) {

    return (
    <div className = {"player"}>

        <label>
            Spieler {props.index + 1 }
        </label>

        <input type="text" value={props.name} onChange = {(e)=>{props.callback(e.target.value,props.index)}}>
        </input>

        <button className = {"box"} type="button" onClick = { () => {props.delete(props.index)}}>
            Löschen
        </button>

    </div>)
}