export const saveToken = (token) => {
  localStorage.setItem("ref", token);
};
export const removeToken = (token) => {
  localStorage.removeItem("ref");
};
export const getToken = () => {
  const token = localStorage.getItem("ref");
  if (token) return token;
  return false;
};
