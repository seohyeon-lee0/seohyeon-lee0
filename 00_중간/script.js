document.addEventListener('DOMContentLoaded', () => {
    const images = [
        'img/image1.png',
        'img/image2.png',
        'img/image3.png',
        'img/image4.png',
        'img/image5.png'
    ];

    const leftImage = document.querySelector('.left img');
    const pages = document.querySelectorAll('.page');
    let currentPageIndex = 0;

    // Intersection Observer 설정
    const observerOptions = {
        root: null,
        threshold: 0.5 // 50% 이상 보일 때 트리거
    };

    // 페이지 가시성 감지하여 이미지를 변경하는 옵저버
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const pageIndex = Array.from(pages).indexOf(entry.target);

                // 현재 페이지와 다른 경우에만 이미지를 변경
                if (pageIndex !== currentPageIndex) {
                    leftImage.src = images[pageIndex];
                    currentPageIndex = pageIndex;

                    switch (pageIndex) {
                        case 0:
                            leftImage.style.maxWidth = '50%';
                            break;
                        case 1:
                            leftImage.style.maxWidth = '63%';
                            break;
                        case 2:
                            leftImage.style.maxWidth = '61%';
                            break;
                        case 3:
                            leftImage.style.maxWidth = '64%';
                            break;
                        case 4:
                            leftImage.style.maxWidth = '70%';
                            leftImage.style.transform = 'translate(-50%, -46%)';
                            break;
                        default:
                            leftImage.style.maxWidth = '50%';
                            break;
                    }
                }
            }
        });
    }, observerOptions);

    pages.forEach(page => observer.observe(page));

    // page2의 show-overlay 클래스를 추가/제거하는 옵저버
    const page2 = document.getElementById('page2');
    const pageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                page2.classList.add('show-overlay');
            } else {
                page2.classList.remove('show-overlay');
            }
        });
    }, { threshold: 0.5 });
    pageObserver.observe(page2);

    // 아이콘 토글 기능
    const iconElements = document.querySelectorAll('.icon-toggle');
    iconElements.forEach(element => {
        const text = element.dataset.text;
        const icon = element.dataset.icon;
        let isIconVisible = true;

        element.addEventListener('click', () => {
            if (isIconVisible) {
                element.innerHTML = `${text} | ${element.innerHTML.split("|")[1].trim()}`;
            } else {
                element.innerHTML = `${icon} | ${element.innerHTML.split("|")[1].trim()}`;
            }
            isIconVisible = !isIconVisible;
        });
    });

    // 텍스트 토글 기능
    const textToggleElement = document.querySelector('.text-toggle');
    const koreanText = "과거, 현재, 미래가 공존하는 조각의 세계로 여러분을 초대합니다. 뉴욕의 현대미술가 다니엘 아샴(Daniel Arsham)이 파리 갤러리 페로탕에서 선보이는 <Paris, 3020>! 이번 전시는 그의 시리즈 ‘상상의 고고학’의 연장선에 있으며, 고대 그리스와 로마의 조각상을 현대적으로 재해석한 작품들로 구성되어 있습니다.";
    const englishText = "Welcome to a world where past, present, and future coexist in sculpture. New York-based artist Daniel Arsham presents <Paris, 3020> at Galerie Perrotin, Paris. This exhibition continues his series ‘Fictional Archeology,’ reinterpreting ancient Greek and Roman statues in a modern way.";
    
    const wrappedKoreanText = wrapTextByWords(koreanText, 30);
    textToggleElement.textContent = wrappedKoreanText;

    function wrapTextByWords(text, width) {
        const words = text.split(" ");
        let line = "";
        let wrappedText = "";

        for (const word of words) {
            if ((line + word).length > width) {
                wrappedText += line.trim() + "\n";
                line = word + " ";
            } else {
                line += word + " ";
            }
        }
        wrappedText += line.trim();
        return wrappedText;
    }

    const wrappedEnglishText = englishText;//wrapTextByWords(englishText, 60);

    textToggleElement.addEventListener('mouseover', () => {
        textToggleElement.textContent = wrappedEnglishText;
        textToggleElement.style.color = 'dimgray';
    });

    textToggleElement.addEventListener('mouseout', () => {
        textToggleElement.textContent = wrappedKoreanText;
        textToggleElement.style.color = 'black';
    });
});

// 애니메이션 관련 함수
function setRandomColor(element) {
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    //element.style.color = randomColor;
}

function resetColor(element) {
    element.style.color = 'black';
}

function pauseAndShake(element) {
    element.classList.add('paused', 'shake');
}

function resumeAnimation(element) {
    element.classList.remove('paused', 'shake');
}
