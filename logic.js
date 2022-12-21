let currentTurn=document.getElementById('currentTurn');
const cells = Array.from(document.getElementsByClassName("cell"))
let restartButton=document.getElementById('restartButton');
let winningMessageText=document.getElementById('winningMessageText');
let winningCombColor=getComputedStyle(document.body).getPropertyValue('--winningComb')


const PLAYER_O_TEXT="O";//possible values for players
const PLAYER_X_TEXT="X";
let currPlayer=PLAYER_X_TEXT;//x starts
let occupany= Array(9).fill(null)//show us which values got inside the game
console.log(occupany)

const winningCombo = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]  
]

const startGame = () =>{
    console.log('startGame')
    cells.forEach(cell => cell.addEventListener('click',cellClicked));

}

restartButton.addEventListener('click',restartClicked)

function restartClicked(e){
    document.body.innerHTML = '';
    location.reload();
    occupany.fill(null);

}

function cellClicked(e){
    const id= e.target.id;
    validationMessageText.innerHTML = ""

    if(!occupany[id]){//if occupany arr in empty in this place

        console.log(occupany)
        occupany[id]=currPlayer;//put the value of the current player
        e.target.innerHTML=currPlayer;

        if(ifHasWon()){
            winningMessageText.innerHTML = currPlayer + " Has Won!"
            currentTurn.innerHTML= ""
            cells.forEach(cell => cell.removeEventListener('click',cellClicked))
            let winningCombo = ifHasWon();
            winningCombo.map(cell = cells[cell].styleColor=winningCombColor)
         }
         currPlayer=currPlayer==PLAYER_X_TEXT ? PLAYER_O_TEXT : PLAYER_X_TEXT
         currentTurn.innerHTML= "It's " + currPlayer+"  Turn" 
     
    }
    else{
        cells.forEach(cell => cell.removeEventListener('click',cellClicked))
        validationMessageText.innerHTML = "This cell already has a value :)"
        cells.forEach(cell => cell.addEventListener('click',cellClicked))
    } 
}

function ifHasWon(){
    for(const comb of winningCombo){
        let [a, b, c] = comb
        
        if(occupany[a]==currPlayer && occupany[b]==currPlayer && occupany[c]==currPlayer){
            return [a, b, c] 
        }}
        return false
}

startGame();

















