import Sprite from '../Sprite'
import Assets from '../utils/Assets'
import OverworldMap from '../OverworldMap'
import OverworldEvent from '../events/OverWorldEvent'

export enum MovementDirection {
	Up = 'Up',
	Down = 'Down',
	Left = 'Left',
	Right = 'Right',
}

export type GameObjectConfig = {
	x?: number
	y?: number
	src: string
	direction?: MovementDirection
	useShadow?: boolean
	behaviourLoop?: BehaviorEvent[]
}

export type BehaviorEvent = {
	type: 'walk' | 'stand'
	direction: MovementDirection
	time?: number
	who: string | number | null
}

class GameObject {
	id: string | number | null
	x: number
	y: number
	sprite: Sprite
	direction: MovementDirection
	isMounted: boolean
	behaviourLoop: BehaviorEvent[]
	behaviourLoopIndex: number

	constructor(config: GameObjectConfig) {
		this.id = null
		this.isMounted = false
		this.x = config.x || 0
		this.y = config.y || 0
		this.direction = config.direction || MovementDirection.Down
		this.sprite = new Sprite({
			gameObject: this,
			src: config.src || Assets.characters.hero,
			useShadow: config.useShadow === undefined ? true : config.useShadow,
		})

		this.behaviourLoop = config.behaviourLoop || []
		this.behaviourLoopIndex = 0
	}

	mount(map: OverworldMap) {
		console.log('Mounting - ' + this.sprite.image.src)
		this.isMounted = true

		map.addWall(this.x, this.y)

		// If we have a behaviour, kick off after a short delay
		setTimeout(() => {
			this.doBehaviourEvent(map)
		}, 100)
	}

	async doBehaviourEvent(map: OverworldMap) {
		// if (map.isCutscenePlaying || this.behaviourLoop.length === 0) return
		// //Setting up our event with relevant info
		// let eventConfig = this.behaviourLoop[this.behaviourLoopIndex]
		// eventConfig.who = this.id
		// // Create an event instance out of our next event config
		// const eventHander = new OverworldEvent({ map, event: eventConfig })
		// await eventHander.init()
		// // Setting the next event to fire
		// this.behaviourLoopIndex++
		// if (this.behaviourLoopIndex == this.behaviourLoop.length) {
		// 	this.behaviourLoopIndex = 0
		// }
		// //Do it again
		// this.doBehaviourEvent(map)
	}

	update(state: any) {}
}

export default GameObject
