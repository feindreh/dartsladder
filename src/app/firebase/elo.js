
const calculateChange = (e1,e2,result) => {
    //return [Change for 1,Change for 2]
    // result = [1,0.5,0] => [win,draw,loose]
    // result is from e1 perspective
    const winRate = (n1,n2) => {
        //return winRate for n1
        return (1/(1+10**((n2-n1)/400)))
    }
    const eloChange = (k,wR,WDL) => {
        // WDL = [1,0.5,0] => [win,draw,loose]
        return (k * (WDL - wR))
    }

    const winRatePlayer1 = winRate(e1,e2)
    const winRatePlayer2 = winRate(e2,e1)

    const changePlayer1 = Number(eloChange(20,winRatePlayer1,result).toFixed(2))
    const changePlayer2 = Number(eloChange(20,winRatePlayer2,1-result).toFixed(2))
    return [changePlayer1,changePlayer2]
}

export default calculateChange
