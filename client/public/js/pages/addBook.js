import { showToast } from "../utils/toast.js";
import { handleUploadFile } from "../utils/handleUploadFile.js";
const formAddBook = document.querySelector("#addbook");
const name = document.querySelector(".name");
const author = document.querySelector(".author");
const image = document.querySelector(".image");
const description = document.querySelector(".description");
const axiosApi = axios.create({
  baseURL: "http://localhost:8080/",
});
formAddBook.addEventListener("submit", async (e) => {
  const file = image.files[0];
  e.preventDefault();
  try {
    const urlImg = await handleUploadFile(file);
    const data = {
      name: name.value,
      author: author.value,
      image: urlImg,
      description: description.value,
    };
    const res = await axiosApi.post("api/v1/add-books", data);
    console.log(res);
    showToast("Thêm thành công");
    formAddBook.reset();
  } catch (error) {
    console.log("error", error);
  }
});
