import { apiCall } from '../service/APIService'

export const getApplicationById = async (uId) => {
	let tokenStr = localStorage.getItem('token')

	let webUrl = `${process.env.REACT_APP_ERP_ENDPOINT}/api/Visa/applications/${uId}`

	let response = await apiCall(webUrl, 'GET', null, {
		'Access-Control-Allow-Origin': '*',
		'Content-type': 'Application/json',
		'X-Version': '2',
		Authorization: `Bearer ${tokenStr}`,
	})

	if (response.success) {
		if (response.status === 200) {
			let data = response.data
			return data
		} else if (response.status === 204) {
			let status = response.status
			return status
		}
	}
}
