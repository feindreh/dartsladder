export default function Winner (props) {

    return (

        <div>
            <label>{props.name}</label>
            <input type="radio" name="group1" value={props.index} onChange = {(e)=>{props.callback(e.target.value)}}></input>
        </div>

    )
}