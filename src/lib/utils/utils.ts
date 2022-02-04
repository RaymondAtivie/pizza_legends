import { MovementDirection } from '../objects/GameObject'
import { animationType } from '../Sprite'

export default class utils {
	static gridSize = 16
	static defaultFrameLimit = 8

	static withGrid = (c: number): number => {
		return c * utils.gridSize
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
