import { showToast } from "../utils/toast.js";
import { saveToken } from "../utils/handleToken.js";
import axiosApi from "../api/axiosApi.js";
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
            handleLogin();
          }
          form.classList.add("was-validated");
        },
        false
      );
    });
  })();

  const handleLogin = async () => {
    try {
      const res = await axiosApi.post("/api/auth/login", {
        username: username.value,
        password: password.value,
      });
      saveToken(res.accessToken);
      showToast("Đăng nhập thành công");
      setTimeout(() => {
        window.location = "/client/index.html";
      }, 1000);
    } catch (error) {
      form.classList.remove("was-validated");
      showToast("Sai mật khẩu hoặc user name", true);
    }
  };
});
