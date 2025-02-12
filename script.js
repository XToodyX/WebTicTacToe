const fields = document.querySelectorAll('.field');
const mainSection = document.querySelector('main');

let gameFields = [];
let winCombinations = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8],
    [2, 4, 6], 
];

for (let i = 0; i < 9; i++) {
    gameFields[i] = ' ';
};

let currentPlayer = 1;

function renderX() {
    return `
    <div class="x">
        <span></span>
        <span></span>
    </div>
    `;
}

function renderO() {
    return `
        <div class="o"></div>
    `;
}

function renderErrorText() {
    return `<p class="errorText">Hold on! You cannot place your icon on top of one other. Think carefully again ...</p>`;
}

function isNoIcon() {    
    return !this.innerHTML;
}

function isWin(playerIcon) {
    for (let combination of winCombinations) {
        if (gameFields[combination[0]] === playerIcon && gameFields[combination[1]] === playerIcon && gameFields[combination[2]] === playerIcon) {
            return true;
        }
    }
    return false;
}

function renderWinningText(player) {
    return `<p class="winningText">🎉 Congratulation Player ${player}, you won the game! 🎉</p>`;
}

function renderRestartButton() {
    return `
    <button class="restartBtn" onclick="restartGame()">
        <img src="restart-icon.svg" alt="restart-button" id="restartIcon">
    </button>
    `;
}

function restartGame() {
    const winningText = document.querySelector('.winningText');
    const restartBtn = document.querySelector('.restartBtn');
    if (winningText) winningText.remove();
    if (restartBtn) restartBtn.remove();

    gameFields = Array(9).fill(' ');

    fields.forEach(field => {
        field.innerHTML = '';
    });

    currentPlayer = 1;
}

function renderIcon() {
    if (isNoIcon.call(this)) {
        if (document.querySelector('.errorText')) {
            document.querySelector('.errorText').remove();
        }

        if (currentPlayer === 1) {
            this.innerHTML = renderX();
            gameFields[this.getAttribute('data-id') - 1] = 'X';
            
            if(isWin('X')) {
                mainSection.insertAdjacentHTML('beforeend', renderWinningText(1));
                mainSection.insertAdjacentHTML('beforeend', renderRestartButton());
            }
            currentPlayer = 2;
        } else if (currentPlayer === 2) {
            this.innerHTML = renderO();
            gameFields[this.getAttribute('data-id') - 1] = 'O';
            
            if (isWin('O')) {
                mainSection.insertAdjacentHTML('beforeend', renderWinningText(2));
                mainSection.insertAdjacentHTML('beforeend', renderRestartButton());
            }
            currentPlayer = 1;
        }
    } else {
        if (!document.querySelector('.errorText')) {
            mainSection.insertAdjacentHTML('beforeend', renderErrorText());
        }
    }
}

fields.forEach(field => {    
    field.addEventListener('click', renderIcon);
})