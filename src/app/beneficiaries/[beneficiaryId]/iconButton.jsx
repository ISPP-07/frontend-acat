/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */

const IconButton = ({ icon: Icon, disabled, color }) => {
	return (
		<button
			className={`button rounded-full w-8 h-8 flex items-center justify-center ${disabled ? color : 'opacity-40 cursor-not-allowed bg-orange-500 hover:bg-orange-600 active:bg-orange-700'}`}
			disabled={disabled}
		>
			<Icon className="icon" />
		</button>
	)
}

export default IconButton
