

const SingleEntry = (props) => {

    const elo = (props.player.elo).toFixed(0)
    const name = props.player.name
    const place = props.place
    
    return(
        <div style={{display:"flex",gap:"10px"}}>
            <div>{place}.</div>
            <div>{name}</div>
            <div>{elo}</div>
        </div>
        )

}


export default function Ladder(props){
    return (
        <>
            <div>Ich bin Die Ladder</div>
            <div>
                {props.players.map((player,i) => <SingleEntry key={player.name} player = {player} place = {i+1}/>)}
            </div>
        </>
    )
}