const gameSummary = {
    numbers: 0,
    wins: 0,
    losses: 0,
    draws: 0
};
const game = {
    playerHand: "",
    aiHand: "",
};
const hands = [...document.querySelectorAll('.select img')];


function handSelection() {

    game.playerHand = this.dataset.option;
    console.log(game.playerHand);
    hands.forEach(hand => hand.style.boxShadow = '');
    this.style.boxShadow = '0 0 0 4px red';
}

function startGame() {
    game.aiHand = aiChoice();
    if (!game.playerHand) alert("wybierz dłoń!")
    const gameResult = checkResult(game.playerHand, game.aiHand);
    console.log(gameResult + " wynik");
    publishResult(game.playerHand, game.aiHand, gameResult)
}

function aiChoice() {
    return hands[Math.floor(Math.random() * 3)].dataset.option;
}

function checkResult(player, ai) {
    console.log(player + "  " + ai);
    if (player === ai) {
        return 'draw';
    } else if (player === "papier") {
        if (ai === "nożyczki") {
            return 'loss';
        }
        if (ai === "kamień") {
            return 'win';
        }
    }
    else if (player === "kamień") {
        if (ai === "papier") {
            return 'loss';
        }
        if (ai === "nożyczki") {
            return 'win';
        }
    }
    else if (player === "nożyczki") {
        if (ai === "papier") {
            return 'win';
        }
        if (ai === "kamień") {
            return 'loss';
        }
    }
}

function publishResult(player, ai, result) {
    document.querySelector('[data-summary="your-choice"]').textContent = player;
    document.querySelector('[data-summary="ai-choice"]').textContent = ai;
    document.querySelector('p.numbers span').textContent = ++gameSummary.numbers;
    if (result === 'win') {
        document.querySelector('p.wins span').textContent = ++gameSummary.wins;
        document.querySelector('[data-summary="who-win"]').textContent="Ty wygrałeś";
        document.querySelector('[data-summary="who-win"]').style.color = "green";

    }
    else if (result === 'loss') {
        document.querySelector('p.losses span').textContent = ++gameSummary.losses;
        document.querySelector('[data-summary="who-win"]').textContent="Komputer wygrał";
        document.querySelector('[data-summary="who-win"]').style.color = "red";

    }
    else if (result === 'draw') {
        document.querySelector('p.draws span').textContent = ++gameSummary.draws;
        document.querySelector('[data-summary="who-win"]').textContent="Remis";
        document.querySelector('[data-summary="who-win"]').style.color = "blue";

    }
}

hands.forEach(hand => hand.addEventListener('click', handSelection));
document.querySelector('.start').addEventListener('click', startGame);
