import axiosApi from "../api/axiosApi.js";
import debounce from "../utils/debounce.js";
import { showToast } from "../utils/toast.js";
window.addEventListener("load", () => {
  // const inputSearch = document.querySelector('')
  (async () => {
    try {
      const res = await axiosApi.get("/api/v1/get-books");
      console.log(res);
      handleRenderData(".slider1", res.books.hot);
      handleRenderData(".slider2", res.books.newBooks);
    } catch (error) {
      console.log("error: ", error);
      showToast("Server is error", true);
    }
  })();
  const handleRenderData = (selector, data) => {
    data.forEach((book) => {
      const template = ` <article class="col single_product">
      <figure>
          <div class="product_thumb">
              <a href="./pages/product-details.html?id=${book._id}">
                  <img class="primary_img" src="${book.image}"
                      alt="consectetur">
              </a>
              <div class="product_action">
                  <ul>
                      <li class="wishlist"><a href="#" data-tippy="Wishlist"
                              data-tippy-inertia="true" data-tippy-delay="50"
                              data-tippy-arrow="true" data-tippy-placement="left"><i
                                  class="icon-heart icons"></i></a></li>
                     
                  </ul>
              </div>
          </div>
          <figcaption class="product_content text-center">
              <div class="product_ratting">
                  <ul class="d-flex justify-content-center">
                      <li><a href="#"><i class="ion-android-star"></i></a></li>
                      <li><a href="#"><i class="ion-android-star"></i></a></li>
                      <li><a href="#"><i class="ion-android-star"></i></a></li>
                      <li><a href="#"><i class="ion-android-star"></i></a></li>
                      <li><a href="#"><i class="ion-android-star"></i></a></li>
                      <li><span>(4)</span></li>
                  </ul>
              </div>
              <h4 class="product_name"><a href="./pages/product-details.html?id=${book._id}">${book.name}</a>
              </h4>
            
              
          </figcaption>
      </figure>
  </article>`;
      $(selector).append(template);
    });
    $(selector).slick({
      slidesToShow: 5,
      arrows: true,
      slidesToScroll: 1,
      dots: false,
      autoplay: false,
      speed: 300,
      infinite: true,
      prevArrow:
        '<button class="prev_arrow"><i class="icon-arrow-left icons"></i></button>',
      nextArrow:
        '<button class="next_arrow"><i class="icon-arrow-right icons"></i></button>',
      responsive: [
        { breakpoint: 992, settings: { slidesToShow: 4 } },
        { breakpoint: 768, settings: { slidesToShow: 3 } },
        { breakpoint: 300, settings: { slidesToShow: 2 } },
      ],
    });
  };
  console.log($(".search_book_input"));
  $(".search_book_input").on("input", function () {
    $(".fade-loading").show();
    debounce(handleSearchInput, 1000)();
  });

  async function handleSearchInput() {
    console.log("ok");
    const search = $(".search_book_input").val();
    if (!search) {
      $(".list_resu").text("");
      $(".fade-loading").hide();
      return;
    }
    try {
      const data = await axiosApi.get(`/api/v1/search`, {
        params: {
          search,
        },
      });
      console.log(data);
      showBookSearch(data.books);
    } catch (error) {
      console.log("error search: ", error);
      showToast("Server error", "error");
    }
  }
  const showBookSearch = (books) => {
    $(".list_resu").text("");
    $(".fade-loading").hide();
    if (books.length <= 0) {
      $(".list_resu").text("Không có kết quả nào");
      return;
    }
    books.forEach((book) => {
      const template = `<a href="./pages/product-details.html?id=${book._id}" class="d-flex mt-3">
      <img src="${book.image}" alt="">
      <div class="book-name">${book.name}</div>
  </a>`;
      $(".list_resu").append(template);
    });
  };
});
