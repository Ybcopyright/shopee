document.addEventListener("DOMContentLoaded", () => {
  const topRight = document.querySelector(".top-right");
  const notifyMenu = document.querySelector(".notify-menu");
  const notifyPanel = notifyMenu?.querySelector(".notify-panel");

  if (!notifyMenu || !notifyPanel) return;

  let closeTimer = null;

  const clearCloseTimer = () => {
    if (closeTimer) {
      clearTimeout(closeTimer);
      closeTimer = null;
    }
  };

  const openNotifyPanel = () => {
    clearCloseTimer();
    notifyMenu.classList.remove("is-closing");
    notifyMenu.classList.add("is-open");
  };

  const closeNotifyPanelWithFade = () => {
    if (!notifyMenu.classList.contains("is-open")) return;

    notifyMenu.classList.add("is-closing");
    clearCloseTimer();
    closeTimer = setTimeout(() => {
      notifyMenu.classList.remove("is-closing");
      notifyMenu.classList.remove("is-open");
    }, 3000);
  };

  const closeNotifyPanelImmediately = () => {
    clearCloseTimer();
    notifyMenu.classList.remove("is-closing");
    notifyMenu.classList.remove("is-open");
  };

  notifyMenu.addEventListener("mouseenter", openNotifyPanel);
  notifyMenu.addEventListener("mouseleave", closeNotifyPanelWithFade);
  notifyPanel.addEventListener("mouseenter", openNotifyPanel);
  notifyPanel.addEventListener("mousemove", openNotifyPanel);

  notifyMenu.addEventListener("focusin", openNotifyPanel);
  notifyMenu.addEventListener("focusout", (event) => {
    const nextFocused = event.relatedTarget;
    if (!nextFocused || !notifyMenu.contains(nextFocused)) {
      closeNotifyPanelWithFade();
    }
  });

  topRight?.addEventListener("mouseover", (event) => {
    const hoveredLink = event.target.closest("a");
    if (!hoveredLink || notifyMenu.contains(hoveredLink)) return;
    closeNotifyPanelImmediately();
  });

  topRight?.addEventListener("focusin", (event) => {
    const focusedLink = event.target.closest("a");
    if (!focusedLink || notifyMenu.contains(focusedLink)) return;
    closeNotifyPanelImmediately();
  });

  notifyPanel.addEventListener("transitionend", (event) => {
    if (
      event.propertyName === "opacity" &&
      notifyMenu.classList.contains("is-closing")
    ) {
      notifyMenu.classList.remove("is-closing");
      notifyMenu.classList.remove("is-open");
      clearCloseTimer();
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector(".hero-slider");
  if (!slider) return;

  const track = slider.querySelector(".slider-track");
  const slides = track ? Array.from(track.querySelectorAll("img")) : [];
  const prevButton = slider.querySelector(".slider-arrow.prev");
  const nextButton = slider.querySelector(".slider-arrow.next");
  const dotsContainer = slider.querySelector(".stardust-carousel__dots");

  if (
    !track ||
    slides.length === 0 ||
    !prevButton ||
    !nextButton ||
    !dotsContainer
  )
    return;

  const totalSlides = slides.length;
  let activeIndex = 0;
  const jumpCount = 6;
  let autoPlayTimer = null;
  const dots = [];

  for (let dotIndex = 0; dotIndex < totalSlides; dotIndex += 1) {
    const dotButton = document.createElement("button");
    dotButton.type = "button";
    dotButton.className = "stardust-carousel__dot";
    dotButton.setAttribute("aria-label", `Ảnh ${dotIndex + 1}`);

    dotButton.addEventListener("click", () => {
      goToSlide(dotIndex);
      startAutoPlay();
    });

    dotsContainer.appendChild(dotButton);
    dots.push(dotButton);
  }

  const updateDots = () => {
    dots.forEach((dotButton, dotIndex) => {
      dotButton.classList.toggle("is-active", dotIndex === activeIndex);
    });
  };

  const goToSlide = (index) => {
    activeIndex = (index + totalSlides) % totalSlides;
    const offsetPercent = -(100 / totalSlides) * activeIndex;
    track.style.transform = `translateX(${offsetPercent}%)`;
    updateDots();
  };

  const nextSlide = () => goToSlide(activeIndex + 1);
  const prevSlide = () => goToSlide(activeIndex - 1);

  const stopAutoPlay = () => {
    if (autoPlayTimer) {
      clearInterval(autoPlayTimer);
      autoPlayTimer = null;
    }
  };

  const startAutoPlay = () => {
    stopAutoPlay();
    autoPlayTimer = setInterval(nextSlide, 3500);
  };

  prevButton.addEventListener("click", () => {
    prevSlide();
    startAutoPlay();
  });

  nextButton.addEventListener("click", () => {
    nextSlide();
    startAutoPlay();
  });

  slider.addEventListener("mouseenter", stopAutoPlay);
  slider.addEventListener("mouseleave", startAutoPlay);

  goToSlide(0);
  startAutoPlay();
});

document.addEventListener("DOMContentLoaded", () => {
  const categorySection = document.querySelector(".category-section");
  if (!categorySection) return;

  const track = categorySection.querySelector(".category-track");
  const sourceGrid = categorySection.querySelector(".category-grid");
  const prevButton = categorySection.querySelector(".category-arrow.prev");
  const nextButton = categorySection.querySelector(".category-arrow.next");

  if (!track || !sourceGrid || !prevButton || !nextButton) return;

  const cards = Array.from(sourceGrid.querySelectorAll(".category-card"));
  const cardsPerPage = 20;
  const totalPages = Math.ceil(cards.length / cardsPerPage);

  const pagesFragment = document.createDocumentFragment();

  for (let pageIndex = 0; pageIndex < totalPages; pageIndex += 1) {
    const page = document.createElement("div");
    page.className = "category-page";

    const pageGrid = document.createElement("div");
    pageGrid.className = "category-page-grid";

    const start = pageIndex * cardsPerPage;
    const end = start + cardsPerPage;
    const chunk = cards.slice(start, end);

    chunk.forEach((card) => {
      pageGrid.appendChild(card);
    });

    for (let index = chunk.length; index < cardsPerPage; index += 1) {
      const placeholder = document.createElement("div");
      placeholder.className = "category-card category-card--placeholder";
      placeholder.setAttribute("aria-hidden", "true");
      pageGrid.appendChild(placeholder);
    }

    page.appendChild(pageGrid);
    pagesFragment.appendChild(page);
  }

  track.replaceChildren(pagesFragment);

  let activePage = 0;

  const updateArrows = () => {
    prevButton.classList.toggle("is-disabled", activePage === 0);
    nextButton.classList.toggle("is-disabled", activePage >= totalPages - 1);
  };

  const goToPage = (pageIndex) => {
    activePage = Math.max(0, Math.min(pageIndex, totalPages - 1));
    track.style.transform = `translateX(-${activePage * 100}%)`;
    updateArrows();
  };

  prevButton.addEventListener("click", () => {
    goToPage(activePage - 1);
  });

  nextButton.addEventListener("click", () => {
    goToPage(activePage + 1);
  });

  if (totalPages <= 1) {
    prevButton.classList.add("is-hidden");
    nextButton.classList.add("is-hidden");
  }

  goToPage(0);
});

document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector(".flash-sale-section");
  if (!section) return;

  const timerCells = section.querySelectorAll(".flash-timer span");
  if (timerCells.length === 3) {
    const totalSeconds = 90;
    let remainingSeconds = totalSeconds;

    const formatTwoDigits = (value) => String(value).padStart(2, "0");

    const renderTimer = (seconds) => {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const secs = seconds % 60;

      timerCells[0].textContent = formatTwoDigits(hours);
      timerCells[1].textContent = formatTwoDigits(minutes);
      timerCells[2].textContent = formatTwoDigits(secs);
    };

    renderTimer(remainingSeconds);

    setInterval(() => {
      remainingSeconds -= 1;

      if (remainingSeconds < 0) {
        remainingSeconds = totalSeconds;
      }

      renderTimer(remainingSeconds);
    }, 1000);
  }

  const viewport = section.querySelector(".flash-sale-viewport");
  const track = section.querySelector(".flash-sale-track");
  const cards = Array.from(section.querySelectorAll(".flash-card"));
  const prevButton = section.querySelector(".flash-arrow.prev");
  const nextButton = section.querySelector(".flash-arrow.next");

  const parsePriceValue = (text) => {
    const numberText = String(text).replace(/[^\d]/g, "");
    return Number.parseInt(numberText, 10) || 0;
  };

  cards.forEach((card) => {
    const priceElement = card.querySelector(".flash-price");
    const oldPriceElement = card.querySelector(".flash-old-price");

    if (!priceElement || !oldPriceElement) return;

    const currentPrice = parsePriceValue(priceElement.textContent);
    const oldPrice = parsePriceValue(oldPriceElement.textContent);

    if (oldPrice <= currentPrice || currentPrice <= 0) return;

    const discountPercent = Math.round(
      ((oldPrice - currentPrice) / oldPrice) * 100,
    );

    const badge = document.createElement("span");
    badge.className = "flash-discount";
    badge.textContent = `-${discountPercent}%`;
    card.appendChild(badge);
  });

  if (!viewport || !track || cards.length === 0 || !prevButton || !nextButton) {
    return;
  }
  const jumpCount = 6;

  const applyEdgeGap = () => {
    const cardWidth = cards[0].getBoundingClientRect().width;
    const viewportWidth = viewport.clientWidth;
    const calculatedGap =
      (viewportWidth - cardWidth * jumpCount) / Math.max(1, jumpCount - 1);
    const safeGap = Math.max(8, calculatedGap);
    track.style.columnGap = `${safeGap}px`;
  };

  const getMetrics = () => {
    const cardWidth = cards[0].getBoundingClientRect().width;
    const styles = window.getComputedStyle(track);
    const gap = Number.parseFloat(styles.columnGap || styles.gap || "0") || 0;
    return { cardWidth, gap };
  };

  const getStep = () => {
    const { cardWidth, gap } = getMetrics();
    return cardWidth + gap;
  };

  const getVisibleCount = () => {
    const viewportWidth = viewport.clientWidth;
    const { cardWidth, gap } = getMetrics();
    const step = cardWidth + gap;
    return Math.max(1, Math.floor((viewportWidth + gap) / step));
  };

  let activeIndex = 0;

  const updateArrows = () => {
    const maxIndex = Math.max(0, cards.length - getVisibleCount());
    prevButton.classList.toggle("is-disabled", activeIndex <= 0);
    nextButton.classList.toggle("is-disabled", activeIndex >= maxIndex);
  };

  const goTo = (index) => {
    const maxIndex = Math.max(0, cards.length - getVisibleCount());
    activeIndex = Math.max(0, Math.min(index, maxIndex));
    track.style.transform = `translateX(-${activeIndex * getStep()}px)`;
    updateArrows();
  };

  const next = () => {
    goTo(activeIndex + jumpCount);
  };

  const prev = () => {
    goTo(activeIndex - jumpCount);
  };

  prevButton.addEventListener("click", () => {
    prev();
  });

  nextButton.addEventListener("click", () => {
    next();
  });

  window.addEventListener("resize", () => {
    applyEdgeGap();
    goTo(activeIndex);
  });

  applyEdgeGap();
  goTo(0);
});

document.addEventListener("DOMContentLoaded", () => {
  const sliders = Array.from(document.querySelectorAll(".promo-slider"));
  if (sliders.length === 0) return;

  sliders.forEach((slider) => {
    const viewport = slider.querySelector(".promo-viewport");
    const track = slider.querySelector(".promo-track");
    const prevButton = slider.querySelector(".promo-arrow.prev");
    const nextButton = slider.querySelector(".promo-arrow.next");

    if (!viewport || !track || !prevButton || !nextButton) return;

    const cards = Array.from(track.querySelectorAll(".promo-card"));
    if (cards.length === 0) return;

    const perView = Number.parseInt(slider.dataset.perView || "6", 10);
    const cardsPerPage = Number.isFinite(perView) && perView > 0 ? perView : 6;
    const totalPages = Math.ceil(cards.length / cardsPerPage);

    const pagesFragment = document.createDocumentFragment();

    for (let pageIndex = 0; pageIndex < totalPages; pageIndex += 1) {
      const page = document.createElement("div");
      page.className = "promo-page";

      const start = pageIndex * cardsPerPage;
      const chunk = cards.slice(start, start + cardsPerPage);
      chunk.forEach((card) => page.appendChild(card));

      pagesFragment.appendChild(page);
    }

    track.replaceChildren(pagesFragment);

    let activePage = 0;

    const updateArrows = () => {
      prevButton.classList.toggle("is-disabled", activePage <= 0);
      nextButton.classList.toggle("is-disabled", activePage >= totalPages - 1);
    };

    const goToPage = (pageIndex) => {
      activePage = Math.max(0, Math.min(pageIndex, totalPages - 1));
      track.style.transform = `translateX(-${activePage * 100}%)`;
      updateArrows();
    };

    prevButton.addEventListener("click", () => {
      goToPage(activePage - 1);
    });

    nextButton.addEventListener("click", () => {
      goToPage(activePage + 1);
    });

    if (totalPages <= 1) {
      prevButton.classList.add("is-disabled");
      nextButton.classList.add("is-disabled");
    }

    goToPage(0);
  });
});
