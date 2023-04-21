const axiosApi = axios.create({
  baseURL: 'http://localhost:8080',
  headers: { "Content-type": "application/json" },
  withCredentials: true,
});
axiosApi.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    console.log("error");
    return Promise.reject(error.response.data);
  }
);

export default axiosApi;
