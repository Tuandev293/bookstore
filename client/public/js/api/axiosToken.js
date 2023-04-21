const token = localStorage.getItem("ref");
const axiosToken = axios.create({
    baseURL: "http://localhost:8080",
    headers: { "Content-type": "application/json" },
    withCredentials: true,
  });
  axiosToken.interceptors.request.use(
    function (config) {
        config.headers.Authorization = `Bearer ${token}`;
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );
  
  export default axiosToken;