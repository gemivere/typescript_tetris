import 'phaser';
import phaserControls from "./phaser3-controls-plugin/dist/phaserControlsPlugin.js"

const blockSize: number = 32; // px
const numBlocksX: number = 19; 
const numBlocksY: number = 19; // make a 19x19 grid

export const GAMEWIDTH: number = numBlocksX * blockSize;
export const MENUWIDTH: number = 300;
export const GAMEHEIGHT: number = numBlocksY*blockSize+blockSize

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
};