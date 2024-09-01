document.addEventListener("DOMContentLoaded", function () {
    const scoreElement = document.getElementById("score");
    const imageContainer = document.getElementById("imageContainer");
    const clickImage = document.getElementById("clickImage");
    const progressBarFill = document.getElementById("progressBarFill");
    const celebrationText = document.getElementById("celebration");
    const body = document.body;

    let tg = window.Telegram.WebApp;
    tg.expand();

    document.addEventListener('contextmenu', event => {
        event.preventDefault(); // Отключение контекстного меню
    });

    let score = parseInt(localStorage.getItem("score")) || 0;
    let animationTriggered = false;

    clickImage.style.transform = "scale(0.75)";
    celebrationText.style.opacity = "0";

    scoreElement.textContent = score;
    progressBarFill.style.width = (score % 100) + "%";

    function increaseScore(x, y) {
        score += 1;
        scoreElement.textContent = score;

        let progress = (score % 100) / 100;
        progressBarFill.style.width = progress * 100 + "%";

        localStorage.setItem("score", score);

        if (score % 100 === 0) {
            progressBarFill.style.width = "0%";
            triggerCelebration();
        }

        clickImage.style.transform = "scale(1)";
        setTimeout(() => {
            clickImage.style.transform = "scale(0.75)";
        }, 100);

        createFlyingScore(x, y);
    }

    function createFlyingScore(x, y) {
        const flyingScore = document.createElement("div");
        flyingScore.className = "flying-score";
        flyingScore.textContent = "+1123 🤡";

        const offsetX = 100;
        const offsetY = 100;
        flyingScore.style.left = x - imageContainer.getBoundingClientRect().left - offsetX + "px";
        flyingScore.style.top = y - imageContainer.getBoundingClientRect().top - offsetY + "px";

        imageContainer.appendChild(flyingScore);

        setTimeout(() => {
            flyingScore.remove();
        }, 600);
    }

    function triggerCelebration() {
        if (!animationTriggered) {
            body.classList.add('rainbow-background');
            animationTriggered = true;

            setTimeout(() => {
                celebrationText.style.opacity = "0";
                celebrationText.style.visibility = "hidden";
                celebrationText.style.pointerEvents = "none";
            }, 300);
        }
    }

    function hexToRgbA(hex, alpha) {
        let r = parseInt(hex.slice(1, 3), 16);
        let g = parseInt(hex.slice(3, 5), 16);
        let b = parseInt(hex.slice(5, 7), 16);

        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    const root = document.querySelector(':root');
    const color = getComputedStyle(root).getPropertyValue('--main-color').trim();
    const element = document.querySelector('.score');
    element.style.background = hexToRgbA(color, 0.5);

    function handleTouchStart(event) {
        event.preventDefault();

        for (let i = 0; i < event.changedTouches.length; i++) {
            const touch = event.changedTouches[i];
            increaseScore(touch.clientX, touch.clientY);
        }
    }

    function handleClick(event) {
        increaseScore(event.clientX, event.clientY);
    }

    // Определяем, есть ли у устройства сенсорный экран
    if ('ontouchstart' in window) {
        imageContainer.addEventListener("touchstart", handleTouchStart);
    } else {
        imageContainer.addEventListener("click", handleClick);
    }
});
