import React, { useState, useEffect } from 'react'
import UploadForm from './UploadForm'
import { Context } from './context/ContextProvider'
import { getApplicationById } from '../query/get-application-by-id'
import { useParams } from 'react-router-dom'

const Main = () => {
	const [applicationData, setApplicationData] = useState({})
	const [toggleFetch, setToggleFetch] = useState(false)
	let { uId } = useParams()
	const data = getApplicationById(uId)

	useEffect(() => {
		data.then((d) => setApplicationData(d))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [toggleFetch])

	return (
		<Context.Provider value={{ applicationData, setApplicationData, data, setToggleFetch }}>
			<div className="px-4 py-4 bg-white rounded ">
				{/* <button onClick={() => setToggleFetch((prevState) => !prevState)}>Toggle</button> */}
				<UploadForm />
			</div>
		</Context.Provider>
	)
}

export default Main
