import axiosApi from "../api/axiosApi.js";
import axiosToken from "../api/axiosToken.js";
import { showToast } from "../utils/toast.js";
const token = localStorage.getItem("ref");
let rate = 1;
$(document).ready(function () {
  const regex = /^[0-9a-f]{24}$/i;
  const bookId = $.url().param("id");
  if (!regex.test(bookId)) {
    window.location = "/";
  }
  const handleGetInfoBook = async () => {
    try {
      const res = await axiosApi.get("/api/v1/detail-book", {
        params: {
          id: bookId,
        },
      });
      console.log(res);
      handleShowData(res.book);
      getComment();
    } catch (error) {
      console.log("error: ", error);
      showToast("Server error", true);
    }
  };
  handleGetInfoBook();
  const handleShowData = (book) => {
    if (!book) return;
    $(".book-name").text(book.name);
    $(".book_info_content").html(book.description);
    $(".book-image").attr("src", book.image);
    $(".total_review").text(`${book.total_vote} reviews`);
    $(".wrap-ratting").starRating({
      readOnly: true,
      initialRating: book.rate,
      strokeWidth: 9,
      starSize: 20,
    });
  };

  $(".btn-add_comment").click(async () => {
    const content = $("#review_comment").val();
    if (!content) {
      showToast("Bạn cần nhập nội dung");
      return;
    }
    if (!token) {
      showToast("Bạn cần đăng nhập để thực hiện");
      return;
    }
    try {
      await axiosToken.post("/api/v1/create-comment", {
        bookId,
        content,
        rate,
      });
      getComment();
      handleGetInfoBook();
      $("#review_comment").val("");
    } catch (error) {
      showToast("Lỗi", error);
    }
  });
  $(".wrap_icon-star").starRating({
    totalStars: 5,
    initialRating: 0,
    strokeWidth: 9,
    starSize: 20,
    callback: function (currentRating, $el) {
      rate = currentRating;
    },
  });
  const getComment = async () => {
    try {
      const { comments } = await axiosApi.get(
        `/api/v1/get-comments?id=${bookId}`
      );
      console.log("comments: ", comments);
      if (comments.length <= 0) return;
      handleShowComment(comments);
    } catch (error) {
      console.log("error: ", error);
      showToast("Không thể tải comment", "error");
    }
  };
  const handleShowComment = (comments) => {
    $(".wrap-comment_item").text("");
    comments.reverse().forEach((comment) => {
      const { userId, ...com } = comment;
      const template = `<div class="reviews_comment_box">
      <div class="comment_thmb">
        <img src="${userId.avatar}" alt="">
      </div>
      <div class="comment_text">
        <div class="reviews_meta">
          <div class="comment_star_rating" data-rating="${com.rate}">
          </div>
          <p><strong>${userId.username} </strong>- April 17, 2023</p>
          <span>${com.content}</span>
        </div>
      </div>
    </div>`;
      $(".wrap-comment_item").append(template);
    });
    $(".comment_star_rating").starRating({
      totalStars: 5,
      starShape: "rounded",
      starSize: 20,
      readOnly: true,
    });
  };
});
