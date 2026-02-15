const reels = [
    document.getElementById("reel1"),
    document.getElementById("reel2"),
    document.getElementById("reel3")
];

const spinBtn = document.getElementById("spinBtn");
const message = document.getElementById("message");
const spinCountDisplay = document.getElementById("spinCount");

const spinSound = document.getElementById("spinSound");
const jackpotSound = document.getElementById("jackpotSound");
const buttonSound = document.getElementById("buttonSound");

const loseSound = new Audio("sounds/lose.mp3");

const emojis = ["🍒","🍋","🔔","💎","⭐","💰","7"];

let spinCount = 0;
let spinning = false;

function randomEmoji() {
    return emojis[Math.floor(Math.random() * emojis.length)];
}

function startSpin() {
    if (spinning) return;

    spinning = true;
    spinBtn.disabled = true;

    buttonSound.play();

    spinCount++;
    spinCountDisplay.textContent = spinCount;

    message.textContent = "Girando...";
    spinSound.currentTime = 0;
    spinSound.play();

    let startTime = Date.now();

    const interval = setInterval(() => {
        reels.forEach(reel => {
            reel.textContent = randomEmoji();
            reel.style.transform = "translateY(-10px)";
            setTimeout(() => reel.style.transform = "translateY(0px)", 100);
        });
    }, 100);

    setTimeout(() => {
        clearInterval(interval);
        spinSound.pause();
        spinSound.currentTime = 0;

        let isJackpot = spinCount % 5 === 0;

        if (isJackpot) {
            reels.forEach(r => r.textContent = "7");

            message.textContent = "🎉 JACKPOT 777 🎉";
            jackpotSound.currentTime = 0;
            jackpotSound.play();

            document.querySelector(".slot-machine")
                .classList.add("jackpot");

            createConfetti();

            setTimeout(() => {
                document.querySelector(".slot-machine")
                    .classList.remove("jackpot");
            }, 4000);

        } else {
            message.textContent = "Intenta de nuevo";
            loseSound.play();
        }

        spinning = false;
        spinBtn.disabled = false;

    }, 5000); // EXACTAMENTE 5 SEGUNDOS
}

spinBtn.addEventListener("click", startSpin);

function createConfetti() {
    for (let i = 0; i < 30; i++) {
        let confetti = document.createElement("div");
        confetti.textContent = "✨";
        confetti.style.position = "fixed";
        confetti.style.left = Math.random() * 100 + "vw";
        confetti.style.top = "-10px";
        confetti.style.fontSize = "20px";
        confetti.style.animation = "fall 3s linear forwards";
        document.body.appendChild(confetti);

        setTimeout(() => confetti.remove(), 3000);
    }
}
