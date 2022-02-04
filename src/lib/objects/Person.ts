import { animationType } from './../Sprite'
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

	update(state: { arrow: MovementDirection }) {
		this.updatePosition()
		this.updateSprite(state)

		if (this.isPlayerCntrolled && this.movingProgressRemaining === 0 && state.arrow) {
			this.direction = state.arrow
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

	updateSprite(state: { arrow: MovementDirection }) {
		if (this.isPlayerCntrolled && this.movingProgressRemaining === 0 && !state.arrow) {
			this.sprite.setAnimation(utils.directionToAnimation(this.direction))
		}

		if (this.movingProgressRemaining > 0) {
			this.sprite.setAnimation(utils.directionToAnimation(this.direction, 'walk'))
		}
	}
}
