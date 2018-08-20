function createDiv(x, y) {
    var div = document.createElement("div");
    div.style.position = "absolute";
    div.style.top = y + "px";
    div.style.left = x + "px";
    div.style.width = "20px";
    div.style.height = "20px";
    div.style.backgroundColor = "chartreuse";
//div.style.border = "1px solid red";
//return "<div style='position: absolute; top: " + y + "px; left: " + x + "px; width: 20px; height: 20px; background-color: chartreuse; border: 1px solid red'></div>"
    return div;
}

function createFields(count, dist) {
    var arr = new Array(count);
    for (var i = 0; i < count; i++) {
        arr[i] = new Array(count);
        for (var j = 0; j < count; j++) {
            arr[i][j] = createDiv(i * dist, j * dist);
            document.body.appendChild(arr[i][j]);
        }
    }
    return arr;
}


function startGame() {
    var arr = createFields(20, 24);
    var direction = "down";
    var snake = createSnake();
    document.addEventListener('keydown', function (event) {
        switch (event.keyCode) {
            case 40:
                if (snake[0].direction!=="up") {
                direction = "down";
                }
                break;
            case 38:
                if (snake[0].direction!=="down") {
                direction = "up";
                }
                break;

            case 39:
                if (snake[0].direction!=="right") {
                direction = "left";
                }
                break;
            case 37:
                if (snake[0].direction!=="left") {
                direction = "right";
                }
                break;
        }
    });
    var apple = createApel();

    var interval = setInterval(function () {
        changeSnakeCoordinats(snake, direction, apple);
        var coll = collisionCheck(snake);
        redrawAllField(arr);
        if (coll) {
            clearInterval(interval);
        }else {
            redrawSnake(arr, snake);
            redrawApple(arr, apple);
        }
    }, 200);
}

function createSnake() {
    let snake = [];
    var randPosition = {
        x: Math.round(Math.random() * 19),
        y: Math.round(Math.random() * (18 - 2) + 2)
    };
    snake.push(createSnakePart(randPosition.x, randPosition.y, "down"));
    snake.push(createSnakePart(randPosition.x, randPosition.y - 1, "down"));
    snake.push(createSnakePart(randPosition.x, randPosition.y - 2, "down"));
    return snake;
}

function createApel() {
    return {x: getRandomPosition().x, y: getRandomPosition().y}
}

function checkIfAppleOverlapsSnake(snake, apple) {
    var bool=false;
    snake.forEach(function (el) {
        if(el.x===apple.x||el.y===apple.y)
            bool=true;
    });
    return bool;
}

function redrawAllField(arr) {
    for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < arr[i].length; j++) {
            arr[i][j].style.backgroundColor = "chartreuse";
        }
    }
}

function changeSnakeCoordinats(snake, direction, apple) {
    var oldTailX = snake[snake.length - 1].x, oldTailY = snake[snake.length - 1].y,
        oldTailDir = snake[snake.length - 1].direction;

    for (var i = snake.length - 1; i > 0; i--) {
        snake[i].direction = snake[i - 1].direction;
        changeSnakePartCoordinats(snake[i]);
    }
    snake[0].direction = direction;
    changeSnakePartCoordinats(snake[0]);

    if (snake[0].x === apple.x && snake[0].y === apple.y) {
        snake.push(createSnakePart(oldTailX, oldTailY, oldTailDir));
        apple.x = getRandomPosition().x;
        apple.y = getRandomPosition().y;
        while (true){
            if(checkIfAppleOverlapsSnake(snake,apple)){
                apple.x = getRandomPosition().x;
                apple.y = getRandomPosition().y;
            } else break;
        }
    }

    function changeSnakePartCoordinats(part) {
        switch (part.direction) {
            case "down":
                part.y += 1;
                break;
            case "up":
                part.y -= 1;
                break;
            case "left":
                part.x += 1;
                break;
            case "right":
                part.x -= 1;
                break;
        }
    }
}

function collisionCheck(snake) {
    for (var i = 0; i < snake.length; i++) {
        for (var j = 0; j < snake.length; j++) {
            if ((i !== j && snake[i].x === snake[j].x && snake[i].y === snake[j].y) || snake[0].x > 19 || snake[0].y > 19 || snake[0].x < 0 || snake[0].y < 0) {
                alert("Game over!");
                return true;
            }
        }
    }
    return false;
}

function redrawSnake(fieldArr, snake) {
    for (var i = 1; i < snake.length; i++) {
        fieldArr[snake[i].x][snake[i].y].style.backgroundColor = "green";
    }
    fieldArr[snake[0].x][snake[0].y].style.backgroundColor = "brown";
}

function redrawApple(fieldArr, apple) {
    fieldArr[apple.x][apple.y].style.backgroundColor = "red";
}

function createSnakePart(x, y, direction) {
    return {
        x: x,
        y: y,
        direction: direction
    }
}

function getRandomPosition() {
    return {
        x: Math.round(Math.random() * (18 - 1) + 1),
        y: Math.round(Math.random() * (18 - 1) + 1)
    }
}

startGame();