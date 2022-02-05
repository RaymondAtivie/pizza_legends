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

		if (direction === MovementDirection.Left) {
			x -= size
		} else if (direction === MovementDirection.Right) {
			x += size
		} else if (direction === MovementDirection.Up) {
			y -= size
		} else if (direction === MovementDirection.Down) {
			y += size
		}

		return { x, y }
	}

	static directionToAnimation = (direction: MovementDirection, type: 'walk' | 'idle' = 'idle'): animationType => {
		const idleMapping = {
			[MovementDirection.Up]: animationType.idleUp,
			[MovementDirection.Down]: animationType.idleDown,
			[MovementDirection.Left]: animationType.idleLeft,
			[MovementDirection.Right]: animationType.idleRight,
		}

		const walkMapping = {
			[MovementDirection.Up]: animationType.walkUp,
			[MovementDirection.Down]: animationType.walkDown,
			[MovementDirection.Left]: animationType.walkLeft,
			[MovementDirection.Right]: animationType.walkRight,
		}

		return type === 'idle' ? idleMapping[direction] : walkMapping[direction]
	}
}
