var numsquares = 6;
var chances = 3;
var colors = generateRandomColors(numsquares);
var squares = document.querySelectorAll(".square");
var pickedColor = pickColor();
var colorDisplay = document.querySelector("#colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelectorAll("h1");
var resetButton = document.querySelector("#reset");
var easyBtn = document.querySelector("#easy");
var hardBtn = document.querySelector("#hard");
var chanceDisplay = document.querySelector("#chances");
var dispRules = document.querySelector("#rules");

colorDisplay.textContent = pickedColor;
chanceDisplay.textContent = "Chances left:  "+chances;

function changeColors(color) {
    for (var i = 0; i < squares.length; i++) {
        squares[i].style.background = color;
    }
}
function setHFColor(color) {
    for (var i = 0;i < h1.length; i++) {
        h1[i].style.background = color;
    }
}

function pickColor() {
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

function generateRandomColors(num) {
    var arr = [];
    for (var i = 0; i < num; i++) {
        arr.push(randomColor());
    }
    return arr;
}

function randomColor() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + ", " + g + ", " + b + ")";
}

dispRules.addEventListener("click", function() {
    var msg="RULES\n";
    msg += "1.This game is all about testing your RGB Color Code knowledge.\n";
    msg += "2. There are two modes EASY and HARD.\n";
    msg += "3. In EASY mode, you get 3 boxes to guess from and have 2 chances to select the right color.\n";
    msg += "4. In HARD mode,you get 6 boxes to guess from and have 3 chances to select the right color.\n";
    msg += "5. If you select the right color within the given the number of chances you win and may use the PLAY AGAIN button\n";
    msg += "6. To change colors on the screen, you msy use NEW COLORS button.\n";
    alert(msg);
})

resetButton.addEventListener("click", function () {
    colors = generateRandomColors(numsquares);
    resetButton.textContent = "New Colors";
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;
    if(numsquares==6) {
        chances = 3;
    } else {
        chances = 2;
    }
    chanceDisplay.textContent = "Chances left:  "+chances;
    messageDisplay.textContent = " ";
    for (var i = 0; i < squares.length; i++) {
        squares[i].style.background = colors[i];
    }
    setHFColor("steelblue");
});

easyBtn.addEventListener("click", function () {
    easyBtn.classList.add("selected");
    hardBtn.classList.remove("selected");
    numsquares = 3;chances= 2;
    colors = generateRandomColors(numsquares);
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;
    chanceDisplay.textContent = "Chances left:  "+chances;
    setHFColor("steelblue");
    resetButton.textContent = "New Colors";
    for(var i=0 ; i<squares.length; i++) {
        if(colors[i]) {
            squares[i].style.background = colors[i];
        } else {
            squares[i].style.display = "none";
        }
    }
});

hardBtn.addEventListener("click", function () {
    hardBtn.classList.add("selected");
    easyBtn.classList.remove("selected");
    numsquares = 6;chances = 3;
    resetButton.textContent = "New Colors";
    colors = generateRandomColors(numsquares);
    pickedColor = pickColor();
    setHFColor("steelblue");
    colorDisplay.textContent = pickedColor;
    chanceDisplay.textContent = "Chances left:  "+chances;
    for(var i=0 ; i<squares.length; i++) {
            squares[i].style.background = colors[i];
            squares[i].style.display = "block";
        }
});

for (var i = 0; i < squares.length; i++) {
    squares[i].style.background = colors[i];
    squares[i].addEventListener("click", function () {
        var clickedColor = this.style.background;
        if (clickedColor === pickedColor) {
            chances--;
            messageDisplay.textContent = "Congratulations! You got it right.";
            changeColors(clickedColor);
            setHFColor(clickedColor);
            resetButton.textContent = "Play Again!";
        } else {
            resetButton.textContent = "New Colors";
            chances--;
            this.style.background = "#232323";
            messageDisplay.textContent = "Try Again!";
            if(chances>0) {
                chanceDisplay.textContent = "Chances left:  "+chances;
            } else {
                messageDisplay.textContent = "Game Over!";
                changeColors(pickedColor);
                h1.style.background = pickedColor;
                chanceDisplay.textContent = "Chances left:  "+chances;
                resetButton.textContent = "Play Again!";
            }
        }
    });
}
