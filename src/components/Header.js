import React from 'react'
import kmcLogo from '../img/kmc-logo.png'
import { useContext } from 'react'
import { Context } from '../components/context/ContextProvider'
import { HiOutlineUserCircle } from 'react-icons/hi'

const Header = () => {
	const { applicationData } = useContext(Context)
	console.log(applicationData.firstName)

	return (
		<header className="bg-white px-4 py-4 shadow mb-4 mt-2 w-full rounded lg:w-full flex justify-between items-center">
			<div>
				<img src={kmcLogo} alt="KMC" width="86" />
			</div>
			<div className="flex items-center gap-2">
				<p className="text-sm font-bold text-gray-800">
					{applicationData.firstName} {applicationData.lastName}
				</p>
				<HiOutlineUserCircle />
			</div>
		</header>
	)
}

export default Header
