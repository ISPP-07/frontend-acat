/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */
import Image from 'next/image'

export default function ButtonIcon({
	datatestid = '',
	iconpath,
	iconWidth = 18,
	iconHeight = 18,
	handleClick,
	color,
	border,
	isSubmit = false
}) {
	return (
		<button
			data-testid={datatestid}
			type={isSubmit ? 'submit' : 'button'}
			className={`${color} rounded-full text-white p-2 shadow-lg ${border}`}
			onClick={handleClick}
		>
			<Image src={iconpath} width={iconWidth} height={iconHeight} alt="icon" />
		</button>
	)
}
