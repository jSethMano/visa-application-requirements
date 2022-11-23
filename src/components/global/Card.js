import React, { useState, useEffect, useRef } from 'react'
import useFileUpload from 'react-use-file-upload'
import { motion } from 'framer-motion'
import { classNames } from '../../utils/classNames'
import { BsCheckAll } from 'react-icons/bs'
import { apiCall } from '../../service/APIService'

const Card = ({ status, requirementsName, requirementsFilePath, requirementId }) => {
	const statusToClassName = {
		Pending: 'bg-branding-pumpkin',
		'For Approval': 'bg-green-500',
		Approved: 'bg-blue-500',
	}

	const [forApprovalStatus, setForApprovalStatus] = useState(false)
	const [reqId, setReqId] = useState(false)

	const { files, setFiles, handleDragDropEvent, createFormData } = useFileUpload()

	const inputRef = useRef()
	let tokenStr =
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjZlMWJiZmI2LTU3ODktNGIxZC1hYjg4LWM3NmI5M2JlMmU0NCIsImVtYWlsIjoiZ3Vlc3RAa21jLnNvbHV0aW9ucyIsInVuaXF1ZV9uYW1lIjoiZ3Vlc3RAa21jLnNvbHV0aW9ucyIsInJvbGUiOiJndWVzdCIsIm5iZiI6MTY2OTE3NDAwOSwiZXhwIjoxNjY5MjYwNDA5LCJpYXQiOjE2NjkxNzQwMDl9.bpZWjw2Rq6iFeSNJvx-ZMQTr8JN3uSlvlwtF9ELnFuc'

	const headers = {
		'Access-Control-Allow-Origin': '*',
		'X-Version': '1',
		Authorization: `Bearer ${tokenStr}`,
	}

	useEffect(() => {
		if (status === 'Pending' && requirementsFilePath !== null) {
			setForApprovalStatus(true)
		}
	}, [requirementsFilePath, status])

	useEffect(() => {
		console.log(files)
		if (files.length > 0) {
			handleFileChange(reqId)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [reqId])

	let formData = createFormData()

	const handleFileChange = async (vId, target) => {
		console.log(vId)
		console.log(target)
		console.log(files)

		for (var i = 0; i < files.length; i++) {
			formData.append('file', files[0], files[0].name)
			let imgUploadUrl = `${process.env.REACT_APP_ERP_ENDPOINT}/api/Azure/blob/upload?folder=visa-applications`

			let resp = await apiCall(imgUploadUrl, 'POST', formData, { headers })

			if (resp.success) {
				const { data } = resp

				let newFile = {
					filepath: data,
					fileName: files[0].name,
				}

				console.log(vId)
				updateRequirementFilepath(vId, newFile.filepath)
			}
		}
	}

	const updateRequirementFilepath = async (vId, filePath) => {
		console.log('updateRequirementFilepath Runs ' + vId)
		let postBody = {
			filePath: filePath,
		}

		let url = `${process.env.REACT_APP_ERP_ENDPOINT}/api/Visa/application-requirements/${vId}/file-paths`
		let response = await apiCall(url, 'PUT', postBody, { 'x-version': '2', Authorization: `Bearer ${tokenStr}` })

		console.log('File changed', response)
	}

	const formSubmitHandler = (e) => {
		e.preventDefault()
	}

	return (
		<motion.form initial={{ scale: 0 }} animate={{ scale: '100%' }} onSubmit={formSubmitHandler}>
			<button
				className={classNames(
					'flex justify-center items-center gap-2 z-1 rounded-t-md px-6 py-2 text-xs text-white',
					statusToClassName[forApprovalStatus ? 'For Approval' : status]
				)}
			>
				{forApprovalStatus ? 'For Approval' : status}
				<BsCheckAll />
			</button>

			{status === 'Pending' && forApprovalStatus === false && (
				<div className="border-b border-r border-l z-99 relative bottom-1 shadow rounded-tr-md rounded-b-md bg-white px-6 py-4">
					<p className="text-lg font-bold text-gray-900">{requirementsName}</p>
					<p className="text-sm font-bold text-gray-600">Upload your file below</p>
					<div
						className="w-full h-full mt-4 border-2 border-dashed rounded px-6 py-6 flex flex-col mb-2"
						onDragEnter={handleDragDropEvent}
						onDragOver={handleDragDropEvent}
						onDrop={async (e) => {
							// console.log(requirementId)
							setReqId(requirementId)
							setFiles(e, 'w')
							await handleFileChange(requirementId, e)
							handleDragDropEvent(e)
						}}
					>
						<p className="text-xs text-gray-600 text-center">Drag and drop files here</p>
						<span className="text-xs text-gray-600 text-center">or</span>
						<button
							className="underline text-xs font-bold text-branding-pumpkin"
							onClick={() => {
								inputRef.current.click()
							}}
						>
							Select a file to upload
						</button>
						<input
							type="file"
							accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf"
							ref={inputRef}
							style={{ display: 'none' }}
							onChange={async (target) => {
								setReqId(requirementId)
								setFiles(target, 'w')
								handleFileChange(requirementId, target)
								inputRef.current.value = null
							}}
						/>
					</div>
				</div>
			)}

			{forApprovalStatus && (
				<div className="border-b border-r border-l z-99 relative bottom-1 shadow rounded-tr-md rounded-b-md bg-white px-6 py-4">
					<p className="text-lg font-bold text-gray-900">{requirementsName}</p>
					<p className="text-xs  text-gray-600">
						{requirementsFilePath.replace('https://kmcstorage1.blob.core.windows.net/visa-applications/', '')}
					</p>
					<button
						className="border border-gray-900 px-4 py-2 rounded text-xs font-bold text-gray-900 w-full mt-4"
						onClick={() => {
							inputRef.current.click()
						}}
					>
						Replace file
					</button>
					<input
						type="file"
						accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf"
						ref={inputRef}
						style={{ display: 'none' }}
						onChange={async (target) => {
							setReqId(requirementId)
							setFiles(target, 'w')
							await handleFileChange(requirementId, target)
							inputRef.current.value = null
						}}
					/>
				</div>
			)}

			{status === 'Approved' && (
				<div className="border-b-2 border-r-2 border-l-2 border-t-2 border-blue-500 z-99 relative bottom-1  rounded-tr-md rounded-b-md bg-white px-6 py-4">
					<p className="text-lg font-bold text-blue-400">{requirementsName}</p>
					<p className="text-sm  text-gray-600">
						{requirementsFilePath.replace('https://kmcstorage1.blob.core.windows.net/visa-applications/', '')}
					</p>
				</div>
			)}
		</motion.form>
	)
}
export default Card
