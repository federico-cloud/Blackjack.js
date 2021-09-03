let deck = [];
const types = ['C', 'D', 'H', 'S'];
const aces = ['A', 'J', 'Q', 'K'];

let playerScore = 0;
let computerScore = 0;

//HTML references
const btnDraw = document.querySelector('#btn-draw');
const btnStop = document.querySelector('#btn-stop');
const btnNew = document.querySelector('#btn-new');
const playerScoreHTML = document.querySelector('.player-score');
const computerScoreHTML = document.querySelector('.computer-score');
const divCardsPlayer = document.querySelector('#player-cards');
const divCardsComputer = document.querySelector('#computer-cards');

//This function create a new shuffle deck 
const createDeck = () => {
    for ( let i = 2; i <= 10; i++ ) {
        for ( let type of types ) {
            deck.push( i + type );
        }
    }
    for ( let type of types ) {
        for ( let ace of aces ) {
            deck.push( ace + type );
        }
    }
    deck = _.shuffle( deck );
}

createDeck();

//This function draw a new card
const drawCard = () => {
    if (deck.length === 0) {
        throw 'No more cards in deck';
    }
    const card = deck.pop();
    return card;
}

//this function returns the value of the card
const cardValue = ( card ) => {
    const value = card.substring( 0, card.length - 1 );
    const points = (( isNaN( value ) ) ? ( value === 'A'  ?  11 : 10) : value * 1);   
    
    return points;
}

//Computer turn

const computerTurn = (minPoints) => {

    do{

        const card = drawCard();
        computerScore = computerScore + cardValue(card);
        computerScoreHTML.innerText = computerScore;
    
        const imgCard = document.createElement('img');
        imgCard.classList.add('card');
        imgCard.src = `assets/cards/${card}.png`;
        divCardsComputer.append(imgCard);
        
        if(minPoints > 21){
            break;
        }
 
    } while (( computerScore < minPoints ) && (minPoints <= 21))
    
    if ((computerScore > minPoints) && (computerScore <= 21) || playerScore > 21){
        console.log('Perdiste');
        btnStop.disabled = true;
        btnDraw.disabled = true;
    } else if ( (computerScore > 21 && minPoints > computerScore) || computerScore > 21){
        console.log('Ganaste');
        btnStop.disabled = true;
    } else if (computerScore === minPoints){

        const cardExtra = drawCard();
        computerScore = computerScore + cardValue(cardExtra);

        const imgCard = document.createElement('img');
        imgCard.classList.add('card');
        imgCard.src = `assets/cards/${cardExtra}.png`;
        divCardsComputer.append(imgCard);    
        
        if(computerScore > 21){
            console.log('Ganaste');
            btnDraw.disabled = true;
            btnStop.disabled = true;
        } else {
            console.log('perdiste');
            btnDraw.disabled = true;
            btnStop.disabled = true;
        }
        computerScoreHTML.innerText = computerScore;
    }
        
}
 
console.log(deck);

//Events
btnDraw.addEventListener( 'click', () => {
    const card = drawCard();
    playerScore = playerScore + cardValue(card);
    playerScoreHTML.innerText = playerScore;

    const imgCard = document.createElement('img');
    imgCard.classList.add('card');
    imgCard.src = `assets/cards/${card}.png`;
    divCardsPlayer.append(imgCard);

    if (playerScore > 21){
        btnDraw.disabled = true;
        btnStop.disabled = true;
        computerTurn(playerScore);
    }

});

btnStop.addEventListener("click", ()=>{
    btnDraw.disabled = true;
    computerTurn(playerScore);
});

btnNew.addEventListener("click", ()=>{
    deck = [];
    deck = createDeck();
    
    btnDraw.disabled = false;
    btnStop.disabled = false;

    playerScore = 0;
    computerScore = 0;

    computerScoreHTML.innerText = 0;
    playerScoreHTML.innerText = 0;
    console.log(playerScore);

});
