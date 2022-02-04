import GameObject, { GameObjectConfig } from './GameObject'

export default class Person extends GameObject {
	movingProgressRemaining: number

	constructor(config: GameObjectConfig) {
		super(config)

		this.movingProgressRemaining = 16
	}
}
