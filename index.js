const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d");
const scoreBoard = document.querySelector("#score");
const reset = document.querySelector("#reset");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const background = `white`;
let snakeColor = `darkorange`;
const yourSkinSnake = document.getElementById(`color`);
yourSkinSnake.addEventListener("input", () => {
    snakeColor = yourSkinSnake.value;
});
const snakeBoarder = `black`;
const foodColor = `lightgreen`;
const unitSize = 25;
let runnig = false;
let xVelocity = unitSize;
let yVelocity = 0;
let foodx;
let foody;
let score = 0;
let snake = [
    {x: unitSize * 4, y: 0},
    {x: unitSize * 3, y: 0},
    {x: unitSize * 2, y: 0},
    {x: unitSize * 1, y: 0},
    {x: 0, y: 0},
];

window.addEventListener('keydown', changeDirection);
reset.addEventListener('click', resetGame);
gameStart();

function gameStart() {
    runnig = true;
    scoreBoard.textContent = `Score: ${score}`;
    createFood();
    drawFood();
    nextTick();
};
function nextTick() {
    if (runnig) {
        setTimeout(() =>{
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();
        }, 75);
    }
    else{
        displayGameOver();
    }
};
function clearBoard() {
    ctx.fillStyle = background;
    ctx.fillRect(0, 0 , gameWidth, gameHeight);
};
function createFood() {
    function randomFood(min, max){
            return Math.floor((Math.random() * (max - min) + min)/unitSize) * unitSize;
    };
    foodx = randomFood(0, gameWidth - unitSize);
    foody = randomFood(0, gameWidth - unitSize);
};
function drawFood() {
    ctx.fillStyle = foodColor;
    ctx.fillRect(foodx, foody, unitSize, unitSize);
};
function moveSnake() {
    const head = {x: snake[0].x + xVelocity, y: snake[0].y + yVelocity };
    snake.unshift(head);
    if (snake[0].x  === foodx && snake[0].y  === foody) {
        score+=1;
        scoreBoard.textContent = `Score: ${score}`;
        createFood();
    }
    else{
        snake.pop();
    }
};
function drawSnake() {
    ctx.fillStyle = snakeColor;
    ctx.strokeStyle = snakeColor;
    snake.forEach(snakeParts => {
        ctx.fillRect(snakeParts.x, snakeParts.y, unitSize, unitSize);
        ctx.strokeRect(snakeParts.x, snakeParts.y, unitSize, unitSize);
    })
};
function resetGame(){
    score = 0;
    xVelocity = unitSize;
    yVelocity = 0;
    snake = [
        {x: unitSize * 4, y: 0},
        {x: unitSize * 3, y: 0},
        {x: unitSize * 2, y: 0},
        {x: unitSize * 1, y: 0},
        {x: 0, y: 0},
    ];
    gameStart();
};
function checkGameOver(){
    switch (true){
        case(snake[0].x < 0):
            runnig = false;
            break;
        case(snake[0].x >= gameWidth):
            runnig = false;
            break;
        case(snake[0].y < 0):
            runnig = false;
            break;
        case(snake[0].y >= gameHeight):
            runnig = false;
            break;
    }
    for(let i = 1;  i < snake.length;  i++){
        if(snake[i].x == snake[0].x && snake[i].y == snake[0].y ){
            runnig = false;
        }
    }
};
function displayGameOver(){
    ctx.font = "50px MV Boli";
    ctx.fillStyle = "#d30826";
    ctx.textAlign = `center`;
    ctx.fillText(`Game Over!`, gameWidth/2, gameHeight/2);
    runnig = false;
};
function changeDirection(event) {
    const keyPressed = event.keyCode
    const left = 65;
    const right = 68;
    const up = 87;
    const down =83;
    const goingUp = (yVelocity == -unitSize);
    const goingDown = (yVelocity == unitSize);
    const goingRight = (xVelocity == unitSize);
    const goingLeft = (xVelocity == -unitSize);
    switch(true) {
        case(keyPressed == left && !goingRight):
            xVelocity = -unitSize;
            yVelocity = 0;
            break;

        case(keyPressed == right && !goingLeft):
            xVelocity = unitSize;
            yVelocity = 0;
            break;

        case(keyPressed == up && !goingDown):
            xVelocity = 0;
            yVelocity = -unitSize;
            break;

        case(keyPressed == down && !goingUp):
            xVelocity = 0;
            yVelocity = unitSize;
            break;
    }
};
