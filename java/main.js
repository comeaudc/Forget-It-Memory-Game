//Grabbing Game components from DOM
const section = document.querySelector('section')
const body = document.querySelector('body')
const timer = document.getElementById('timer')
const player1 = document.getElementById('player1')
const player2 = document.getElementById('player2')
const player1name = document.getElementById('player1name')
const player2name = document.getElementById('player2name')
const players = document.getElementById('players')
const startup = document.getElementById('startup')
const next = document.getElementById('next')
const rules = document.getElementById('rules')
const submit = document.getElementById('submit')
const ready = document.getElementsByClassName('ready')
const title1 = document.getElementById('playerName1')
const title2 = document.getElementById('playerName2')
const type = document.getElementsByName('type')
const difficulty = document.getElementById('difficulty')
const statusBoard = document.getElementById('statusBoard')
const focus1 = document.getElementById('focus')
const one = document.getElementById('one')
const two = document.getElementById('two')
const grid = document.querySelector('.grid-container')

//click events for startup
next.focus()
next.addEventListener('click', (evt) => {
    startup.classList.add('inactive')
    rules.classList.add('active')
    focus1.focus()
})
for(let i = 0; i < ready.length; i++) {
  ready[i].addEventListener('click', (evt) => {
    startup.classList.add('inactive')
    rules.classList.replace('active', 'inactive')
    players.classList.add('active')
    title1.focus()
})  
}
submit.addEventListener('click', (evt) =>{
    totalRounds = document.getElementById('rounds').value
    person1 = title1.value;
    person2 = title2.value;
    for(let i = 0; i < type.length; i++) {
        if (type[i].checked){
            version = type[i].value
        }
    }
    fate = difficulty.value

    //This Function decides layout and symbols for the entire game
    gameDecision(fate, version)

    if(person1 == '') {
        person1 = 'Player 1'
        player1name.textContent = 'Player 1:'
    }
    else{
        player1name.textContent = person1 + ':'
    }
    if(person2 == '') {
        person2 = 'Player 2'
        player2name.textContent = 'Player 2:'
    }
    else{
        player2name.textContent = person2 + ':'
    }

    player1.textContent = 0
    player2.textContent = 0
    players.classList.add('inactive')
    one.classList.replace('off', 'active')
    two.classList.remove('off') 
})

