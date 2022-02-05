import { BehaviorEvent } from '../objects/GameObject'
import OverworldMap from '../OverworldMap'

export type OverworldEventConfig = {
	map: OverworldMap
	event: BehaviorEvent
}

export default class OverworldEvent {
	map: OverworldMap
	event: BehaviorEvent

	constructor(config: OverworldEventConfig) {
		this.map = config.map
		this.event = config.event
	}

	init() {
		return new Promise((resolve) => {
			this[this.event.type](resolve)
		})
	}

	stand(resolve: any) {
		const whoId = this.event.who
		if (whoId) {
			const who = this.map.gameObjects[whoId]
			who.startBehaviour({})
		}
	}

	walk(resolve: any) {}
}
