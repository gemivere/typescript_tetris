/// <reference path="../config.ts" />
import 'phaser'
import { GAMEWIDTH, GAMEHEIGHT, MENUWIDTH } from '../config'

import WebFontFile from '../scripts/fontLoader';
import { hoverFunction } from '../scripts/buttonInteractions';
import { placeSeparators } from '../scripts/placeSeparators';

// ANCHOR global variables
const blockSize: number = 32; // px
const numBlocksX: number = 19; 
const numBlocksY: number = 19; // make a 19x19 grid

// const GAMEWIDTH: number = numBlocksX * blockSize;
// const MENUWIDTH: number = 300;
// const GAMEHEIGHT: number = numBlocksY*blockSize+blockSize

const PM_FONT: object = {
  fontFamily: '"Permanent Marker"',
  fontSize: 64
};
const ASO_FONT: object = {
  fontFamily: '"Alfa Slab One"',
  fontSize: 64
};

// ANCHOR local variables

const BUTTON_INDEX: string = 'button';
const X_CENTER: number = (GAMEWIDTH + MENUWIDTH) / 2;
const BUTTON_Y: number = 400;

// @ts-ignore
export default new Phaser.Class({
    Extends: Phaser.Scene,

    initialize:

    /**
     * initializes the scene and variables unique to the scene
     */
    function menu(): void {
        Phaser.Scene.call(this, 'Menu');
    },

    /**
     * preloads assets for the scene
     */
    preload: function(): void {
        this.load.addFile(new WebFontFile(this.load, 'Permanent Marker'))

        this.load.spritesheet('button', 'assets/menu_spritesheet.png', { frameWidth: 224, frameHeight: 34 });

        this.load.html('game', 'assets/game.html');
    },

    create: function(): void {
        const welcome = this.add.text(X_CENTER, 100, 'WELCOME', PM_FONT).setOrigin(0.5);

        placeSeparators(
            this, 3, 0xffffff,
            [1.5, 0, 0, GAMEHEIGHT],
            [GAMEWIDTH + MENUWIDTH - 3, 0, GAMEWIDTH + MENUWIDTH - 3, GAMEHEIGHT])

        let button = this.add.image(X_CENTER, BUTTON_Y, BUTTON_INDEX, 0)
        button.setOrigin(0.5)
        button.setInteractive()

        button.on('pointerout', () => {
            return hoverFunction(this, X_CENTER, BUTTON_Y, BUTTON_INDEX, 0)
        });
        button.on('pointerover', () => {
            return hoverFunction(this, X_CENTER, BUTTON_Y, BUTTON_INDEX, 4)
        })
        button.on('pointerdown', () => {
            this.scene.start('Tetris');
            this.scene.shutdown();
        })

        let element = this.add.dom(0, 0).createFromCache('game');
        element.setOrigin(0);

        element.getChildByID('keys').setDisplay = "flex";
        element.getChildByID('cup').setDisplay = "block";
    },

    update: function(): void {
        const inputs: string[] = ['rotateleft', 'rotateright', 'moveleft', 'moveright', 'movedown', 'pause']

        for (let i = 0; i < inputs.length; i++) {
            const element = document.getElementById(inputs[i]);
            element!.addEventListener("keydown", function(this, ev) {
                const inputElement = document.getElementById(this.id) as HTMLInputElement;
                inputElement.value = ev.key.toUpperCase();
            })
        }
    }
})
