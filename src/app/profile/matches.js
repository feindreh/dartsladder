







const makeString = (name,nElo,change,oElo) => {
    let str = String(change)
    if(change > 0){str = "+" + str}
    return `${name} : ${oElo} ${str} = ${nElo}`
}


const SingleMatch = (props) => {
    
    const {time,game} = props
    const arr = []
    for(let name in game){
        arr.push(makeString(name,game[name].newElo.toFixed(0),game[name].change.toFixed(0),game[name].oldElo.toFixed(0)))
    }
    return(
        <div >
            {"<>"}
            {arr.map((a,i) => {return (<div key = {i}>{a}</div>)})}
        </div>
    )
}


export default function Matches(props){

    const {rightName,history} = props

    const legit = (rightName) && (history.length!==0)

    if(legit){
        return(
            <div className = "box ladder" >
                {history.map((a,i) => <SingleMatch key = {i}  game={a.game} const time={a.time} />)}
            </div>
        )
    }else{
        return(
            <div className = "box ladder" >
                {(rightName === true)?"No Games Found":"Wrong Name"}
            </div>    
        )
    }
}