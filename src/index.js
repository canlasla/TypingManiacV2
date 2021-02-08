// import Game from '/src/game';
import { wordArray } from '/src/wordsarray.js';
// var test = array;
var canvas = document.getElementById('gameScreen');
var ctx = canvas.getContext('2d');
canvas.width = canvas.getBoundingClientRect().width;
canvas.height = canvas.getBoundingClientRect().height;

const GAME_WIDTH = canvas.getBoundingClientRect().width;
const GAME_HEIGHT = canvas.getBoundingClientRect().height;

// let game = new Game(GAME_WIDTH, GAME_HEIGHT);
console.log(wordArray);

// var x = Math.floor(Math.random() * GAME_WIDTH - 50);
var word = wordArray[Math.floor(Math.random() * wordArray.length)];
var x = Math.floor(Math.random() * (GAME_WIDTH - ctx.measureText(word).width));
var y = 0;
let lastTime = 0;
function gameLoop(timestamp) {
	let deltaTime = timestamp - lastTime;
	lastTime = timestamp;

	ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

	// game.update(deltaTime);
	// game.draw(ctx);

	ctx.font = '20px Consolas';
	ctx.fillStyle = 'white';
	ctx.fillText(word, x, y);
	y += 10;

	if (y > GAME_HEIGHT) {
		x = Math.floor(Math.random() * (GAME_WIDTH - ctx.measureText(word).width));
		y = 0;

		word = wordArray[Math.floor(Math.random() * wordArray.length)];
	}
	requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
