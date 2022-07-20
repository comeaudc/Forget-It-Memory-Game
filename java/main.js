//Grabbing Game components from DOM
const section = document.querySelector('section')
const body = document.querySelector('body')
const timer = document.getElementById('timer')
const player1 = document.getElementById('player1')
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
const grid = document.querySelector('.grid-container')
const leaderBoard = document.querySelector('#highscore')
const people2 = document.getElementById('twoPlayer')
const people1 = document.getElementById('onePlayer')
const multi = document.getElementById('second')
const amount = document.getElementsByName('people')
const scoreDiv = document.getElementById('score')

//Variables for Game Play
var fate;               //Decides difficulty value
var version;            //Decides symbol or colors
var person1;            //Player 1 name
var person2;            //Player 2 name
var player1Score = 0;   //Player 1 score
var player2Score = 0;   //Player 2 score
var bonuses = 0;        //Consicutive matched for bonus calculation
let totalRounds;        //total rounds for entire game
let totalGameRounds;    //total rounds for current match
let tiered = false      //If its a teired tournament
let firstTurn = true;   //Helps figure out it player 1 or player 2 playing
let gameRound = 0;      //counter for game rounds
let matchRound = 0;     //counter for match rounds
let totalBonus;         //watches current bonus total
let gameHighscore;      //Placeholder for that games highscore
let highscore = 0;      //Saved highscore
let winnerName;         //Winner of current game for High score
let onePlayer = false;  //Keeps track of one or two player game
var player2;            //Variable for player 2 name
var two;                //Global variable for Document object div for player 2

//click events for startup
next.focus()    //Focuses on Instructions Button
//Even Listener for instructions modal
next.addEventListener('click', (evt) => {
    startup.classList.add('inactive')
    rules.classList.add('active')
    focus1.focus()
})
//Event listeners for any button going directly to GameSetUp modal
for(let i = 0; i < ready.length; i++) {
  ready[i].addEventListener('click', (evt) => {
    startup.classList.add('inactive')
    rules.classList.replace('active', 'inactive')
    players.classList.add('active')
    title1.focus()
})  
}
//Event Listener to begin game from game setup
people1.addEventListener('click', (evt) => {
    multi.classList.remove('active')
    title1.focus()
})
people2.addEventListener('click', (evt) => {
    multi.classList.add('active')
    title1.focus()
})
submit.addEventListener('click', (evt) =>{

    //Gathers game setup information
    totalRounds = document.getElementById('rounds').value
    person1 = title1.value;
    person2 = title2.value;
    for(let i = 0; i < amount.length; i++){
        if(amount[i].checked){
            if(amount[i].value == 1){
                onePlayer = true
                score.classList.add('single')
            }
        }
    }
    for(let i = 0; i < type.length; i++) {
        if (type[i].checked){
            version = type[i].value
        }
    }
    fate = difficulty.value

    //This Function decides layout and symbols for the entire game/populated DOM
    gameDecision(fate, version)

    //Sets names for current game
    if(onePlayer == true){
        if(person1 == '') {
            person1 = 'Player 1'
            player1name.textContent = 'Player 1:'
            player1.textContent = 0
        }
        else{
            player1name.textContent = person1 + ':'
            player1.textContent = 0
        }
        one.classList.replace('off', 'single')
    }
    else{
        two = document.createElement('div')
        two.classList.add('off')
        two.id = 'two'
        let newPlayerName = document.createElement('h2')
        let newPlayerNameSpan = document.createElement('span')
        newPlayerNameSpan.id = 'player2name'
        player2 = document.createElement('span')
        player2.id = 'player2'
        newPlayerName.append(newPlayerNameSpan, player2)
        two.appendChild(newPlayerName)
        if(person1 == '') {
            person1 = 'Player 1'
            player1name.textContent = 'Player 1:'
            player1.textContent = 0
        }
        else{
            player1name.textContent = person1 + ': '
            player1.textContent = 0
        }
        if(person2 == '') {
            person2 = 'Player 2'
            newPlayerNameSpan.textContent = 'Player 2: '
            player2.textContent = 0
        }
        else{
            newPlayerNameSpan.textContent = person2 + ': '
            player2.textContent = 0
        }
        score.appendChild(two)
        one.classList.replace('off', 'active')
        two.classList.remove('off')
    }
    
    //Sets score on DOM
    //Removes modal and activates score placards
    players.classList.add('inactive')

})

//Functions that make array of objects to guess
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
//Randomized Using the Fisher-Yayes Shuffle
function randomize (deck) {
    const symbolsMixed = deck()
    
    let currentIndex = symbolsMixed.length,  randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      [symbolsMixed[currentIndex], symbolsMixed[randomIndex]] = [
        symbolsMixed[randomIndex], symbolsMixed[currentIndex]];
    }
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

