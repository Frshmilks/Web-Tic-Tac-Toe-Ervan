let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;
let gameMode = '';

let xScore = 0;
let oScore = 0;
let drawScore = 0;

const statusText = document.getElementById('status');
const cells = document.querySelectorAll('.cell');

const startScreen = document.getElementById('startScreen');
const gameContainer = document.getElementById('gameContainer');

const winnerPopup = document.getElementById('winnerPopup');
const winnerText = document.getElementById('winnerText');

const xScoreText = document.getElementById('xScore');
const oScoreText = document.getElementById('oScore');
const drawScoreText = document.getElementById('drawScore');

const boardElement = document.querySelector(".board");
boardElement.classList.add("disabled");

const winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function startGame(){
    startScreen.style.display = 'none';
    gameContainer.style.display = 'block';
}

function setMode(mode){
    gameMode = mode;
    resetGame();
    boardElement.classList.remove("disabled");

    if(mode === 'player'){
        statusText.textContent = '🎮 Mode 1 VS 1';
    }else{
        statusText.textContent = '🤖 Mode VS BOT';
    }
}

function handleClick(index){

    if(board[index] !== '' || !gameActive){
        return;
    }

    board[index] = currentPlayer;
    cells[index].textContent = currentPlayer;

    checkWinner();

    if(
        gameMode === 'bot' &&
        gameActive &&
        currentPlayer === 'O'
    ){
        botMove();
    }
}

function checkWinner(){

    for(let pattern of winPatterns){

        const [a,b,c] = pattern;

        if(
            board[a] &&
            board[a] === board[b] &&
            board[a] === board[c]
        ){

            gameActive = false;

            statusText.textContent =
                `🏆 Pemain ${currentPlayer} Menang!`;

            if(currentPlayer === 'X'){
                xScore++;
                xScoreText.textContent = xScore;
            }else{
                oScore++;
                oScoreText.textContent = oScore;
            }

            showPopup(
                `🏆 Pemain ${currentPlayer} Menang!`
            );

            return;
        }
    }

    if(!board.includes('')){

        gameActive = false;

        drawScore++;
        drawScoreText.textContent = drawScore;

        statusText.textContent =
            '😅 Permainan Seri!';

        showPopup('😅 Permainan Seri!');

        return;
    }

    currentPlayer =
        currentPlayer === 'X'
        ? 'O'
        : 'X';

    statusText.textContent =
        `Giliran ${currentPlayer}`;
}

function botMove(){

    let emptyCells = [];

    for(let i=0; i<board.length; i++){
        if(board[i] === ''){
            emptyCells.push(i);
        }
    }

    if(emptyCells.length === 0){
        return;
    }

    let randomIndex =
        emptyCells[
            Math.floor(
                Math.random() *
                emptyCells.length
            )
        ];

    setTimeout(() => {

        board[randomIndex] = 'O';
        cells[randomIndex].textContent = 'O';

        checkWinner();

    }, 500);
}

function resetGame(){

    board = ['', '', '', '', '', '', '', '', ''];

    currentPlayer = 'X';
    gameActive = true;

    cells.forEach(cell => {
        cell.textContent = '';
    });

    if(gameMode === 'bot'){
        statusText.textContent =
            '🤖 Mode VS BOT';
    }
    else if(gameMode === 'player'){
        statusText.textContent =
            '🎮 Mode 1 VS 1';
    }
    else{
        statusText.textContent =
            'Pilih Mode Permainan';
        boardElement.classList.add("disabled");
    }
}

function showPopup(message){

    winnerText.textContent = message;
    winnerPopup.style.display = 'flex';
}

function closePopup(){

    winnerPopup.style.display = 'none';
}