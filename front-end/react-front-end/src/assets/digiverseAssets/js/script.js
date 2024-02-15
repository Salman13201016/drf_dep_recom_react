// Onload before view the website

var okbtn = document.querySelector(".onLoad_body .icon");
var onLoadMain = document.querySelector(".onLoad");
var stopprelod = document.querySelector(".onLoad_body");

$(window).on("load", function () {
  // setTimeout(function () {
  //   stopprelod.classList.add("onLoad_disable");
  // }, 2000);
  // setTimeout(function () {
  //   okbtn.classList.add("ok_bdb");
  // }, 2000);
  okbtn.addEventListener("click", function () {
    onLoadMain.classList.add("onLoadNone");
  });
});

// main slider
// let slideshowElements = document.querySelectorAll(".slider_box");
// let count = 1;
// setInterval(() => {
//   count++;
//   let curentElement = document.querySelector(".current");
//   curentElement.classList.remove("current");
//   if (count > slideshowElements.length) {
//     slideshowElements[0].classList.add("current");
//     count = 1;
//   } else {
//     curentElement.nextElementSibling.classList.add("current");
//   }
// }, 4000);

// ===========Custom Cursor start here =============
$(document).ready(function () {
      const cursor = $(".cursor");
      let rightClickFlag = false; // Flag to track right mouse button click

      function updateScrollbar() {
        const documentHeight = $(document).height();
        const viewportHeight = $(window).height();
        const documentWidth = $(document).width();
        const viewportWidth = $(window).width();

        // Check if the document height is greater than the viewport height
        if (documentHeight > viewportHeight) {
          $("body").css("overflow-y", "auto");
        } else {
          $("body").css("overflow-y", "hidden");
        }

        // Check if the document width is greater than the viewport width
        if (documentWidth > viewportWidth) {
          $("body").css("overflow-x", "auto");
        } else {
          $("body").css("overflow-x", "hidden");
        }
      }

      function isTouchDevice() {
        return (
          "ontouchstart" in window ||
          navigator.maxTouchPoints > 0 ||
          navigator.msMaxTouchPoints > 0
        );
      }

      function updateCursorVisibility(e) {
        if (rightClickFlag) {
          cursor.css("display", "none");
          // Reset the flag after a delay (e.g., 1000 milliseconds)
          setTimeout(function () {
            rightClickFlag = false;
          }, 1000);
          return;
        }

        if (isTouchDevice()) {
          // Hide the custom cursor on touch devices
          cursor.css("display", "none");
          return;
        }

        const isOverInteractiveElement = $("a, button, input, textarea, select")
          .toArray()
          .some(function (element) {
            const rect = element.getBoundingClientRect();
            return (
              e.clientX >= rect.left &&
              e.clientX <= rect.right &&
              e.clientY >= rect.top &&
              e.clientY <= rect.bottom
            );
          });

        const isOverIconElement = $(
          ".onLoad_body .icon, .onLoad_body .icon .dot"
        )
          .toArray()
          .some(function (element) {
            const rect = element.getBoundingClientRect();
            return (
              e.clientX >= rect.left &&
              e.clientX <= rect.right &&
              e.clientY >= rect.top &&
              e.clientY <= rect.bottom
            );
          });

        if (isOverInteractiveElement || isOverIconElement) {
          cursor.css("display", "none");
        } else {
          cursor.css("display", "block");
        }
      }

      // Initial update when the page loads
      updateScrollbar();

      $(document).mousemove(function (e) {
        const scrollX =
          window.pageXOffset || document.documentElement.scrollLeft;
        const scrollY =
          window.pageYOffset || document.documentElement.scrollTop;

        cursor.css({
          left: e.clientX + scrollX + "px",
          top: e.clientY + scrollY + "px",
        });

        updateCursorVisibility(e);
      });

      $(document).scroll(function () {
        updateCursorVisibility(); // Update cursor visibility on scroll
        updateScrollbar(); // Update scrollbar on scroll
      });

      $(document).mousedown(function (e) {
        if (e.which === 3) {
          // Right mouse button clicked
          rightClickFlag = true;
          cursor.css("display", "none");
          // Reset the flag after a delay (e.g., 1000 milliseconds)
          setTimeout(function () {
            rightClickFlag = false;
          }, 1000);
        }
      });

      $(document).mouseout(function () {
        cursor.css("display", "none");
      });

      // Update scrollbar and cursor visibility on window resize
      $(window).resize(function () {
        updateCursorVisibility();
        updateScrollbar();
      });

  //=============== Custom Cursor end here ==========
  

  //============ About us page animation start ==========

  // see more click

  $(".seemore").each(function (seeMoreIndex) {
    const currentSeeMore = $(this);
    currentSeeMore.click(function () {
      $(this).addClass("d-none");

      const textDiv = $(this).closest(".about_single_text");
      const imgDiv = textDiv.siblings(".about_single_img");
      const halfText = textDiv.find(".halfContent");
      const fullText = textDiv.find(".fullContent");
      const lessBtn = textDiv.find(".less");
      const halfTitle = textDiv.find(".title_half");
      const fullTitle = textDiv.find(".title_full");

      halfTitle.addClass("d-none");
      halfText.addClass("d-none");
      imgDiv.addClass("d-none");
      fullTitle.removeClass("d-none")
      fullText.removeClass("d-none");
      fullText.removeClass("width_0");
      lessBtn.removeClass("d-none")
      textDiv.css({width: "100%", transition: ".5s"});
    });
  });

  // Less button click
  $(".less").each(function (lessIndex) {
    const currentLessBtn = $(this);
    currentLessBtn.click(function () {
      $(this).addClass("d-none");

      const textDiv = $(this).closest(".about_single_text");
      const imgDiv = textDiv.siblings(".about_single_img");
      const halfText = textDiv.find(".halfContent");
      const fullText = textDiv.find(".fullContent");
      const seemoreBtn = textDiv.find(".seemore");
      const halfTitle = textDiv.find(".title_half");
      const fullTitle = textDiv.find(".title_full");

      halfTitle.removeClass("d-none");
      halfText.removeClass("d-none");
      fullTitle.addClass("d-none");
      fullText.addClass("d-none");
      seemoreBtn.removeClass("d-none")
      textDiv.css({ width: "50%", transition: ".5s" });
      imgDiv.removeClass("d-none");
    });
  });

  //============ About us page animation end ==========

  
});


// Pass word vissible
function viewPass() {
  let passwords = document.getElementById("pass");
  if (passwords.type === "password") {
    passwords.type = "text";
  } else {
    passwords.type = "password";
  }
}

// // Chatboot
// $(document).ready(function () {
//   $(".chat_bot_button").on("click", function () {
//     $(".chat_bot_body").toggle("display_block");
//   });
// });