//Function to check if colors match
function check(evt) {
    const choice = evt.target
    choice.classList.add('flipped')
    let choices = document.querySelectorAll('.flipped')

    //Check to see if cards match
    if(choices.length === 2) {
        //If match
        if (choices[0].getAttribute('name') === choices[1].getAttribute('name')) {
            //Bonuses tally increments
            bonuses++
            //remove class lift for next pair
            choices[0].classList.remove('flipped')
            choices[1].classList.remove('flipped')
            //Calculate points and bonus
            points(firstTurn, bonuses);
            //Clear array for next pair
            choices = [];
            //Increment towards end of match
            matchRound++
            //Update bonus on board
            bonusTally(bonuses)
            //If that was last round
            if (matchRound == totalGameRounds) {
                //Addbonuses, reset game content and increment round
                    bonus(totalBonus, firstTurn)
                    totalBonus = 0
                    bonuses = 0
                    tally.textContent = ''
                    bonuses = 0
                    matchRound = 0
                    gameRound++
                    setTimeout(clear, 2250)
                    //If there is still rounds to play
                    if (gameRound != totalRounds){
                        update()
                        setTimeout(gameDecision, 2250, fate, version, gameRound)
                        setTimeout(clearUpdate, 2300)
                    }
                    //Else game over. Winner Declared
                    else {
                        winnerGreetings()
                    }
                }
            }
            //No match
        else {
            //Reset Tiles
            choices[0].classList.remove('flipped')
            choices[1].classList.remove('flipped')

            //add bonus to total score and reset values
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
    if(onePlayer == true){
        player1Score +=10
        player1.textContent = player1Score
    }
    else {
        //Is it player 1
        if(firstTurn == true){
            player1Score += 10
            player1.textContent = player1Score
        }
        //Or player 2
        else {
            player2Score += 10
            player2.textContent = player2Score
        }
    }
}
function bonus(totalBonus, firstTurn) {
    if(totalBonus > 0){    
        if(onePlayer == true){
            player1Score += totalBonus
            player1.textContent = player1Score
        }
        else {
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
}
let tally = document.createElement('p')
tally.classList.add('tally')
function bonusTally(bonuses){
    totalBonus = 0
    if(bonuses > 1){
        for(let i = 0; i < bonuses; i++){
            totalBonus += (i * 5)
        }
        tally.textContent = ''
        tally.textContent = `Bonus + ${totalBonus}`
        if(onePlayer == true){
            one.appendChild(tally)
        }
        else{
            if(firstTurn == true){
                one.appendChild(tally)
            }
            else{
                two.appendChild(tally)
            }
        }

    }
} 

//functions for switching turns visually
function switchTurn() {
    if(onePlayer == false){
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
    if(onePlayer == true){
        byline.textContent = `You have a score of ${player1Score}`
    }
    else {
        if (player1Score > player2Score){
            byline.textContent = `${person1} is Winning ${player1Score} to ${player2Score}`
        }
        else {
            byline.textContent = `${person2} is Winning ${player2Score} to ${player1Score}`
        }
    }

    statusBoard.append(headline, byline)
    statusBoard.classList.add('active')
}
function clearUpdate(){
    statusBoard.classList.remove('active')
    setTimeout(removeUpdates, 1000)
}
function removeUpdates(){
    let contents = document.querySelectorAll('.update, .temp')

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
    let hs = document.createElement('button')
    let tryAgain = document.createElement('button')
    hs.classList.add('temp')
    tryAgain.classList.add('temp')
    hs.textContent = 'Add Highscore?'
    tryAgain.textContent = `Play Again?`
    tryAgain.addEventListener('click', (evt) =>{
        startOver()
    })
    hs.addEventListener('click', (evt) =>{
        addHighScore()
    })    

    if(onePlayer == true){
        winnerName = person1
        gameHighscore = player1Score
        if(gameHighscore > highscore){
            headline.textContent = `New HighScore!!!`
            byline.textContent = `You scored ${gameHighscore}pts!!!`
        }
        else{
            headline.textContent = `You scored ${gameHighscore}pts!!!`
            byline.textContent = `Better Luck Next Time!!!`        
        }
    }
    else{
        let diff;
        if(player1Score > player2Score){
            diff = player1Score - player2Score
            headline.textContent = `${person1} Wins!!!`
            byline.textContent = `${person1} beat ${person2} by ${diff} points!!!`
            winnerName = person1
            gameHighscore = player1Score
        }
        else if (player1Score == player2Score){
            headline.textContent = `You Tied!!!`
            byline.textContent = `The score was ${player1Score} to ${player2Score}!!!`
        }
        else {
            diff = player2Score - player1Score
            headline.textContent = `${person2} Wins!!!`
            byline.textContent = `${person2} beat ${person1} by ${diff} points!!!`
            winnerName = person2
            gameHighscore = player2Score
            
        }
    }

    statusBoard.append(headline, byline, tryAgain)
    if(gameHighscore > highscore){
        statusBoard.append(hs)
    }
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

//Function for starting over
function startOver(){
    if(onePlayer == false){
        two.remove()
    }
    startup.classList.remove('inactive')
    one.classList.add('off')
    one.classList.remove('active', 'single')
    rules.classList.remove('inactive')
    players.classList.remove('active', 'inactive')
    grid.classList.remove('grid-container-large', 'grid-container-small')
    firstTurn = true 
    onePlayer = false
    player1Score = 0
    player2Score = 0
    gameRound = 0
    matchRound = 0
    clearUpdate()
    clear()
    next.focus()
}

function addHighScore(){
    removeUpdates()
    highscore = gameHighscore
    let headline = document.createElement('h1')
    let byline = document.createElement('h2')
    let submission = document.createElement('div')
    submission.classList.add('sub', 'temp')
    headline.classList.add('update')
    headline.textContent = `New Highscore of ${highscore} by ${winnerName}`

    byline.textContent = `Name:`
    let hsName = document.createElement('input')
    hsName.type = 'text'
    hsName.placeholder = person1
    hsName.classList.add('temp')
    submission.append(byline, hsName)

    let enter = document.createElement('button')
    enter.classList.add('temp')
    enter.addEventListener('click', (evt) => {
        let leader = document.getElementById('leader')
        if(hsName.value == ''){
            leader.textContent = `${person1}: ${highscore}pts`
        }
        else{
            leader.textContent = `${hsName.value}: ${highscore}pts`
        }

        leaderBoard.classList.add('active')
        startOver()
    })
    enter.textContent = `Submit`
    statusBoard.append(headline, submission, enter)
}