const canvas = document.querySelector('#etch-a-sketch');

const ctx = canvas.getContext('2d');
const shakeButton = document.querySelector('.shake');
const MOVE_AMOUNT = 25;

let hue = 0;
ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
const { width, height } = canvas;

let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);

ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = MOVE_AMOUNT;

ctx.beginPath();
ctx.moveTo(x, y);
ctx.lineTo(x, y);
ctx.stroke();

function draw({ key }) {
        // increment the hue
        hue += 5;
        ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
        console.log(key);
        ctx.beginPath();
        ctx.moveTo(x, y);
        
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

function handleKey(event) {
        if (event.key.includes('Arrow')) {
                event.preventDefault();
                draw({ key: event.key });
        }
}

//shake function
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
