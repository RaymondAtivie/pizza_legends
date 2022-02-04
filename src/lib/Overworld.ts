import GameObject from './GameObject'
import Assets from './utils/Assets'

type OverworldConfig = {
	element: HTMLElement | null
}

class Overworld {
	element: HTMLElement
	canvas: HTMLCanvasElement
	ctx: CanvasRenderingContext2D

	constructor(config: OverworldConfig) {
		if (config.element == null) throw new Error('Overworld element must not be null')

		console.log('Constructing overworld')

		this.element = config.element
		this.canvas = this.element.querySelector('canvas')!
		this.ctx = this.canvas.getContext('2d')!
	}

	init() {
		console.log('Hello from the overworld', this)

		const image = new Image()
		image.onload = () => {
			this.ctx.drawImage(image, 0, 0)
		}
		image.src = Assets.map.demo.lower

		//Place some GameObjects!
		const hero = new GameObject({
			x: 5,
			y: 6,
			src: Assets.characters.hero,
		})
		const npc1 = new GameObject({
			x: 9,
			y: 9,
			src: Assets.characters.npc1,
		})

		setTimeout(() => {
			hero.sprite.draw(this.ctx)
			npc1.sprite.draw(this.ctx)
		}, 0)
	}
}

export default Overworld
