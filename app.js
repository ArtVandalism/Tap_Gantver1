document.addEventListener("DOMContentLoaded", function () {
    const scoreElement = document.getElementById("score");
    const imageContainer = document.getElementById("imageContainer");
    const clickImage = document.getElementById("clickImage");
    const progressBarFill = document.getElementById("progressBarFill");
    const celebrationText = document.getElementById("celebration");
    const body = document.body;

    let score = parseInt(localStorage.getItem("score")) || 0;
    let animationTriggered = false; // Флаг для проверки, запущена ли анимация

    // Устанавливаем начальный масштаб изображения на 60% при загрузке страницы
    clickImage.style.transform = "scale(0.6)";
    celebrationText.style.opacity = "0"; // Скрываем текст при загрузке страницы

    // Отображение сохраненного количества очков
    scoreElement.textContent = score;
    progressBarFill.style.width = (score % 100) + "%";

    function increaseScore(x, y) {
        score += 1;
        scoreElement.textContent = score;

        let progress = (score % 100) / 100;
        progressBarFill.style.width = progress * 100 + "%";

        // Сохранение количества очков в localStorage
        localStorage.setItem("score", score);

        if (score % 100 === 0) {
            progressBarFill.style.width = "0%";
            triggerCelebration();
        }

        // Анимация картинки
        clickImage.style.transform = "scale(1)";
        setTimeout(() => {
            clickImage.style.transform = "scale(0.5)";
        }, 100);

        // Вылетающие цифры
        createFlyingScore(x, y);
    }

    function createFlyingScore(x, y) {
        const flyingScore = document.createElement("div");
        flyingScore.className = "flying-score";
        flyingScore.textContent = "+1123 🤡";

        // Позиционирование цифр в месте клика с небольшим смещением вверх и влево
        const offsetX = 100; // смещение влево
        const offsetY = 100; // смещение вверх
        flyingScore.style.left = x - imageContainer.getBoundingClientRect().left - offsetX + "px";
        flyingScore.style.top = y - imageContainer.getBoundingClientRect().top - offsetY + "px";

        imageContainer.appendChild(flyingScore);

        // Удаление цифр после завершения анимации
        setTimeout(() => {
            flyingScore.remove();
        }, 500);
    }

    function triggerCelebration() {
        // Запуск радужной анимации фона
        if (!animationTriggered) {
            body.classList.add('rainbow-background');
            animationTriggered = true;
            
            // Скрыть текст через 2 секунды
            setTimeout(() => {
                celebrationText.style.opacity = "0"; // Скрыть текст
                celebrationText.style.visibility = "hidden"; // Убедиться, что элемент скрыт
                celebrationText.style.pointerEvents = "none"; // Отключить клики на элемент
            }, 1000);
        }
    }

    // Обработчик касания для поддержки мультитача
    function handleTouchStart(event) {
        event.preventDefault(); // Предотвратить стандартное поведение браузера

        // Обработка всех точек касания
        for (let i = 0; i < event.changedTouches.length; i++) {
            const touch = event.changedTouches[i];
            increaseScore(touch.clientX, touch.clientY);
        }
    }

    // Добавляем обработчик события касания и клика к контейнеру
    imageContainer.addEventListener("touchstart", handleTouchStart);
    imageContainer.addEventListener("click", (event) => {
        // Обработка кликов для поддержки однопальцевого ввода
        increaseScore(event.clientX, event.clientY);
    });
});
