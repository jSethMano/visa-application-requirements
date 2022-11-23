import React from 'react'
import kmcLogo from '../img/kmc-logo.png'

const Header = () => {
	return (
		<header className="bg-white px-6 py-4 shadow mb-4 mt-2 w-11/12 rounded ">
			<img src={kmcLogo} alt="KMC" width="128" />
		</header>
	)
}

export default Header
