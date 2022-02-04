import GameObject from '../objects/GameObject'
import Person from '../objects/Person'
import Assets from './Assets'
import utils from './utils'

export enum WorldMapType {
	DemoRoom = 'DemoRoom',
	Kitchen = 'Kitchen',
}

export type WallCoord = Record<string, boolean>

export type WorldMap = {
	lowerSrc: string
	upperSrc: string
	gameObjects: Record<string, GameObject>
	walls?: WallCoord
}

export default {
	[WorldMapType.DemoRoom]: {
		lowerSrc: Assets.map.demo.lower,
		upperSrc: Assets.map.demo.upper,
		gameObjects: {
			hero: new Person({
				x: utils.withGrid(4),
				y: utils.withGrid(5),
				src: Assets.characters.hero,
				isPlayerCntrolled: true,
			}),
			npc1: new Person({
				x: utils.withGrid(8),
				y: utils.withGrid(8),
				src: Assets.characters.npc1,
			}),
		},
		walls: {
			[utils.asGridCoord(7, 6)]: true,
			[utils.asGridCoord(8, 6)]: true,
			[utils.asGridCoord(7, 7)]: true,
			[utils.asGridCoord(8, 7)]: true,
		},
	},
	[WorldMapType.Kitchen]: {
		lowerSrc: Assets.map.kitchen.lower,
		upperSrc: Assets.map.kitchen.upper,
		gameObjects: {
			npcA: new Person({
				x: utils.withGrid(3),
				y: utils.withGrid(5),
				src: Assets.characters.npc3,
			}),
			npcB: new Person({
				x: utils.withGrid(5),
				y: utils.withGrid(6),
				src: Assets.characters.npc4,
			}),
			npcC: new Person({
				x: utils.withGrid(9),
				y: utils.withGrid(6),
				src: Assets.characters.npc2,
				isPlayerCntrolled: true,
			}),
		},
	},
} as Record<WorldMapType, WorldMap>
