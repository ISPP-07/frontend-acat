/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */
function Pen3(props) {
	const title = props.title || 'pen 3'

	return (
		<svg
			height="18"
			width="18"
			viewBox="0 0 18 18"
			xmlns="http://www.w3.org/2000/svg"
		>
			<title>{title}</title>
			<g fill="#212121" stroke="#212121">
				<path
					d="M10,5l3.586,3.586c.781,.781,.781,2.047,0,2.828l-1.586,1.586"
					fill="none"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="1.5"
				/>
				<path
					d="M2.75,15.25s3.599-.568,4.546-1.515c.947-.947,7.327-7.327,7.327-7.327,.837-.837,.837-2.194,0-3.03-.837-.837-2.194-.837-3.03,0,0,0-6.38,6.38-7.327,7.327s-1.515,4.546-1.515,4.546h0Z"
					fill="none"
					stroke="#212121"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="1.5"
				/>
			</g>
		</svg>
	)
}

export default Pen3
