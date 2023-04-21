export const showToast = (message, error = false) => {
  Toastify({
    text: message,
    duration: 3000,
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: error
        ? "linear-gradient(to right, red, red)"
        : "rgb(132 204 22)",
    },
    onClick: function () {}, // Callback after click
  }).showToast();
};
