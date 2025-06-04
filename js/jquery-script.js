jQuery(document).ready(($) => {
  // Dashboard Page - Animate Progress Bars
  $(".progress-bar").each(function () {
    const width = $(this).attr("aria-valuenow") + "%";
    $(this).animate(
      {
        width: width,
      },
      1000
    );
  });

  // Dashboard Page - Task Card Hover Effect
  $(document)
    .on("mouseenter", ".task-card", function () {
      $(this).addClass("shadow-sm");
    })
    .on("mouseleave", ".task-card", function () {
      $(this).removeClass("shadow-sm");
    });

  // Nutrition Page - Meal Form Animation
  $("#addMealBtn").click(() => {
    $("#mealForm").slideDown(300);
  });

  $("#cancelMealBtn").click(() => {
    $("#mealForm").slideUp(300);
  });

  // Nutrition Page - Add/Remove Meal Animation
  $(document).on("click", ".delete-meal-btn", function () {
    const row = $(this).closest("tr");
    row.fadeOut(300, () => {
      // The actual deletion is handled in the vanilla JS
    });
  });

  // Community Page - Group Card Hover Effect
  $(".group-card").hover(
    function () {
      $(this).addClass("shadow");
    },
    function () {
      $(this).removeClass("shadow");
    }
  );

  // Community Page - Toggle Group Details
  $(".details-toggle").click(function () {
    const detailsId = $(this).data("id");
    $(`#details-${detailsId}`).slideToggle(300);
  });

  // Event Registration Button Effect
  $(".event-card .btn").click(function () {
    $(this)
      .text("Registered")
      .addClass("btn-success")
      .removeClass("btn-primary")
      .prop("disabled", true);
  });

  // Success Stories Hover Effect
  $(".story-card").hover(
    function () {
      $(this).find(".story-image img").css("transform", "scale(1.05)");
    },
    function () {
      $(this).find(".story-image img").css("transform", "scale(1)");
    }
  );

  // Smooth Scrolling for Anchor Links
  $('a[href^="#"]').on("click", function (e) {
    e.preventDefault();

    const target = this.hash;
    const $target = $(target);

    if ($target.length) {
      $("html, body").animate(
        {
          scrollTop: $target.offset().top - 70,
        },
        800,
        "swing"
      );
    }
  });

  // Fade In Elements on Scroll
  $(window).scroll(() => {
    $(".fade-in-section").each(function () {
      const elementTop = $(this).offset().top;
      const elementVisible = 150;
      const windowHeight = $(window).height();
      const scrollTop = $(window).scrollTop();

      if (elementTop < windowHeight + scrollTop - elementVisible) {
        $(this).addClass("is-visible");
      }
    });
  });

  // Initialize Tooltips
  const tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  tooltipTriggerList.map(
    (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
  );
});
