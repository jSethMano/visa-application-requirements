import React, { useState, useEffect, useCallback } from 'react'
import UploadForm from './UploadForm'
import { Context } from './context/ContextProvider'
import { getApplicationById } from '../query/get-application-by-id'
import { useParams } from 'react-router-dom'
import Header from './Header'

const Main = () => {
	const [applicationData, setApplicationData] = useState({})
	const [toggleFetch, setToggleFetch] = useState(false)
	let { uId } = useParams()
	const data = useCallback(() => getApplicationById(uId), [uId])

	useEffect(() => {
		getApplicationById(uId).then((d) => setApplicationData(d))

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [toggleFetch])

	return (
		<Context.Provider value={{ applicationData, setApplicationData, data, setToggleFetch }}>
			<div className="px-4 py-4   ">
				<Header />
				<UploadForm />
			</div>
		</Context.Provider>
	)
}

export default Main
