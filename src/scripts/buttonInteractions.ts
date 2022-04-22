import 'phaser'

export function hoverFunction(scene: Phaser.Scene, x: number, y: number, index: string, sprite: number) {
    scene.add.image(x, y, index, sprite);
}