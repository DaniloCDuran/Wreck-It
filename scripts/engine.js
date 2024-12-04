const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
    },
    values: {
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
        lives: 3, // Adiciona o contador de vidas
    },
    actions: {
        timerId: null,
        countDownTimer: setInterval(countDown, 1000),
    }
};

function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if (state.values.currentTime <= 0) {
        if (state.values.result < 20) { // Verifica se a pontuação foi menor que 20
            state.values.lives--; // Reduz uma vida
            alert(`Você perdeu uma vida! Vidas restantes: ${state.values.lives}`);
        }
        resetGame(); // Reinicia a rodada ou termina o jogo
    }

    if (state.values.lives <= 0) {
        clearInterval(state.actions.countDownTimer);
        clearInterval(state.actions.timerId);
        alert("Game Over! Você perdeu todas as vidas.");
    }
}

function resetGame() {
    state.values.currentTime = 60; // Reinicia o tempo
    state.values.result = 0; // Reseta a pontuação para a nova rodada
    state.view.score.textContent = state.values.result; // Atualiza o placar
    if (state.values.lives > 0) {
        alert("Nova rodada! Alcance 20 pontos antes do tempo acabar.");
    }
}

function playSound() {
    let audio = new Audio("./audio/hit.m4a");
    audio.play();
}

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * state.view.squares.length);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

function moveEnemy() {
    state.actions.timerId = setInterval(randomSquare, state.values.gameVelocity);
}

function addListenerHitbox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.id === state.values.hitPosition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound();
            }
        });
    });
}

function initialize() {
    moveEnemy();
    addListenerHitbox();
}

initialize();


