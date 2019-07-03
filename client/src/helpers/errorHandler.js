const Toastify = require('./toastify')

module.exports = function (err)  {
  if (err.isAxiosError) {
    Toastify("Error: "+(err.response && err.response.data || err.message))
  } else {
    console.error(err)
    Toastify("Programming Error - check console: "+err.message)
  }
}