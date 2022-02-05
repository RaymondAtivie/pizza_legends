import { MovementDirection } from './../objects/GameObject'
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
			fireball: new Person({
				x: utils.withGrid(1),
				y: utils.withGrid(6),
				src: Assets.icons.chill,
			}),
			npc1: new Person({
				x: utils.withGrid(8),
				y: utils.withGrid(8),
				src: Assets.characters.npc1,
				behaviourLoop: [
					{ type: 'stand', direction: MovementDirection.Left, time: 800 },
					{ type: 'stand', direction: MovementDirection.Up, time: 800 },
					{ type: 'stand', direction: MovementDirection.Right, time: 800 },
					{ type: 'stand', direction: MovementDirection.Up, time: 800 },
				],
			}),
			npc2: new Person({
				x: utils.withGrid(3),
				y: utils.withGrid(7),
				src: Assets.characters.npc2,
				behaviourLoop: [
					{ type: 'walk', direction: MovementDirection.Left },
					{ type: 'stand', direction: MovementDirection.Up, time: 800 },
					{ type: 'walk', direction: MovementDirection.Up },
					{ type: 'walk', direction: MovementDirection.Right },
					{ type: 'walk', direction: MovementDirection.Down },
				],
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
			npcB: new Person({
				x: utils.withGrid(5),
				y: utils.withGrid(6),
				src: Assets.characters.npc4,
			}),
			npcC: new Person({
				x: utils.withGrid(9),
				y: utils.withGrid(6),
				src: Assets.characters.npc2,
			}),
			hero: new Person({
				x: utils.withGrid(4),
				y: utils.withGrid(5),
				src: Assets.characters.hero,
				isPlayerCntrolled: true,
			}),
		},
	},
} as Record<WorldMapType, WorldMap>
