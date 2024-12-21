document.addEventListener("DOMContentLoaded", () => {
  // 1. 이미지 클릭 시 위치 저장
  const saveScrollPositionOnClick = () => {
    document.querySelectorAll(".image-container a").forEach((image) => {
      image.addEventListener("click", () => {
        localStorage.setItem("scrollPosition", window.scrollY);
      });
    });
  };

  // 2. 저장된 스크롤 위치 복원
  const restoreScrollPosition = () => {
    const savedPosition = localStorage.getItem("scrollPosition");
    if (savedPosition) {
      window.scrollTo(0, parseFloat(savedPosition));
      localStorage.removeItem("scrollPosition");
    }
  };

  // 3. 스크롤 애니메이션
  const setupScrollAnimation = () => {
    const mainContent = document.querySelector(".main-content");
    const leftText = document.querySelector(".scroll-text.left");
    const rightText = document.querySelector(".scroll-text.right");

    if (mainContent && leftText && rightText) {
      const handleScroll = () => {
        const scrollPosition = window.scrollY;
        const { top, height } = mainContent.getBoundingClientRect();
        const mainContentTop = window.scrollY + top;
        const mainContentBottom = mainContentTop + height;

        if (scrollPosition >= mainContentTop && scrollPosition <= mainContentBottom) {
          const progress = (scrollPosition - mainContentTop) / height;
          const translateYValue = (1 - progress) * 70;

          [leftText, rightText].forEach((text) => {
            text.style.opacity = "1";
            text.style.transform = `translateY(${translateYValue}px)`;
          });
        } else {
          [leftText, rightText].forEach((text) => {
            text.style.opacity = "0";
            text.style.transform = "translateY(50px)";
          });
        }
      };

      document.addEventListener("scroll", handleScroll);
    }
  };

  // 4. 이미지 슬라이딩 처리
  const setupImageSlider = () => {
    const slider = document.querySelector(".slider");
    const images = Array.from(document.querySelectorAll(".slider-image"));

    if (slider && images.length > 0) {
      const ovalContainer = document.querySelector(".oval-container");
      const { offsetWidth: ovalWidth } = ovalContainer;
      const { offsetWidth: imageWidth } = images[0];
      const imageCount = images.length;
      let currentIndex = 1;

      // 복제 이미지 추가
      const firstClone = images[0].cloneNode(true);
      const lastClone = images[images.length - 1].cloneNode(true);
      slider.appendChild(firstClone);
      slider.insertBefore(lastClone, images[0]);

      const updateSliderPosition = () => {
        const offsetX = (ovalWidth - imageWidth) / 2;
        slider.style.transform = `translateX(${-ovalWidth * currentIndex + offsetX}px)`;
      };

      // 초기 위치 설정
      updateSliderPosition();

      // 슬라이드 애니메이션
      const startSlider = () => {
        setInterval(() => {
          currentIndex++;
          slider.style.transition = "transform 1s ease-in-out";
          updateSliderPosition();

          slider.addEventListener("transitionend", () => {
            if (currentIndex === imageCount + 1) {
              slider.style.transition = "none";
              currentIndex = 1;
              updateSliderPosition();
            } else if (currentIndex === 0) {
              slider.style.transition = "none";
              currentIndex = imageCount;
              updateSliderPosition();
            }
          });
        }, 2000);
      };

      startSlider();
    }
  };

  // 실행
  saveScrollPositionOnClick();
  restoreScrollPosition();
  setupScrollAnimation();
  setupImageSlider();
});
