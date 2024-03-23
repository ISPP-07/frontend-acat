/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */
function Clipboard(props) {
	return (
		<svg
			height="18"
			width="18"
			viewBox="0 0 18 18"
			xmlns="http://www.w3.org/2000/svg"
			className="w-4 h-4 absolute left-0 m-1"
		>
			<g fill="#212121" stroke="#212121">
				<path
					d="M6.25,2.75h-1c-1.105,0-2,.895-2,2V14.25c0,1.105,.895,2,2,2h7.5c1.105,0,2-.895,2-2V4.75c0-1.105-.895-2-2-2h-1"
					fill="none"
					stroke="#212121"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="1.5"
				/>
				<rect
					height="3"
					width="5.5"
					fill="none"
					rx="1"
					ry="1"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="1.5"
					x="6.25"
					y="1.25"
				/>
			</g>
		</svg>
	)
}

export default Clipboard
