var img;
var temp = [];
var p1turn = true;
var board = [];
var n;
var clicked = false;
var lastRow;
var lastColumn;
var gameOver;
var canClick;
const BOARD_LENGTH = 5;
const PIECE_SIZE = 70;

function preload() {
    img = loadImage("assets/board.png");
}

function setup() {
    var canvas = createCanvas(640, 480);
    canvas.parent('sketch-holder');
    image(img, 0, 0);

    rectMode(CENTER);
    noStroke();
    fill(255, 0, 0);

    fillBoardArray();
    while (temp.length) board.push(temp.splice(0, 7));

    gameOver = false;
    canClick = true;

}

function draw() {
    image(img, 0, 0);
    click();
    changeText();
    if (checkWinner(board)) {
        gameOver = true;
        canClick = false;
    }
    resetButton();


}

keyPressed = (k) => {
    if (k.keyCode === 32) {
        console.log({mouseX: mouseX, mouseY: mouseY})
    }

    console.log()
}


function click() {
    var date = new Date();
    var time = date.getTime();
    if (mouseIsPressed) {
        if (time - n > 250 || !clicked) {
            clicked = true;
            var d = new Date();
            n = d.getTime();
            if (canClick) {
                if (mouseY <= height && mouseX > 0 && mouseX < width) {
                   dropPiece(Math.floor(mouseX / 91))
                }
            }
        }
    }
}

function dropPiece(column) {
    for (var i = BOARD_LENGTH; i >= 0; i--) {
        if (board[i][column].empty) {
            board[i][column].drawCircle();
            board[i][column].empty = false;
            p1turn ? board[i][column].team = 1 : board[i][column].team = 2;
            switchTurn();
            lastRow = i;
            lastColumn = column;
            break;
        }
    }
}

this.Point = function(x, y) {
    this.x = x;
    this.y = y;
    this.empty = true;
    this.size = PIECE_SIZE;
    this.team;

    this.drawCircle = function() {
        ellipse(this.x, this.y, this.size, this.size);
    }
}

function fillBoardArray() {
    currentLetter = 0;
    for (var i = 0; i < height; i++) {
        if ((i - 41) % 80 == 0) {
            for (var j = 0; j < width; j++) {
                if ((j - 50) % 90 == 0) {
                    //j is x, i is y
                    temp[currentLetter] = new Point(j, i);
                    currentLetter++;
                }
            }

        }
    }
}

function switchColor(turn) {
    turn ? fill(250,0,0) : fill(0,0,0)
}

function switchTurn() {
    p1turn = !p1turn
    switchColor(p1turn);
}

function changeText() {
    var element = document.getElementById("prompt");

    if (gameOver) {
        element.innerHTML = "Game Over!" + (p1turn ? " Player 2" : " Player 1") + " Wins!";
        element.style.color = p1turn ? 'black' : 'red';
    }else {
        element.innerHTML = p1turn ? "Player 1 turn!" : "Player 2 turn!";
        element.style.color = p1turn ? "red" : "black"
    }
}

function resetButton() {
    var button = document.getElementById("reset");
    button.disabled = !gameOver;
    button.onclick = () => { history.go(0) };
}

function chkLine(a, b, c, d) {
    // Check first cell non-zero and all cells match
    return ((a.team != undefined) && (a.team == b.team) && (a.team == c.team) && (a.team == d.team));
}

function checkWinner(bd) {
    // Check down
    for (r = 0; r < 3; r++)
        for (c = 0; c < 7; c++)
            if (chkLine(bd[r][c], bd[r + 1][c], bd[r + 2][c], bd[r + 3][c]))
                return bd[r][c];

            // Check right
    for (r = 0; r < 6; r++)
        for (c = 0; c < 4; c++)
            if (chkLine(bd[r][c], bd[r][c + 1], bd[r][c + 2], bd[r][c + 3]))
                return bd[r][c];

            // Check down-right
    for (r = 0; r < 3; r++)
        for (c = 0; c < 4; c++)
            if (chkLine(bd[r][c], bd[r + 1][c + 1], bd[r + 2][c + 2], bd[r + 3][c + 3]))
                return bd[r][c];

            // Check down-left
    for (r = 3; r < 6; r++)
        for (c = 0; c < 4; c++)
            if (chkLine(bd[r][c], bd[r - 1][c + 1], bd[r - 2][c + 2], bd[r - 3][c + 3]))
                return bd[r][c];

    return 0;
}
