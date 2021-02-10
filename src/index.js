import Game from 'https://canlasla.github.io/TypingManiacV2/src/game.js';

var canvas = document.getElementById('gameScreen');
var ctx = canvas.getContext('2d');
canvas.width = canvas.getBoundingClientRect().width;
canvas.height = canvas.getBoundingClientRect().height;

const GAME_WIDTH = canvas.getBoundingClientRect().width;
const GAME_HEIGHT = canvas.getBoundingClientRect().height;

let game = new Game(GAME_WIDTH, GAME_HEIGHT, ctx);

let lastTime = 0;
function gameLoop(timestamp) {
	setTimeout(function () {
		let deltaTime = timestamp - lastTime;
		lastTime = timestamp;

		ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

		game.update(deltaTime, ctx);
		game.draw(ctx);
		requestAnimationFrame(gameLoop);
	}, 60);
}

requestAnimationFrame(gameLoop);
