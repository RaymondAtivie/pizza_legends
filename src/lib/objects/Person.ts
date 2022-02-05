import utils from '../utils/utils'
import GameObject, { GameObjectConfig, MovementDirection } from './GameObject'
import OverworldMap from '../OverworldMap'

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
			[MovementDirection.Up]: ['y', -1],
			[MovementDirection.Down]: ['y', 1],
			[MovementDirection.Left]: ['x', -1],
			[MovementDirection.Right]: ['x', 1],
		}
	}

	update(state: { arrow: MovementDirection; map: OverworldMap }) {
		if (this.movingProgressRemaining) {
			this.updatePosition()
		} else {
			//TODO: More cases for starting to walk
			//
			//

			// Case: we're keyboard ready and have an arrow pressed
			if (this.isPlayerCntrolled && state.arrow) {
				this.startBehaviour(state, {
					type: 'walk',
					direction: state.arrow,
				})
			}

			this.updateSprite()
		}
	}

	startBehaviour(state: { arrow: MovementDirection; map: OverworldMap }, behavior: any) {
		// TODO: Change behavior to its own type

		// Set the character direction to whatever behavior hass
		this.direction = behavior.direction

		if (behavior.type == 'walk') {
			//Stop if the space is not free
			if (state.map.isSpaceTaken(this.x, this.y, this.direction)) return

			// Ready to Walk
			state.map.moveWall(this.x, this.y, this.direction)
			this.movingProgressRemaining = utils.gridSize
		}
	}

	updatePosition() {
		const [axis, change] = this.directionUpdate[this.direction]
		this[axis] += change
		this.movingProgressRemaining--
	}

	updateSprite() {
		if (this.movingProgressRemaining > 0) {
			this.sprite.setAnimation(utils.directionToAnimation(this.direction, 'walk'))
			return
		}

		this.sprite.setAnimation(utils.directionToAnimation(this.direction, 'idle'))
	}
}
