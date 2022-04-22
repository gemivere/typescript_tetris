import 'phaser';
import phaserControls from "./phaser3-controls-plugin/dist/phaserControlsPlugin.js"

import Menu from './scenes/menu';
import Tetris from './scenes/tetris'
import Leaderboard from './scenes/leaderboard'
import Pause from './scenes/pause'

export const blockSize: number = 32; // px
export const numBlocksX: number = 19; 
export const numBlocksY: number = 19; // make a 19x19 grid

export const GAMEWIDTH: number = numBlocksX * blockSize;
export const MENUWIDTH: number = 300;
export const GAMEHEIGHT: number = numBlocksY*blockSize+blockSize

export const PM_FONT: object = {
  fontFamily: '"Permanent Marker"',
  fontSize: 64
};
export const ASO_FONT: object = {
  fontFamily: '"Alfa Slab One"',
  fontSize: 64
};

export let config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: GAMEWIDTH+MENUWIDTH,
  height: GAMEHEIGHT,
  parent: 'game',
  dom: {
      createContainer: true,
  },
  plugins: {
    scene: [
      {key: 'phaserControls', plugin: phaserControls, mapping: 'controls'},
    ]
  },
  scene: [
    Menu,
    Tetris,
    Pause,
    Leaderboard,
  ]
};