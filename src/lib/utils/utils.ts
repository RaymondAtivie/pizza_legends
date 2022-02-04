export default class utils {
	static gridSize = 16

	static withGrid = (c: number): number => {
		return c * utils.gridSize
	}
}
