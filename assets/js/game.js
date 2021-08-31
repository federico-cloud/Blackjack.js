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
    deck = _.shuffle(deck);
    console.log(deck);
}

createDeck();

const pedirCarta = () => {

    if (deck.length === 0) {
        throw 'No more cards in deck';
    }

    const carta = deck.pop();
    console.log(carta);
    console.log(deck);
    return carta;
}

pedirCarta();