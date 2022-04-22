import Phaser from 'phaser'

// ANCHOR global variables
const blockSize: number = 32
const BLOCKTYPES: number = 7
const numBlocksX: number = 19; 
const numBlocksY: number = 19; // make a 19x19 grid

// @ts-ignore
export default new Phaser.Class({
    Extends: Phaser.GameObjects.Sprite,

    initialize:

    function tetromino(cells: object, game: Phaser.Scene) {
        this.shape = Phaser.Math.Between(0, 6);
        this.color = Phaser.Math.Between(0, 6);

        this.game = game;
        this.cells = cells;
        this.sprites= [];

        this.blocksPerTetromino = 4;

        // the positions of each block of a tetromino with respect to its center (in cell coordinates)
        this.offsets = {
            0 : [[0,-1],[0,0],[0,1],[1,1]], // L
            1 : [[0,-1],[0,0],[0,1],[-1,1]], // J
            2 : [[-1,0],[0,0],[1,0],[2,0]], // I
            3 : [[-1,-1],[0,-1],[0,0],[-1,0]], // 0
            4 : [[-1,0],[0,0],[0,-1],[1,-1]],// S
            5 : [[-1,0],[0,0],[1,0],[0,1]], // T
            6 : [[-1,-1],[0,-1],[0,0],[1,0]] // Z
        };
    },

    preload: function() {
        this.load.spritesheet('blocks', 'assets/blocks.png', { frameWidth: blockSize, frameHeight: blockSize, endFrame: BLOCKTYPES+1})
    },

    /**
     * makes the tetromino appear, either in the scene or on the right
     * @param cx x coordinate of the sprites center
     * @param cy y coordinate of the sprites center
     * @param inGame spawns the tetromino in the scene if true, on the right if false
     */
    materialize: function(cx: number, cy: number, inGame: boolean, game: Phaser.Scene) {
        this.center = [cx, cy];

        for (let j in this.sprites) {
            this.sprites[j].destroy();
        }

        let conflict: boolean = false; // if true -> game over

        // generates four  blocks
        for (let i = 0; i < this.blocksPerTetromino; i++) {
            // compute the coordinates of each block using its offset from the center
            const x: number = cx + this.offsets[this.shape][i][0];
            const y: number = cy + this.offsets[this.shape][i][1];

            let sprite: Phaser.GameObjects.Sprite = game.add.sprite(x * blockSize, y * blockSize, 'blocks', this.color);
            this.sprites.push(sprite);
            this.cells[x][y]["occupied"] = true;
            this.cells[x][y]["color"] = this.color;

            if (inGame && !this.validateCoordinates(x, y)) {
                conflict = true;
            }
        }
    },

    validateCoordinates: function(newx: number, newy: number) {
        if (newx < 0 || newx > numBlocksX - 1) {
            console.log(`x: ${newx} Out of X bounds`);
            return false;
        };

        if (newy < 0 || newy > numBlocksY - 1) {
            console.log(`y: ${newy} Out of Y bounds`);
            return false;
        };

        if (this.cells[newx][newy]["occupied"]) {
            console.log(`${newx}:${newy} is occupied`);
            return false;
        }

        return true;
    }
})