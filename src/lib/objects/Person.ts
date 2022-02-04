import GameObject, { GameObjectConfig, MovementDirection } from './GameObject'

export default class Person extends GameObject {
	movingProgressRemaining: number
	directionUpdate: { [key in MovementDirection]: ['x' | 'y', number] }

	constructor(config: GameObjectConfig) {
		super(config)

		this.movingProgressRemaining = 16

		this.directionUpdate = {
			[MovementDirection.UP]: ['y', -1],
			[MovementDirection.DOWN]: ['y', 1],
			[MovementDirection.LEFT]: ['x', -1],
			[MovementDirection.RIGHT]: ['x', 1],
		}
	}

	update() {
		this.updatePosition()
	}

	updatePosition() {
		if (this.movingProgressRemaining) {
			console.log('Please move')
			const [axis, change] = this.directionUpdate[this.direction]

			this[axis] += change
			this.movingProgressRemaining--
		}
	}
}
