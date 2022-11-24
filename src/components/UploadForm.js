import React, { useEffect, useState } from 'react'

import { apiCall } from '../service/APIService'
import { useParams } from 'react-router-dom'
import Card from './global/Card'

const UploadForm = () => {
	const [data, setData] = useState(null)
	const [resType, setResType] = useState()

	let { uId } = useParams()
	let tokenStr =
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjZlMWJiZmI2LTU3ODktNGIxZC1hYjg4LWM3NmI5M2JlMmU0NCIsImVtYWlsIjoiZ3Vlc3RAa21jLnNvbHV0aW9ucyIsInVuaXF1ZV9uYW1lIjoiZ3Vlc3RAa21jLnNvbHV0aW9ucyIsInJvbGUiOiJndWVzdCIsIm5iZiI6MTY2OTE3NDAwOSwiZXhwIjoxNjY5MjYwNDA5LCJpYXQiOjE2NjkxNzQwMDl9.bpZWjw2Rq6iFeSNJvx-ZMQTr8JN3uSlvlwtF9ELnFuc'

	const getVisaApplicationById = async () => {
		let webUrl = `${process.env.REACT_APP_ERP_ENDPOINT}/api/Visa/applications/${uId}`

		let response = await apiCall(webUrl, 'GET', null, {
			'Access-Control-Allow-Origin': '*',
			'Content-type': 'Application/json',
			'X-Version': '2',
			Authorization: `Bearer ${tokenStr}`,
		})

		if (response.success) {
			if (response.status === 200) {
				setData(response.data)
			} else if (response.status === 204) {
				setResType(response.status)
				console.log(resType)
			}
		}
	}

	useEffect(() => {
		getVisaApplicationById()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	if (!data) return null

	return (
		<div>
			{/* <div className="border rounded-t-lg">Test</div> */}
			<h1 className="font-barlow font-bold text-2xl mb-6">Visa Requirements</h1>
			<div className="flex flex-col gap-2">
				{data.visaApplicationRequirements.length > 0 &&
					data.visaApplicationRequirements.map((d) => (
						<Card
							key={d.id}
							requirementId={d.id}
							status={d.requirementStatusValue}
							requirementsName={d.visaRequirementName}
							requirementsFilePath={d.filePath}
						/>
					))}
			</div>
		</div>
	)
}

export default UploadForm
