type GameObjectProps = {
	image: string
	x: number
	y: number
	ctx?: CanvasRenderingContext2D
}

const GameObject = ({ image, x, y, ctx }: GameObjectProps) => {
	return (
		<img
			src={image}
			style={{
				backgroundImage: `url(${image})`,
				transform: `translate(${x}px, ${y}px)`,
			}}
		/>
	)
}

export default GameObject
