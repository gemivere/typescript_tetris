import 'phaser'

import { GAMEWIDTH, GAMEHEIGHT, MENUWIDTH } from '../config'

import WebFontFile from '../scripts/fontLoader';

// @ts-ignore
export default new Phaser.Class({
    Extends: Phaser.Scene,

    initialize:

    function tetris() {
        Phaser.Scene.call(this, 'Tetris')
    },

    preload: function(): void {

    },

    create: function(): void {

    },

    update: function(): void {

    }
})