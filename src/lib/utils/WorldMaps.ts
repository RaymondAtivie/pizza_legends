import GameObject from '../objects/GameObject'
import Assets from './Assets'
import utils from './utils'

export enum WorldMapType {
	DemoRoom = 'DemoRoom',
	Kitchen = 'Kitchen',
}

export type WorldMap = {
	lowerSrc: string
	upperSrc: string
	gameObjects: Record<string, GameObject>
}

export default {
	[WorldMapType.DemoRoom]: {
		lowerSrc: Assets.map.demo.lower,
		upperSrc: Assets.map.demo.upper,
		gameObjects: {
			hero: new GameObject({
				x: utils.withGrid(4),
				y: utils.withGrid(6),
				src: Assets.characters.hero,
			}),
			npc1: new GameObject({
				x: utils.withGrid(8),
				y: utils.withGrid(9),
				src: Assets.characters.npc1,
			}),
		},
	},
	[WorldMapType.Kitchen]: {
		lowerSrc: Assets.map.kitchen.lower,
		upperSrc: Assets.map.kitchen.upper,
		gameObjects: {
			npcA: new GameObject({
				x: utils.withGrid(3),
				y: utils.withGrid(5),
				src: Assets.characters.npc3,
			}),
			npcB: new GameObject({
				x: utils.withGrid(9),
				y: utils.withGrid(6),
				src: Assets.characters.npc4,
			}),
		},
	},
} as Record<WorldMapType, WorldMap>
