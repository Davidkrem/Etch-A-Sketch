// TO DO LIST

// Select elements on the page- canvas, shake buttons
const canvas = document.querySelector('#etch-a-sketch');
// const ctx which is the name for "context"
const ctx = canvas.getContext('2d');
const shakeButton = document.querySelector('.shake');
const MOVE_AMOUNT = 25;

let hue = 0;
ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
// Setup our canvas for drawing
// make a variable called height and width from the same properties on our canvas

const { width, height } = canvas;

// create random x and y starting points on the canvas
let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);

ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = MOVE_AMOUNT;

ctx.beginPath(); // start the drawing
ctx.moveTo(x, y);
ctx.lineTo(x, y);
ctx.stroke();
// write a draw function

// destructured to turn property into variable
function draw({ key }) {
        // increment the hue
        hue += 5;
        ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
        console.log(key);
        ctx.beginPath();
        ctx.moveTo(x, y);
        // move our x and y values depending on what the user did
        switch (key) {
                case 'ArrowUp':
                        y -= MOVE_AMOUNT;
                        break;
                case 'ArrowRight':
                        x += MOVE_AMOUNT;
                        break;
                case 'ArrowDown':
                        y += MOVE_AMOUNT;
                        break;
                case 'ArrowLeft':
                        x -= MOVE_AMOUNT;
                        break;
                default:
                        break;
        }
        ctx.lineTo(x, y);
        ctx.stroke();
}

// write a handler function

function handleKey(event) {
        if (event.key.includes('Arrow')) {
                event.preventDefault();
                draw({ key: event.key });
        }
}

// clean/ shake function
function clearCanvas() {
        canvas.classList.add('shake');
        ctx.clearRect(0, 0, width, height);
        canvas.addEventListener(
                'animationend',
                function () {
                        console.log('Done the SHAKE!');
                        canvas.classList.remove('shake');
                },
                { once: true }
        );
}

// listen for arrow keys
window.addEventListener('keydown', handleKey);
shakeButton.addEventListener('click', clearCanvas);
