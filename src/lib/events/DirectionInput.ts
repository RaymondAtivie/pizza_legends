import { MovementDirection } from './../objects/GameObject'
export default class DirectionInput {
	heldDirections: MovementDirection[] = []
	map: Record<string, MovementDirection>

	constructor() {
		this.heldDirections = []

		this.map = {
			ArrowUp: MovementDirection.Up,
			KeyW: MovementDirection.Up,
			ArrowDown: MovementDirection.Down,
			KeyS: MovementDirection.Down,
			ArrowLeft: MovementDirection.Left,
			KeyA: MovementDirection.Left,
			ArrowRight: MovementDirection.Right,
			KeyD: MovementDirection.Right,
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
			}
		}
		const handleKeyUp = (e: KeyboardEvent) => {
			const dir = this.map[e.code]

			const index = this.heldDirections.indexOf(dir)
			if (index != -1) {
				this.heldDirections.splice(index, 1)
			}
		}

		document.addEventListener('keydown', handleKeyDown)
		document.addEventListener('keyup', handleKeyUp)
	}
}
