document.addEventListener("DOMContentLoaded", function () {
    const scoreElement = document.getElementById("score");
    const imageContainer = document.getElementById("imageContainer");
    const clickImage = document.getElementById("clickImage");
    const progressBarFill = document.getElementById("progressBarFill");

    let score = 0;
    let isClicking = false; // Флаг для отслеживания состояния клика

    function increaseScore(event) {
        if (!isClicking) {
            isClicking = true;
            score += 1;
            scoreElement.textContent = score;

            let progress = (score % 100) / 100;
            progressBarFill.style.width = progress * 100 + "%";

            if (score % 100 === 0) {
                progressBarFill.style.width = "0%";
            }

            // Анимация картинки
            clickImage.style.transform = "scale(1)";
            setTimeout(() => {
                clickImage.style.transform = "scale(0.6)";
                isClicking = false; // Сбрасываем флаг после завершения анимации
            }, 100);

            // Вылетающие цифры
            createFlyingScore(event.clientX, event.clientY);
        }
    }

    function createFlyingScore(x, y) {
        const flyingScore = document.createElement("div");
        flyingScore.className = "flying-score";
        flyingScore.textContent = "+1123 🤡";

        // Позиционирование цифр в месте клика
        flyingScore.style.left = x - imageContainer.getBoundingClientRect().left + "px";
        flyingScore.style.top = y - imageContainer.getBoundingClientRect().top + "px";

        imageContainer.appendChild(flyingScore);

        // Удаление цифр после завершения анимации
        setTimeout(() => {
            flyingScore.remove();
        }, 1000);
    }

    imageContainer.addEventListener("mousedown", increaseScore);
    imageContainer.addEventListener("mouseup", () => {
        isClicking = false; // Сбрасываем флаг при отпускании мыши
    });
});
