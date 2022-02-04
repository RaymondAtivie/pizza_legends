import utils from '../utils/utils'
import GameObject, { GameObjectConfig, MovementDirection } from './GameObject'

interface PersonConfig extends GameObjectConfig {
	isPlayerCntrolled?: boolean
}

export default class Person extends GameObject {
	movingProgressRemaining: number
	directionUpdate: { [key in MovementDirection]: ['x' | 'y', number] }
	isPlayerCntrolled = false

	constructor(config: PersonConfig) {
		super(config)

		this.movingProgressRemaining = 0

		this.isPlayerCntrolled = config.isPlayerCntrolled || false

		this.directionUpdate = {
			[MovementDirection.UP]: ['y', -1],
			[MovementDirection.DOWN]: ['y', 1],
			[MovementDirection.LEFT]: ['x', -1],
			[MovementDirection.RIGHT]: ['x', 1],
		}
	}

	update({ arrow }: any) {
		this.updatePosition()

		if (this.isPlayerCntrolled && this.movingProgressRemaining === 0 && arrow) {
			this.direction = arrow
			this.movingProgressRemaining = utils.gridSize
		}
	}

	updatePosition() {
		if (this.movingProgressRemaining) {
			const [axis, change] = this.directionUpdate[this.direction]

			this[axis] += change
			this.movingProgressRemaining--
		}
	}
}
