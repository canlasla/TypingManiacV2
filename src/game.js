import Word from '/src/word.js';
import Score from '/src/score.js';
import InputHandler from '/src/input.js';

import { wordArray } from '/src/wordsarray.js';

const GAMESTATE = {
	PAUSED: 0,
	RUNNING: 1,
	MENU: 2,
	GAMEOVER: 3,
};

export default class Game {
	constructor(gameWidth, gameHeight, ctx) {
		this.gameWidth = gameWidth;
		this.gameHeight = gameHeight;

		this.gamestate = GAMESTATE.MENU;
		this.scoreElement = new Score(this, ctx);
		this.speed = 1;
		this.gameObjects = [
			new Word(
				this,
				wordArray[Math.floor(Math.random() * wordArray.length)],
				ctx
			),
		];
		this.lives = 3;
		this.input = new InputHandler(this, ctx);
	}

	start(ctx) {
		if (
			this.gamestate !== GAMESTATE.MENU &&
			this.gamestate !== GAMESTATE.GAMEOVER
		)
			return;
		this.lives = 3;
		this.scoreElement.score = 0;
		this.gameObjects = [
			new Word(
				this,
				wordArray[Math.floor(Math.random() * wordArray.length)],
				ctx
			),
		];
		this.input.inputElement.value = '';
		this.gamestate = GAMESTATE.RUNNING;
	}

	update(deltaTime, ctx) {
		if (this.lives === 0) this.gamestate = GAMESTATE.GAMEOVER;

		if (
			this.gamestate === GAMESTATE.PAUSED ||
			this.gamestate === GAMESTATE.MENU ||
			this.gamestate === GAMESTATE.GAMEOVER
		)
			return;
		var i = 0;
		for (i = 0; i < this.gameObjects.length; i++) {
			var gone = this.gameObjects[i].update(deltaTime);

			if (gone) {
				this.gameObjects = this.gameObjects.filter((word) => !word.gone);
				this.gameObjects.push(
					new Word(
						this,
						wordArray[Math.floor(Math.random() * wordArray.length)],
						ctx
					)
				);
				if (Math.floor(Math.random() * 8) === 1) {
					this.gameObjects.push(
						new Word(
							this,
							wordArray[Math.floor(Math.random() * wordArray.length)],
							ctx
						)
					);
				}
			}

			if (this.input.inputElement.value == this.gameObjects[i].word) {
				this.gameObjects[i].gone = true;
				this.input.inputElement.value = '';
				this.scoreElement.score++;
			}
		}
	}

	draw(ctx) {
		[...this.gameObjects].forEach((object) => object.draw(ctx));

		this.scoreElement.draw(ctx);

		if (this.gamestate === GAMESTATE.PAUSED) {
			ctx.rect(0, 0, this.gameWidth, this.gameHeight);
			ctx.fillStyle = 'rgba(0,0,0,0.5)';
			ctx.fill();

			ctx.font = '30px Consolas';
			ctx.fillStyle = 'white';
			ctx.textAlign = 'center';
			ctx.fillText('Paused', this.gameWidth / 2, this.gameHeight / 2);
		}

		if (this.gamestate === GAMESTATE.MENU) {
			ctx.rect(0, 0, this.gameWidth, this.gameHeight);
			ctx.fillStyle = 'rgba(0,0,0,1)';
			ctx.fill();

			ctx.font = '50px Consolas';
			ctx.fillStyle = 'cyan';
			ctx.textAlign = 'center';
			ctx.fillText(
				'Typing Maniac',
				this.gameWidth / 2,
				this.gameHeight / 2 - 40
			);

			ctx.font = '25px Consolas';
			ctx.fillStyle = 'lime';
			ctx.textAlign = 'center';
			ctx.fillText(
				'Type the falling words to earn points',
				this.gameWidth / 2,
				this.gameHeight / 2
			);

			ctx.font = '25px Consolas';
			ctx.fillStyle = 'lime';
			ctx.textAlign = 'center';
			ctx.fillText(
				'You have three lives',
				this.gameWidth / 2,
				this.gameHeight / 2 + 30
			);

			ctx.font = '25px Consolas';
			ctx.fillStyle = 'yellow';
			ctx.textAlign = 'center';
			ctx.fillText(
				'Press CTRL To Start',
				this.gameWidth / 2,
				this.gameHeight / 2 + 60
			);

			ctx.font = '25px Consolas';
			ctx.fillStyle = 'yellow';
			ctx.textAlign = 'center';
			ctx.fillText(
				'Press ESC to pause',
				this.gameWidth / 2,
				this.gameHeight / 2 + 90
			);
		}
		if (this.gamestate === GAMESTATE.GAMEOVER) {
			ctx.rect(0, 0, this.gameWidth, this.gameHeight);
			ctx.fillStyle = 'rgba(0,0,0,1)';
			ctx.fill();

			ctx.font = '30px Consolas';
			ctx.fillStyle = 'red';
			ctx.textAlign = 'center';
			ctx.fillText('GAME OVER', this.gameWidth / 2, this.gameHeight / 2);

			ctx.font = '25px Consolas';
			ctx.fillStyle = 'cyan';
			ctx.textAlign = 'center';
			ctx.fillText(
				'Score: ' + this.scoreElement.score,
				this.gameWidth / 2,
				this.gameHeight / 2 + 40
			);

			ctx.font = '25px Consolas';
			ctx.fillStyle = 'lime';
			ctx.textAlign = 'center';
			ctx.fillText(
				'Press CTRL To Restart',
				this.gameWidth / 2,
				this.gameHeight - 10
			);
		}
	}

	togglePause() {
		if (this.gamestate == GAMESTATE.PAUSED) {
			this.gamestate = GAMESTATE.RUNNING;
		} else {
			this.gamestate = GAMESTATE.PAUSED;
		}
	}
}
