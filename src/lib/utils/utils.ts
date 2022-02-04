import { MovementDirection } from '../objects/GameObject'
import { animationType } from '../Sprite'

export default class utils {
	static gridSize = 16
	static yCameraNudge = 6
	static xCameraNudge = 10.5
	static defaultFrameLimit = 5

	static withGrid = (c: number): number => {
		return c * utils.gridSize
	}

	static asGridCoord = (x: number, y: number): string => {
		return `${x * 16},${y * 16}`
	}

	static nextPosition(initialX: number, initialY: number, direction: MovementDirection): Record<string, number> {
		let x = initialX
		let y = initialY
		const size = utils.gridSize

		if (direction === MovementDirection.LEFT) {
			x -= size
		} else if (direction === MovementDirection.RIGHT) {
			x += size
		} else if (direction === MovementDirection.UP) {
			y -= size
		} else if (direction === MovementDirection.DOWN) {
			y += size
		}

		return { x, y }
	}

	static directionToAnimation = (direction: MovementDirection, type: 'walk' | 'idle' = 'idle'): animationType => {
		const idleMapping = {
			[MovementDirection.UP]: animationType.idleUp,
			[MovementDirection.DOWN]: animationType.idleDown,
			[MovementDirection.LEFT]: animationType.idleLeft,
			[MovementDirection.RIGHT]: animationType.idleRight,
		}

		const walkMapping = {
			[MovementDirection.UP]: animationType.walkUp,
			[MovementDirection.DOWN]: animationType.walkDown,
			[MovementDirection.LEFT]: animationType.walkLeft,
			[MovementDirection.RIGHT]: animationType.walkRight,
		}

		return type === 'idle' ? idleMapping[direction] : walkMapping[direction]
	}
}
