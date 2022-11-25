import React from 'react'
import { IoIosWarning } from 'react-icons/io'
import { HiCheckCircle, HiInformationCircle, HiExclamationCircle } from 'react-icons/hi'
import { motion } from 'framer-motion'

const DEFAULT_ICON = {
	success: <HiCheckCircle className="h-5 w-5 text-success" />,
	warning: <IoIosWarning className="h-5 w-5 text-warning" />,
	info: <HiInformationCircle className="h-5 w-5 text-info" />,
	error: <HiExclamationCircle className="h-5 w-5 text-error" />,
}

const DEFAULT_THEME = {
	success: 'badge-success',
	warning: 'badge-warning',
	info: 'badge-info',
	error: 'badge-error',
}

export const PageAlert = ({ title, variant = 'success', children }) => {
	return (
		<motion.div
			initial={{ scale: 0 }}
			animate={{ scale: '100%' }}
			className={`bg-green-200  mb-2 font-karla rounded w-full px-4 py-4 ${DEFAULT_THEME[variant]}`}
		>
			<span className="flex items-center gap-2 text-gray-900">
				{DEFAULT_ICON[variant]}
				<h1 className="font-bold text-base text-gray-900">{title}</h1>
			</span>

			<div className="font-karla text-gray-600 text-sm">{children}</div>
		</motion.div>
	)
}
