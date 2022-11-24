import React from 'react'
import { BsCheckCircle } from 'react-icons/bs'
import { motion } from 'framer-motion'

const Popup = () => {
	const container = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {},
		},
	}

	return (
		<motion.div
			variants={container}
			initial="show"
			animate="hidden"
			transition={{ duration: 3 }}
			className="z-999 absolute top-2 right-4 px-4 py-3 rounded bg-white shadow-sm flex items-center gap-2"
		>
			<div>
				<BsCheckCircle className="text-green-500" />
			</div>
			<div>
				<p className="font-karla text-sm font-bold text-gray-900">Upload Successful</p>
				<p className="font-karla text-xs text-gray-700">File are submitted and subject for approval </p>
			</div>
		</motion.div>
	)
}

export default Popup
