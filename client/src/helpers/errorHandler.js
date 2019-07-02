const Toastify = require('./toastify')

module.exports = function (err)  {
  if (err.isAxiosError) {
    Toastify("Error: "+err.response.data)
  } else {
    console.error(err)
    Toastify("Programming Error - check console: "+err.message)
  }
}