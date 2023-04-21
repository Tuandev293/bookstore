import axiosApi from "../api/axiosApi.js";
import { saveToken } from "../utils/handleToken.js";
import { showToast } from "../utils/toast.js";

window.addEventListener("load", () => {
  const username = document.querySelector("#user_name");
  const password = document.querySelector("#password");
  const form = document.querySelector("#form-login");
  (function () {
    "use strict";
    var forms = document.querySelectorAll(".needs-validation");
    Array.prototype.slice.call(forms).forEach(function (form) {
      form.addEventListener(
        "submit",
        function (event) {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          } else {
            event.preventDefault();
            event.stopPropagation();
            if ($("#password").val() != $("#confirm_password").val()) {
              $("#confirm_password").addClass("is-invalid");
              return false;
            } else {
              $("#confirm-password").removeClass("is-invalid");
              handleLogin();
            }
          }
          form.classList.add("was-validated");
        },
        false
      );
    });
  })();

  const handleLogin = async () => {
    try {
      const res = await axiosApi.post("/api/auth/register", {
        username: username.value,
        password: password.value,
      });
      saveToken(res.accessToken);
      showToast("Đăng kí thành công");
      setTimeout(() => {
        window.location = "/client/pages/login.html";
      }, 1000);
    } catch (error) {
      const message = error.response?.data?.message || "Server Error";
      console.log("error: ", error);
      form.classList.remove("was-validated");
      showToast(message, true);
    }
  };
});
