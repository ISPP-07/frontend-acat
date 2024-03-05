/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */
function InboxArrowDown(props) {
	const title = props.title || 'inbox arrow down'

	return (
		<svg
			height="18"
			width="18"
			viewBox="0 0 18 18"
			xmlns="http://www.w3.org/2000/svg"
		>
			<title>{title}</title>
			<g fill="#212121" stroke="#212121">
				<polyline
					fill="none"
					points="11.5 5.75 9 8.25 6.5 5.75"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="1.5"
				/>
				<line
					fill="none"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="1.5"
					x1="9"
					x2="9"
					y1="8.25"
					y2="2.75"
				/>
				<path
					d="M16.214,9.75h-4.464v1c0,.552-.448,1-1,1h-3.5c-.552,0-1-.448-1-1v-1H1.787"
					fill="none"
					stroke="#212121"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="1.5"
				/>
				<path
					d="M12,2.75h.137c.822,0,1.561,.503,1.862,1.269l2.113,5.379c.092,.233,.138,.481,.138,.731v3.121c0,1.105-.895,2-2,2H3.75c-1.105,0-2-.895-2-2v-3.121c0-.25,.047-.498,.138-.731l2.113-5.379c.301-.765,1.039-1.269,1.862-1.269h.137"
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

export default InboxArrowDown
