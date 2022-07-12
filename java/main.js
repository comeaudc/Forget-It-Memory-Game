//Grabbing Game components from DOM
const section = document.querySelector('section')
const timer = document.getElementById('timer')
const player1 = document.getElementById('player1')
const player2 = document.getElementById('player2')

//Variables for score keeping
var player1Score = 0;
var player2Score = 0;

//Make array of objects to guess
const images = () => [
    {imgSource: 'images/airplane.png', name: 'airplane'},
    {imgSource: 'images/cat.png', name: 'cat'},
    {imgSource: 'images/dog.png', name: 'dog'},
    {imgSource: 'images/dinosaur.png', name: 'dinosaur'},
    {imgSource: 'images/motorbike.png', name: 'motorbike'},
    {imgSource: 'images/mushroom.png', name: 'mushroom'},
    {imgSource: 'images/airplane.png', name: 'airplane'},
    {imgSource: 'images/cat.png', name: 'cat'},
    {imgSource: 'images/dog.png', name: 'dog'},
    {imgSource: 'images/dinosaur.png', name: 'dinosaur'},
    {imgSource: 'images/motorbike.png', name: 'motorbike'},
    {imgSource: 'images/mushroom.png', name: 'mushroom'},
];

const colors = () => [
    {imgSource: 'images/orange.jpg', name: 'orange'},
    {imgSource: 'images/red.jpg', name: 'red'},
    {imgSource: 'images/green.jpg', name: 'green'},
    {imgSource: 'images/purple.jpg', name: 'purple'},
    {imgSource: 'images/blue.jpg', name: 'blue'},
    {imgSource: 'images/yellow.jpg', name: 'yellow'},
    {imgSource: 'images/orange.jpg', name: 'orange'},
    {imgSource: 'images/red.jpg', name: 'red'},
    {imgSource: 'images/green.jpg', name: 'green'},
    {imgSource: 'images/purple.jpg', name: 'purple'},
    {imgSource: 'images/blue.jpg', name: 'blue'},
    {imgSource: 'images/yellow.jpg', name: 'yellow'}
];

//This function will randomize the cards
function randomize (deck) {
    const symbolsMixed = deck()
    symbolsMixed.sort(() => Math.random() - 0.5)
    return symbolsMixed
}

//Create Cards on DOM
function generateDeck (deck) {
    const symbolsMixed = randomize(deck)
    //Generate guessing squares on html
    symbolsMixed.forEach((spot, index) => {
        const square = document.createElement('div')
        const color = document.createElement('img')
        const back = document.createElement('div')
        square.classList = 'square'
        color.classList = 'color'
        back.classList = 'back'
        //Append colors/symbols to card
        color.src = spot.imgSource
        square.setAttribute('name', spot.name)


        //Append to DOM
        section.appendChild(square)
        square.appendChild(color)
        square.appendChild(back)

        //Add event listener to flip square
        square.addEventListener('click', function(evt){
            square.classList.toggle('toggleSquare')
            check(evt)
        } )
    })
}

let firstTurn = true;
//Function to check if colors match
function check(evt) {
    const choice = evt.target
    choice.classList.add('flipped')
    let choices = document.querySelectorAll('.flipped')

    //Check to see if cards match
    if(choices.length === 2) {
        if (choices[0].getAttribute('name') === choices[1].getAttribute('name')) {
            choices[0].classList.remove('flipped')
            choices[1].classList.remove('flipped')
            points(firstTurn);
            choices = [];
        }
        else {
            setTimeout(close, 1200, choices)
            choices = [];
            //Switch turns
            switchTurn();
        }
    }

}

//Function for closing squares if no match
function close (choices) {
    choices[0].classList.remove('toggleSquare', 'flipped')
    choices[1].classList.remove('toggleSquare', 'flipped')
}

//Point awarding functions
function points(firstTurn) {
    if(firstTurn == true){
        player1Score += 10
        player1.textContent = player1Score
        console.log('player one scored')
    }
    else {
        player2Score += 10
        player2.textContent = player2Score
        console.log('player two scored')
    }
}

//functions for switching turns
function switchTurn() {
    firstTurn = !firstTurn
}
generateDeck(colors)