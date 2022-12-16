import { apiCall } from '../service/APIService'

export const getToken = async () => {
	let url = `https://auth-api.kmc.solutions/api/Auth/token`

	let body = {
		email: 'guest@kmc.solutions',
		key: '816A1383-0CBC-41D8-BA52-54A49927BD9B',
	}

	let response = await apiCall(url, 'POST', body)

	if (response.success) {
		let data = response.data
		return data
	}
}
