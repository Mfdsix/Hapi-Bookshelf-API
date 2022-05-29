const respSuccess = (data, message = 'Success') => {
  return {
    status: 'success',
    message,
    data
  }
}

const respError = (message = 'Error') => {
  return {
    status: 'fail',
    message
  }
}

module.exports = {
  respSuccess,
  respError
}
