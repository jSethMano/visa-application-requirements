import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import kmcLogo from '../img/kmc-logo.png'
import { Button } from 'kmc-design-system'
import { getToken } from '../query/post-token'

const Login = () => {
	const navigate = useNavigate()
	let { uId } = useParams()

	console.log(uId)

	const handleLogin = () => {
		if (localStorage.getItem('visa-application-token') !== null) {
			navigate(`/visa-requirements/${uId}`)
		} else {
			getToken().then((data) => {
				localStorage.setItem('visa-application-token', data.token)
			})
			navigate(`/visa-requirements/${uId}`)
		}
	}

	return (
		<div className="bg-white px-4 py-10 flex flex-col gap-4 items-center justiify-center rounded mt-40">
			{/* <h1>Hi, click login button to register</h1> */}
			<img src={kmcLogo} alt="KMC Logo" width="128" />
			<p className="text-gray-600 text-sm">VISA Application Requirements Upload Form</p>
			<div className="w-1/2">
				<Button onClick={handleLogin} className="w-full ">
					Login
				</Button>
			</div>
		</div>
	)
}

export default Login
