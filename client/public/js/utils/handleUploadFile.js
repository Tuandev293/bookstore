export const handleUploadFile = async (file) => {
  console.log("upload: ~ file", file);
  const bodyFormData = new FormData();
  console.log("upload: ~ bodyFormData", bodyFormData);
  bodyFormData.append("image", file);
  const response = await axios({
    method: "post",
    url: "https://api.imgbb.com/1/upload?key=cd0adf282e243d02d379dacf9293556e",
    data: bodyFormData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data.data.url;
};
