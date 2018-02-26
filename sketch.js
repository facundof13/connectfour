var img;
var temp = [];
var p1turn = true;
var board = [];
var n;
var clicked = 0;
var lastRow;
var lastColumn;
var gameOver;
var canClick;

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


function click() {
    var date = new Date();
    var time = date.getTime();
    if (mouseIsPressed) {
        if (time - n > 250 || clicked == 0) {
            clicked = 1;
            var d = new Date();
            n = d.getTime();
            if (canClick) {
                if (mouseY <= height && mouseX > 0 && mouseX < width) {
                    if (mouseX > 542.5) {
                        dropPiece(6);
                    } else if (mouseX > 457.5) {
                        dropPiece(5);
                    } else if (mouseX > 361.5) {
                        dropPiece(4);
                    } else if (mouseX > 273.5) {
                        dropPiece(3);
                    } else if (mouseX > 185.5) {
                        dropPiece(2);
                    } else if (mouseX > 97.5) {
                        dropPiece(1);
                    } else if (mouseX < 97.5) {
                        dropPiece(0);
                    }
                }
            }
        }
    }
}

function dropPiece(column) {
    for (var i = 5; i >= 0; i--) {
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
    this.size = 70;
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

    if (turn) {
        fill(250, 0, 0);
    } else {
        fill(0, 0, 0);
    }
}

function switchTurn() {
    if (p1turn) {
        p1turn = false;
    } else {
        p1turn = true;
    }
    switchColor(p1turn);
}

function changeText() {
    var element = document.getElementById("prompt");
    if (gameOver) {
        element.innerHTML = "Game Over!" + (p1turn ? " Player 2" : " Player 1") + " Wins!";
        element.style.color = p1turn ? 'black' : 'red';
    }
    if (p1turn && !gameOver) {
        element.innerHTML = "Player 1 turn!";
        element.style.color = 'red';
    } else if (!gameOver) {
        element.innerHTML = "Player 2 turn!";
        element.style.color = 'black';
    }
}

function resetButton() {
    var button = document.getElementById("reset");
    button.disabled = true;
    if (gameOver) {
        button.disabled = false;
    }
    button.onclick = function() { history.go(0) };
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
