export default function Player (props) {

                return (<div>
                    <label>Player {props.index + 1 }</label>
                    <input type="text" value={props.name} onChange = {(e)=>{props.callback(e.target.value,props.index)}}></input>
                    <button type="button" onClick = { () => {props.delete(props.index)}}>Delete</button>
                </div>)
}