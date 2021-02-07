// import Game from '/src/game';

var canvas = document.getElementById('gameScreen');
var ctx = canvas.getContext('2d');
canvas.width = canvas.getBoundingClientRect().width;
canvas.height = canvas.getBoundingClientRect().height;

const GAME_WIDTH = canvas.getBoundingClientRect().width;
const GAME_HEIGHT = canvas.getBoundingClientRect().height;

// let game = new Game(GAME_WIDTH, GAME_HEIGHT);

var x = 50;
var y = 50;
let lastTime = 0;
function gameLoop(timestamp) {
	let deltaTime = timestamp - lastTime;
	lastTime = timestamp;

	ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

	// game.update(deltaTime);
	// game.draw(ctx);

	ctx.font = '20px Consolas';
	ctx.fillStyle = 'white';
	ctx.fillText('Hello World', x, y);
	x++;
	y++;

	requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
