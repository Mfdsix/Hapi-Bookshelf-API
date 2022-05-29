const respSuccess = (data, message = 'Success') => {
	return {
		status: 'success',
		message: message,
		data: data
	}
}

const respError = (message = 'Error') => {
	return {
		status: 'fail',
		message: message,
	}
}

module.exports = {
	respSuccess,
	respError
}