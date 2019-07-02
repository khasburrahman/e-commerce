const Toastify = require('toastify-js')

module.exports = (msg) => {
  Toastify({
    text: msg,
    duration: 3000,
    close: true,
    gravity: "top",
    position: "left",
    stopOnFocus: true
  }).showToast();
}