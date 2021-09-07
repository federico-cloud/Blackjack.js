( () =>{

    'use strict';

    let deck = [];
    const types = ['C', 'D', 'H', 'S'],
               aces = ['A', 'J', 'Q', 'K'];
    
    let computerScore = 0;

    let points = [];

    //HTML references
    const btnDraw = document.querySelector('#btn-draw'),
               btnStop = document.querySelector('#btn-stop'),
               btnNew = document.querySelector('#btn-new'),
               pointsHTML = document.querySelectorAll('small'),
               divCards = document.querySelectorAll('.divCards');

    const initGame = (numbPlayers = 2) => {
      deck = createDeck();
      points = [];
        for(let i = 0; i < numbPlayers; i++) {
            points.push(0);
        }

        btnDraw.disabled = false;
        btnStop.disabled = false;

        pointsHTML.forEach(elem => elem.innerText = 0);
        divCards.forEach(elem => elem.innerHTML = ' ');

    }

    //This function create a new shuffle deck 
    const createDeck = () => {

        deck = [];

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

        return _.shuffle( deck );
    }


    //This function draw a new card
    const drawCard = () => {
        if (deck.length === 0) {
            throw 'No more cards in deck';
        }

        return deck.pop();
    }

    //this function returns the value of the card
    const cardValue = ( card ) => {
        const value = card.substring( 0, card.length - 1 );
        const points = (( isNaN( value ) ) ? ( value === 'A'  ?  11 : 10) : value * 1);   

        return points;
    }


    /*
        Turn 0 = first player
        ...
        Last turn = computer
    */
    const addPoints = (card, turn) => {
        points[turn] = points[turn] + cardValue(card);
        pointsHTML[turn].innerText = points[turn];

        return points[turn];
    }

    const createCard = ( card, turn) =>{ 
        const imgCard = document.createElement('img');
        imgCard.classList.add('card');
        imgCard.src = `assets/cards/${card}.png`;
        divCards[turn].append(imgCard);
    };

    //Computer turn
    const computerTurn = (minPoints) => {

        do {

            const card = drawCard();
            computerScore = addPoints(card, points.length - 1);
            createCard(card, points.length - 1);

        } while (( computerScore < minPoints ) && (minPoints <= 21))

        if ((computerScore > minPoints) && (computerScore <= 21) || points[0] > 21){
            Swal.fire({
                title: 'YOU LOOSE',
                text: '=(',
                imageUrl: 'assets/img/sad.jpg',
                imageWidth: 400,
                imageHeight: 400,
                imageAlt: 'Looser Image',
              });
            btnStop.disabled = true;
            btnDraw.disabled = true;
        } else if ( (computerScore > 21 && minPoints > computerScore) || computerScore > 21){
            Swal.fire({
                title: 'YOU ARE THE WINNER',
                text: 'You defeat the CPU, Congratulations.',
                imageUrl: 'assets/img/michi.jpg',
                imageWidth: 400,
                imageHeight: 400,
                imageAlt: 'Winner Image',
              });
            btnStop.disabled = true;
        } else if (computerScore === minPoints){
            const cardExtra = drawCard();
            computerScore = computerScore + cardValue(cardExtra);
            createCard(cardExtra, points.length - 1);
            if(computerScore > 21){
                Swal.fire({
                    title: 'YOU ARE THE WINNER',
                    text: 'You defeat the CPU, Congratulations.',
                    imageUrl: 'assets/img/michi.jpg',
                    imageWidth: 400,
                    imageHeight: 400,
                    imageAlt: 'Winner Image',
                  });
                btnDraw.disabled = true;
                btnStop.disabled = true;
            } else {
                Swal.fire({
                title: 'YOU LOOSE',
                text: '=(',
                imageUrl: 'assets/img/sad.jpg',
                imageWidth: 400,
                imageHeight: 400,
                imageAlt: 'Looser Image',
              });
                btnDraw.disabled = true;
                btnStop.disabled = true;
            }
            pointsHTML[points.length - 1].innerText = computerScore;
        }

    }

    //Events
    btnDraw.addEventListener( 'click', () => {
        const card = drawCard();
        points[0]= addPoints(card, 0);

        createCard(card, 0);

        if (points[0] > 21){
            btnDraw.disabled = true;
            btnStop.disabled = true;
            computerTurn(points[0]);
        }

    });

    btnStop.addEventListener("click", ()=>{

        btnDraw.disabled = true;
        computerTurn(points[0]);

    });

    btnNew.addEventListener("click", ()=>{

        initGame();

    });

})();