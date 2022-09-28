class SnakePart {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

window.addEventListener('load', () => {
    const canvas = document.querySelector('canvas');

    canvas.width = 400;
    canvas.height = 400;

    const ctx = canvas.getContext('2d');

    const clearScreen = () => {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    clearScreen();

    const startGameBtn = document.getElementById('start-game');

    let xDirection = 0;
    let yDirection = 0;
    let score = 0;

    if (startGameBtn) {
        let timeout = null;

        startGameBtn.addEventListener('click', () => {
            if (timeout) {
                clearTimeout(timeout);
            }

            xDirection = 0;
            yDirection = 0;
            score = 0;

            const snakeParts = [];
            let tailLength = 1;

            let snakeColor = 'green';

            const colorInput = document.getElementById('color');

            if (colorInput) {
                snakeColor = colorInput.value;
            }

            let tileCount = 20;
            const tileSize = tileCount - 2;

            let speed = 7;

            const speedInput = document.getElementById('speed');

            if (speedInput) {
                speed = +speedInput.value;
            }

            let headX = Math.round(Math.random() * (tileCount - 1));
            let headY = Math.round(Math.random() * (tileCount - 1));

            const setSnakePosition = () => {
                headX += xDirection;
                headY += yDirection;
            };

            let appleX = 0;
            let appleY = 0;

            const isGameOver = () => {
                if(xDirection === 0 && yDirection === 0)
                    return false;

                if (headX < 0 || headX >= tileCount || headY < 0 || headY >= tileCount)
                    return true;

                for (const snakePart of snakeParts) {
                    if (snakePart.x === headX && snakePart.y === headY)
                        return true;
                }

                return false;
            };

            const setApplePosition = () => {
                appleX = Math.round(Math.random() * (tileCount - 1));
                appleY = Math.round(Math.random() * (tileCount - 1));

                if (appleX === headX && appleY === headY) {
                    if (headX <= Math.round(tileCount / 2)) {
                        appleX = headX + 4;
                    } else {
                        appleX = headX - 4;
                    }
                }
            }

            const drawSnake = () => {
                ctx.fillStyle = snakeColor;

                for (const snakePart of snakeParts) {
                    ctx.fillRect(snakePart.x * tileCount, snakePart.y * tileCount, tileSize, tileSize);
                }

                snakeParts.push(new SnakePart(headX, headY));

                while (snakeParts.length > tailLength) {
                    snakeParts.shift();
                }

                ctx.fillStyle = 'orange';
                ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
            };

            const drawApple = () => {
                ctx.fillStyle = 'red';
                ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize)
            };

            const drawScore = () => {
                ctx.fillStyle = 'white';
                ctx.font = '10px Roboto';
                ctx.fillText('Score: ' + score, canvas.width - 50, 10);
            };

            const drawGame = () => {
                setSnakePosition();

                if (isGameOver()) {
                    // const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);

                    // gradient.addColorStop(0, 'red');
                    // gradient.addColorStop(.5, 'green');
                    // gradient.addColorStop(1, 'blue');

                    ctx.fillStyle = 'white';

                    ctx.font = '50px Roboto';
                    ctx.fillText('Game Over!', canvas.width / 6.5, canvas.height / 2);

                    return;
                }

                clearScreen();
                drawSnake();

                if (appleX === headX && appleY === headY) {
                    score++;
                    tailLength++;
                    setApplePosition();
                }

                drawApple();
                drawScore();

                timeout = setTimeout(drawGame, 1000 / speed);
            };

            setApplePosition();
            drawGame();
        });
    }

    const goLeft = () => {
        if (xDirection !== 0) {
            return;
        }

        xDirection -= 1;
        yDirection = 0;
    }

    const goRight = () => {
        if (xDirection !== 0) {
            return;
        }

        xDirection += 1;
        yDirection = 0;
    }

    const goDown = () => {
        if (yDirection !== 0) {
            return;
        }

        xDirection = 0;
        yDirection += 1;
    }

    const goUp = () => {
        if (yDirection !== 0) {
            return;
        }

        xDirection = 0;
        yDirection -= 1;
    }

    document.body.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft') {
            goLeft();
            return;
        }

        if (event.key === 'ArrowRight') {
            goRight();
            return;
        }

        if (event.key === 'ArrowDown') {
            goDown();
            return;
        }

        if (event.key === 'ArrowUp') {
            goUp();
            return;
        }
    });

    const leftButton = document.getElementById('left-button');

    if(leftButton)
        leftButton.addEventListener('click', goLeft);

    const rightButton = document.getElementById('right-button');

    if(rightButton)
        rightButton.addEventListener('click', goRight);

    const upButton = document.getElementById('up-button');

    if(upButton)
        upButton.addEventListener('click', goUp);

    const downButton = document.getElementById('down-button');

    if(downButton)
        downButton.addEventListener('click', goDown);
});