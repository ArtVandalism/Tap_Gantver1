document.addEventListener("DOMContentLoaded", function () {
    const scoreElement = document.getElementById("score");
    const imageContainer = document.getElementById("imageContainer");
    const clickImage = document.getElementById("clickImage");
    const progressBarFill = document.getElementById("progressBarFill");
    const snackBar = document.getElementById("snackBar");

    let score = 0;

    function increaseScore() {
        score += 1;
        scoreElement.textContent = score;

        let progress = (score % 100) / 100;
        progressBarFill.style.width = progress * 100 + "%";

        if (score % 100 === 0) {
            showSnackBar();
            progressBarFill.style.width = "0%";
        }

        clickImage.style.transform = "scale(1)";
        setTimeout(() => {
            clickImage.style.transform = "scale(0.6)";
        }, 100);
    }

    function showSnackBar() {
        snackBar.style.display = "block";
        setTimeout(() => {
            snackBar.style.display = "none";
        }, 2000);
    }

    imageContainer.addEventListener("click", increaseScore);
});
