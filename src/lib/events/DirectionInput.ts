import { MovementDirection } from './../objects/GameObject'
export default class DirectionInput {
	heldDirections: MovementDirection[] = []
	map: Record<string, MovementDirection>

	constructor() {
		this.heldDirections = []

		this.map = {
			ArrowUp: MovementDirection.UP,
			keyW: MovementDirection.UP,
			ArrowDown: MovementDirection.DOWN,
			KeyS: MovementDirection.DOWN,
			ArrowLeft: MovementDirection.LEFT,
			KeyA: MovementDirection.LEFT,
			ArrowRight: MovementDirection.RIGHT,
			KeyD: MovementDirection.RIGHT,
		}
	}

	get direction(): MovementDirection | undefined {
		return this.heldDirections[0]
	}

	init() {
		const handleKeyDown = (e: KeyboardEvent) => {
			const dir = this.map[e.code]

			if (dir && !this.heldDirections.includes(dir)) {
				this.heldDirections.unshift(dir)

				console.log(this.heldDirections)
			}
		}
		const handleKeyUp = (e: KeyboardEvent) => {
			const dir = this.map[e.code]

			const index = this.heldDirections.indexOf(dir)
			if (index != -1) {
				this.heldDirections.splice(index, 1)
				console.log(this.heldDirections)
			}
		}

		document.addEventListener('keydown', handleKeyDown)
		document.addEventListener('keyup', handleKeyUp)
	}
}
