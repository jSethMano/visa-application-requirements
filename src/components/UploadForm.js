import React from 'react'
import Card from './global/Card'
import { useContext } from 'react'
import { Context } from '../components/context/ContextProvider'

const UploadForm = () => {
	const { applicationData } = useContext(Context)

	return (
		<div>
			{/* <div className="border rounded-t-lg">Test</div> */}
			<h1 className="font-barlow font-bold text-2xl mb-6">Visa Requirements</h1>
			<div className="flex flex-col gap-2">
				{applicationData.visaApplicationRequirements &&
					applicationData.visaApplicationRequirements.map((d) => (
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
