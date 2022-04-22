import 'phaser'

import WebFontFile from '../scripts/fontLoader';
import { placeSeparators } from '../scripts/placeSeparators';

import Tetromino from '../objects/tetromino'

// ANCHOR global variables
const blockSize: number = 32; // px
const numBlocksX: number = 19; 
const numBlocksY: number = 19; // make a 19x19 grid

const GAMEWIDTH: number = numBlocksX * blockSize;
const MENUWIDTH: number = 300;
const GAMEHEIGHT: number = numBlocksY*blockSize+blockSize
const SCOREX: number = GAMEWIDTH + 90

const PM_FONT: object = {
  fontFamily: '"Permanent Marker"',
  fontSize: 64
};
const ASO_FONT: object = {
  fontFamily: '"Alfa Slab One"',
  fontSize: 64
};

// ANCHOR local variables
const BLOCKINDEX: string = 'block'
const SOUNDINDEX: string = 'sound'

const BLOCKTYPES: number = 7

// @ts-ignore
export default new Phaser.Class({
    Extends: Phaser.Scene,

    initialize:

    function tetris() {
        Phaser.Scene.call(this, 'Tetris')

        this.movementLag = 100;

        this.numNext = 1;
        this.occupied = 2

        this.tetromino;
        this.queue = [];
        this.gameOver = false;
        // cells requires an occupied boolean and a color. if occupied is false, then color is Null. there's an entry for each cell in the scene
        this.cells = {}

        this.controls;

        this.score = 0;
        this.increment = 50;
        this.completedLines = 0
        this.linesThreshold = 3;
        this.speedUp = 100;
        this.reward = 25;
        this.fallSpeed = 1000;

        // the y position of each tetromino (in cell coordinates)
        this.y_start = {
            0 : 1,
            1 : 1,
            2 : 0,
            3 : 1,
            4 : 1,
            5 : 0,
            6 : 1
        };

        // The amount of cells ([x,y]) by which the tetrominoes move in each direction
        this.move_offsets = {
            "left" : [-1,0],
            "down" : [0,1],
            "right" : [1,0]
        };
    },

    preload: function(): void {
        this.load.addFile(new WebFontFile(this.load, 'Permanent Marker'))
        this.load.addFile(new WebFontFile(this.load, 'Alfa Slab One'))

        this.load.spritesheet(BLOCKINDEX, 'assets/blocks.png', { frameWidth: blockSize, frameHeight: blockSize, endFrame: BLOCKTYPES+1 });
        this.load.spritesheet(SOUNDINDEX, 'assets/sound.png', { frameWidth: 32, frameHeight: 32 });

        this.load.audio('move', 'assets/sound/move.mp3', 'assets/sound/move.ogg');
        this.load.audio('win', 'assets/sound/win.mp3', 'assets/sound/win.ogg');
        this.load.audio('gameover', 'assets/sound/gameover.mp3', 'assets/sound/gameover.ogg');
        this.load.audio('music', 'assets/sound/tetris.mp3');

        this.load.html('game', 'assets/game.html')
    },

    create: function(): void {
        console.log('create')
        // NOTE necessary to get control information later
        let element = this.add.dom(0, 0).createFromCache('game');
        element.setOrigin(0);

        element.getChildByID('keys').style.display = "none";
        element.getChildByID('cup').style.display = "none";

        for (let i = 0; i < numBlocksX; i++) {
            for (let j = 0; j < numBlocksY; j++) {
                this.cells[i][j]["occupied"] = false;
                this.cells[i][j]["color"] = null;
            }
        };

        placeSeparators(this, 3, 0xffffff,
            [0, 0, 0, GAMEHEIGHT],
            [GAMEWIDTH, 0, GAMEWIDTH, GAMEHEIGHT],
            [GAMEWIDTH+MENUWIDTH-3, 0, GAMEWIDTH+MENUWIDTH-3, GAMEHEIGHT]);
        
        this.add.tileSprite(0, GAMEHEIGHT-blockSize, GAMEWIDTH, blockSize, BLOCKINDEX, 0).setOrigin(0.5)

        let sound = this.add.sprite(GAMEWIDTH, 0, SOUNDINDEX, 0).setOrigin(0);
        let music = this.sound.add('music');
        music.play();

        sound.setInteractive();
        sound.on('pointerdown', () => {
            if (!music.isPaused) {
                music.pause();
                sound.setTexture(SOUNDINDEX, 1)
            } else {
                music.play();
                sound.setTexture(SOUNDINDEX, 0)
            }
        });

        this.scoreTitle = this.add.text(GAMEWIDTH + 50, 0, 'Score', PM_FONT).setOrigin(0);
        let scoreText = this.add.text(SCOREX, 60, '0', ASO_FONT).setOrigin(0);

        const linesTitle = this.add.text(GAMEWIDTH + 50, 140, 'Lines', PM_FONT).setOrigin(0);
        let linesText = this.add.text(SCOREX, 200, '0', ASO_FONT).setOrigin(0);

        const nextTitle = this.add.text(GAMEWIDTH + 75, 300, 'Next', PM_FONT);

        this.manageTetrominos()
    },

    // ANCHOR functions
    /**
     * fills the queue and creates new tetrominos
     * calls gameOver if the new tetromino has a conflict
     */
    manageTetrominos: function(): void {
        while (this.queue.length < this.numNext + 1) {
            this.queue.unshift(new Tetromino(this.cells, this));
        }

        this.tetromino = this.queue.pop();

        const startx: number = Math.floor(numBlocksX / 2); //horizontal center
        const starty: number = this.y_start[this.tetromino.shape]; // y is determined by the shape

        const conflict = this.tetromino.materialize(startx, starty, true, this);
        if (conflict) {
            //gameOver()
        } else {
            //display the next tetromino
            for (let i in this.queue) {
                const sx = Math.floor((this.scoreTitle.x + this.scoreTitle.width / 2) / 32);
                const sy = 14;
                this.queue[i].materialize(sx, sy, false, this);
            }
        }
    },

    // ANCHOR update
    update: function(): void {
        console.log('update')
    }
})