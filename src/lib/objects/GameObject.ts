import { WorldMap } from './../utils/WorldMaps'
import Sprite from '../Sprite'
import Assets from '../utils/Assets'
import OverworldMap from '../OverworldMap'

export enum MovementDirection {
	UP = 'Up',
	DOWN = 'Down',
	LEFT = 'Left',
	RIGHT = 'Right',
}

export type GameObjectConfig = {
	x?: number
	y?: number
	src: string
	direction?: MovementDirection
}

class GameObject {
	x: number
	y: number
	sprite: Sprite
	direction: MovementDirection
	isMounted: boolean

	constructor(config: GameObjectConfig) {
		this.isMounted = false
		this.x = config.x || 0
		this.y = config.y || 0
		this.direction = config.direction || MovementDirection.DOWN
		this.sprite = new Sprite({
			gameObject: this,
			src: config.src || Assets.characters.hero,
		})
	}

	mount(map: OverworldMap) {
		console.log('Mounting - ' + this.sprite.image.src)
		this.isMounted = true

		map.addWall(this.x, this.y)
	}

	update(state: any) {}
}

export default GameObject
