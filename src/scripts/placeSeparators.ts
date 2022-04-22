import 'phaser'

export function placeSeparators(scene: Phaser.Scene, width: number, color: number, ...args: [number, number, number, number][]): void {
    let graphics = scene.add.graphics({ lineStyle: { width: 3, color: color } });

    for (let arg in args) {
        let separator = new Phaser.Geom.Line(...args[arg])
        graphics.strokeLineShape(separator)
    }
}