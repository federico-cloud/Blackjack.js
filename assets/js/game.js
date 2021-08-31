let deck = [];
const types = ['C', 'D', 'H', 'S'];
const aces = ['A', 'J', 'Q', 'K'];

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
    console.log( card );
    
    return card;
}

//this function returns the value of the card
const cardValue = ( card ) => {
    const value = card.substring( 0, card.length - 1 );
    const points = (( isNaN( value ) ) ? ( value === 'A'  ?  11 : 10) : value * 1);   
    
    return points;
}

const value = cardValue(drawCard());
console.log(value);