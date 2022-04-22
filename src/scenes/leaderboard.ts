import 'phaser'

import { GAMEWIDTH, GAMEHEIGHT, MENUWIDTH } from '../config'

import WebFontFile from '../scripts/fontLoader';

// @ts-ignore
export default new Phaser.Class({
    Extends: Phaser.Scene,

    initialize:

    function leaderboard() {
        Phaser.Scene.call(this, 'Leaderboard')
    },

    preload: function(): void {

    },

    create: function(): void {

    },

    update: function(): void {

    }
})