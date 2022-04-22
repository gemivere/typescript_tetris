import Phaser from 'phaser';

import { config } from './config';

import Menu from './scenes/menu';
import Tetris from './scenes/tetris'
import Leaderboard from './scenes/leaderboard'
import Pause from './scenes/pause'

//config.scene = [Menu, Tetris, Pause, Leaderboard]
config.scene = [Tetris]

export default new Phaser.Game(config);