//Variables for Game Play
var fate;
var version;
var person1;
var person2;
var player1Score = 0;
var player2Score = 0;
var bonuses = 0;
let totalRounds;
let totalGameRounds;
let tiered = false
//Make array of objects to guess
const images1 = () => [//6 tile
    {imgSource: 'images/cat.png', name: 'cat'},
    {imgSource: 'images/dog.png', name: 'dog'},
    {imgSource: 'images/dinosaur.png', name: 'dinosaur'},
    {imgSource: 'images/cat.png', name: 'cat'},
    {imgSource: 'images/dog.png', name: 'dog'},
    {imgSource: 'images/dinosaur.png', name: 'dinosaur'},
];
const colors1 = () => [  //6 tile
    {imgSource: 'images/yellow.jpg', name: 'yellow'},
    {imgSource: 'images/red.jpg', name: 'red'},
    {imgSource: 'images/green.jpg', name: 'green'},
    {imgSource: 'images/yellow.jpg', name: 'yellow'},
    {imgSource: 'images/red.jpg', name: 'red'},
    {imgSource: 'images/green.jpg', name: 'green'},
];
const images2 = () => [//12 tile
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
const colors2 = () => [  //12 tile
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
const images3 = () => [//18 tile
    {imgSource: 'images/hedgehog.jpg', name: 'hedgehog'},
    {imgSource: 'images/hot-air-balloon.jpg', name: 'hot-air-balloon'},
    {imgSource: 'images/whale.jpg', name: 'whale'},
    {imgSource: 'images/airplane.png', name: 'airplane'},
    {imgSource: 'images/cat.png', name: 'cat'},
    {imgSource: 'images/dog.png', name: 'dog'},
    {imgSource: 'images/dinosaur.png', name: 'dinosaur'},
    {imgSource: 'images/motorbike.png', name: 'motorbike'},
    {imgSource: 'images/mushroom.png', name: 'mushroom'},
    {imgSource: 'images/hedgehog.jpg', name: 'hedgehog'},
    {imgSource: 'images/hot-air-balloon.jpg', name: 'hot-air-balloon'},
    {imgSource: 'images/whale.jpg', name: 'whale'},
    {imgSource: 'images/airplane.png', name: 'airplane'},
    {imgSource: 'images/cat.png', name: 'cat'},
    {imgSource: 'images/dog.png', name: 'dog'},
    {imgSource: 'images/dinosaur.png', name: 'dinosaur'},
    {imgSource: 'images/motorbike.png', name: 'motorbike'},
    {imgSource: 'images/mushroom.png', name: 'mushroom'},
];
const colors3 = () => [  //18 tile
    {imgSource: 'images/orange.jpg', name: 'orange'},
    {imgSource: 'images/red.jpg', name: 'red'},
    {imgSource: 'images/green.jpg', name: 'green'},
    {imgSource: 'images/purple.jpg', name: 'purple'},
    {imgSource: 'images/blue.jpg', name: 'blue'},
    {imgSource: 'images/yellow.jpg', name: 'yellow'},
    {imgSource: 'images/blueYellow.jpg', name: 'blueYellow'},
    {imgSource: 'images/bystriped.jpg', name: 'bystriped'},
    {imgSource: 'images/redGreen.jpg', name: 'redGreen'},
    {imgSource: 'images/orange.jpg', name: 'orange'},
    {imgSource: 'images/red.jpg', name: 'red'},
    {imgSource: 'images/green.jpg', name: 'green'},
    {imgSource: 'images/purple.jpg', name: 'purple'},
    {imgSource: 'images/blue.jpg', name: 'blue'},
    {imgSource: 'images/yellow.jpg', name: 'yellow'},
    {imgSource: 'images/blueYellow.jpg', name: 'blueYellow'},
    {imgSource: 'images/bystriped.jpg', name: 'bystriped'},
    {imgSource: 'images/redGreen.jpg', name: 'redGreen'}
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
let gameRound = 0;
let matchRound = 0;
let totalBonus;
//Function to check if colors match
function check(evt) {
    const choice = evt.target
    choice.classList.add('flipped')
    let choices = document.querySelectorAll('.flipped')

    //Check to see if cards match
    if(choices.length === 2) {
        if (choices[0].getAttribute('name') === choices[1].getAttribute('name')) {
            bonuses++
            choices[0].classList.remove('flipped')
            choices[1].classList.remove('flipped')
            points(firstTurn, bonuses);
            choices = [];
            matchRound++
            bonusTally(bonuses)
            if (matchRound == totalGameRounds) {
                    bonus(totalBonus, firstTurn)
                    totalBonus = 0
                    bonuses = 0
                    tally.textContent = ''
                    bonuses = 0
                    matchRound = 0
                    gameRound++
                    setTimeout(clear, 2250)
                    if (gameRound != totalRounds){
                        update()
                        setTimeout(gameDecision, 2250, fate, version, gameRound)
                        setTimeout(clearUpdate, 2300)
                    }
                    else {
                        winnerGreetings()
                        console.log(`game over`)
                    }
                }
            }
        else {
            console.log(totalBonus)
            bonus(totalBonus, firstTurn)
            totalBonus = 0
            bonuses = 0
            tally.textContent = ''
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
function points(firstTurn, bonuses) {
    if(firstTurn == true){
        player1Score += 10
        player1.textContent = player1Score
    }
    else {
        player2Score += 10
        player2.textContent = player2Score
    }
}
function bonus(totalBonus, firstTurn) {
    if(totalBonus > 0){
        if(firstTurn == true){
            player1Score += totalBonus
            player1.textContent = player1Score
        }
        else{
            player2Score += totalBonus
            player2.textContent = player2Score
        }
    }
}
    

//functions for switching turns
function switchTurn() {
    firstTurn = !firstTurn
    if(firstTurn == true){
        one.classList.add('active')
        two.classList.remove('active')
    }
    else{
        two.classList.add('active')
        one.classList.remove('active')
    }
}

//function clear board & Round changes
function clear (){
    let boxes = document.querySelectorAll('.square')
    boxes.forEach(box => {
        box.remove()
    })
}
function update() {
    let headline = document.createElement('h1')
    let byline = document.createElement('h2')
    headline.classList.add('update')
    byline.classList.add('update')
    let currentRound = gameRound + 1
    if (currentRound == totalRounds){
        headline.textContent = `Final Round!!`
    }
    else {
        headline.textContent = `Round ${currentRound}`
    }
    if (player1Score > player2Score){
        byline.textContent = `${person1} is Winning ${player1Score} to ${player2Score}`
    }
    else {
        byline.textContent = `${person2} is Winning ${player2Score} to ${player1Score}`
    }
    statusBoard.append(headline, byline)
    statusBoard.classList.add('active')
}
function clearUpdate(){
    statusBoard.classList.remove('active')
    setTimeout(removeUpdates, 1000)
}
function removeUpdates(){
    let contents = document.querySelectorAll('.update')
    contents.forEach(article => {
        article.remove();
    })
}

function winnerGreetings() {
    let headline = document.createElement('h1')
    let byline = document.createElement('h2')
    headline.classList.add('update')
    byline.classList.add('update')
    //Make button to try again from top
    let tryAgain = document.createElement('button')
    tryAgain.classList.add('buttons')
    tryAgain.textContent = `Play Again?`
    tryAgain.addEventListener('click', (evt) =>{
        startOver()
    })

    let diff;
    if(player1Score > player2Score){
        diff = player1Score - player2Score
        headline.textContent = `${person1} Wins!!!`
        byline.textContent = `${person1} beat ${person2} by ${diff} points!!!`
    }
    else if (player1Score == player2Score){
        headline.textContent = `You Tied!!!`
        byline.textContent = `The score was ${player1Score} to ${player2Score}!!!`
    }
    else {
        diff = player2Score - player1Score
        headline.textContent = `${person2} Wins!!!`
        byline.textContent = `${person2} beat ${person1} by ${diff} points!!!`
        
    }
    statusBoard.append(headline, byline, tryAgain)
    statusBoard.classList.add('active')
}

//function for deciding what to generate
function gameDecision(fate, version){
    if (fate == 'tier'){
        if (version == 'colors'){
            if(gameRound == 0){
                totalRounds = 3
                totalGameRounds = 3
                grid.classList.add('grid-container-small')
                generateDeck(colors1)
                console.log(`hello`)
            }
            else if(gameRound == 1) {
                totalGameRounds = 6
                grid.classList.remove('grid-container-small')
                generateDeck(colors2)
            }
            else {
                totalGameRounds = 9
                grid.classList.add('grid-container-large')
                generateDeck(colors3)
            }
        }
        else {
            if(gameRound == 0){
                totalRounds = 3
                totalGameRounds = 3
                grid.classList.add('grid-container-small')
                generateDeck(images1)
            }
            else if(gameRound == 1) {
                totalGameRounds = 6
                grid.classList.remove('grid-container-small')
                generateDeck(images2)
            }
            else {
                totalGameRounds = 9
                grid.classList.add('grid-container-large')
                generateDeck(images3)
            }
        }
    }
    else{
        if (version == "colors") {
            if(fate == 1){
                totalGameRounds = 3
                grid.classList.add('grid-container-small')
                generateDeck(colors1)
            }
            else if (fate == 2){
                totalGameRounds = 6
                generateDeck(colors2)
            }
            else {
                totalGameRounds = 9
                grid.classList.add('grid-container-large')
                generateDeck(colors3)
            }
        }
        else{
            if(fate == 1){
                totalGameRounds = 3
                grid.classList.add('grid-container-small')
                generateDeck(images1)
            }
            else if (fate == 2){
                totalGameRounds = 6
                generateDeck(images2)
            }
            else {
                totalGameRounds = 9
                grid.classList.add('grid-container-large')
                generateDeck(images3)
            }
        }
    }
}

let tally = document.createElement('p')
function bonusTally(bonuses){
    totalBonus = 0
    if(bonuses > 1){
        for(let i = 0; i < bonuses; i++){
            totalBonus += (i * 5)
        }
        tally.textContent = ''
        tally.textContent = `Bonus + ${totalBonus}`
        if(firstTurn == true){
            one.appendChild(tally)
        }
        else{
            two.appendChild(tally)
        }
    }
}

//Function for starting over
function startOver(){
    console.log('startOver')
    startup.classList.remove('inactive')
    one.classList.add('off')
    two.classList.add('off')
    one.classList.remove('active')
    two.classList.remove('active')
    rules.classList.remove('inactive')
    players.classList.remove('active', 'inactive')
    grid.classList.remove('grid-container-large', 'grid-container-small')
    firstTurn = true 
    player1Score = 0
    player2Score = 0
    clearUpdate()
    clear()
    next.focus()
}