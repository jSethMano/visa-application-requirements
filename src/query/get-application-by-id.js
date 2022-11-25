import { apiCall } from '../service/APIService'

export const getApplicationById = async (uId) => {
	let tokenStr =
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjZlMWJiZmI2LTU3ODktNGIxZC1hYjg4LWM3NmI5M2JlMmU0NCIsImVtYWlsIjoiZ3Vlc3RAa21jLnNvbHV0aW9ucyIsInVuaXF1ZV9uYW1lIjoiZ3Vlc3RAa21jLnNvbHV0aW9ucyIsInJvbGUiOiJndWVzdCIsIm5iZiI6MTY2OTM1NzA0MSwiZXhwIjoxNjY5NDQzNDQxLCJpYXQiOjE2NjkzNTcwNDF9.muG2YCZ2hniN3Yog799e8q4-1Cw06TFDkTrYyIXMemc'

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
