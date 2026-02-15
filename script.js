const reel1 = document.getElementById("reel1");
const reel2 = document.getElementById("reel2");
const reel3 = document.getElementById("reel3");
const spinBtn = document.getElementById("spinBtn");
const message = document.getElementById("message");
const spinCountDisplay = document.getElementById("spinCount");

const spinSound = document.getElementById("spinSound");
const jackpotSound = document.getElementById("jackpotSound");
const buttonSound = document.getElementById("buttonSound");

const emojis = ["🍒", "🍋", "🔔", "💎", "7", "⭐", "💰"];

let spinCount = 0;
let cooldown = false;

function randomEmoji() {
    return emojis[Math.floor(Math.random() * emojis.length)];
}

function spinReels() {
    if (cooldown) return;

    cooldown = true;
    spinBtn.disabled = true;
    buttonSound.play();

    spinCount++;
    spinCountDisplay.textContent = spinCount;

    message.textContent = "Girando...";
    spinSound.play();

    let interval = setInterval(() => {
        reel1.textContent = randomEmoji();
        reel2.textContent = randomEmoji();
        reel3.textContent = randomEmoji();
    }, 100);

    setTimeout(() => {
        clearInterval(interval);
        spinSound.pause();
        spinSound.currentTime = 0;

        if (spinCount % 5 === 0) {
            reel1.textContent = "7";
            reel2.textContent = "7";
            reel3.textContent = "7";

            message.textContent = "🎉 JACKPOT 777 🎉";
            document.querySelector(".slot-machine").classList.add("jackpot");
            jackpotSound.play();
        } else {
            message.textContent = "Intenta de nuevo";
            document.querySelector(".slot-machine").classList.remove("jackpot");
        }

    }, 2000);

    setTimeout(() => {
        cooldown = false;
        spinBtn.disabled = false;
    }, 3000);
}

spinBtn.addEventListener("click", spinReels);
