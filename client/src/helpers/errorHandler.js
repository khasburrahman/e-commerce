const Toastify = require('./toastify')

module.exports = function (err)  {
  if (err.isAxiosError) {
    Toastify("Error: "+(err.response && err.response.data || err.message))
  } else if (err.userError) {
    Toastify(err.msg)
  } else {
    console.error(err)
    Toastify("Programming Error - check console: "+err.message)
  }
}