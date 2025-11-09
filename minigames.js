// 🎮 MINIJUEGOS - COFRADÍA DIGITAL
// Sopa de letras, Trivial y Memoria

// ============================
// 🔤 SOPA DE LETRAS
// ============================
const WORDSEARCH_WORDS = [
    { word: 'SEMANA', reward: 10 },
    { word: 'SANTA', reward: 10 },
    { word: 'PASIÓN', reward: 15 },
    { word: 'CRISTO', reward: 15 },
    { word: 'VIRGEN', reward: 15 },
    { word: 'CRUZ', reward: 8 },
    { word: 'PROCESIÓN', reward: 20 },
    { word: 'HERMANDAD', reward: 18 },
    { word: 'COFRADÍA', reward: 18 },
    { word: 'NACARADO', reward: 12 },
    { word: 'CAPERUZA', reward: 12 },
    { word: 'COSTALERO', reward: 16 },
    { word: 'NAZARENO', reward: 14 },
    { word: 'TRONO', reward: 10 },
    { word: 'PASO', reward: 8 }
];

class WordSearchGame {
    constructor() {
        this.grid = [];
        this.foundWords = [];
        this.currentSelection = [];
        this.words = [...WORDSEARCH_WORDS];
        this.gridSize = 15;
        this.isSelecting = false;
    }

    generateGrid() {
        this.grid = Array(this.gridSize).fill(null).map(() => Array(this.gridSize).fill(''));

        this.words.forEach(wordObj => {
            this.placeWord(wordObj.word);
        });

        for (let i = 0; i < this.gridSize; i++) {
            for (let j = 0; j < this.gridSize; j++) {
                if (this.grid[i][j] === '') {
                    this.grid[i][j] = String.fromCharCode(65 + Math.floor(Math.random() * 26));
                }
            }
        }
    }

    placeWord(word) {
        const directions = [
            [0, 1], [1, 0], [1, 1], [-1, 1],
            [0, -1], [-1, 0], [-1, -1], [1, -1]
        ];

        let placed = false;
        let attempts = 0;

        while (!placed && attempts < 100) {
            const direction = directions[Math.floor(Math.random() * directions.length)];
            const startRow = Math.floor(Math.random() * this.gridSize);
            const startCol = Math.floor(Math.random() * this.gridSize);

            if (this.canPlaceWord(word, startRow, startCol, direction)) {
                this.placeWordInGrid(word, startRow, startCol, direction);
                placed = true;
            }
            attempts++;
        }

        if (!placed) {
            const row = Math.floor(Math.random() * this.gridSize);
            const col = Math.floor(Math.random() * (this.gridSize - word.length));
            this.placeWordInGrid(word, row, col, [0, 1]);
        }
    }

    canPlaceWord(word, row, col, direction) {
        for (let i = 0; i < word.length; i++) {
            const newRow = row + i * direction[0];
            const newCol = col + i * direction[1];

            if (newRow < 0 || newRow >= this.gridSize || newCol < 0 || newCol >= this.gridSize) {
                return false;
            }

            if (this.grid[newRow][newCol] !== '' && this.grid[newRow][newCol] !== word[i]) {
                return false;
            }
        }
        return true;
    }

    placeWordInGrid(word, row, col, direction) {
        for (let i = 0; i < word.length; i++) {
            const newRow = row + i * direction[0];
            const newCol = col + i * direction[1];
            this.grid[newRow][newCol] = word[i];
        }
    }

    checkWord(selection) {
        const selectedWord = selection.map(cell => cell.letter).join('');
        const reversedWord = selectedWord.split('').reverse().join('');

        const foundWord = this.words.find(w => w.word === selectedWord || w.word === reversedWord);

        if (foundWord && !this.foundWords.includes(foundWord.word)) {
            this.foundWords.push(foundWord.word);
            return foundWord;
        }

        return null;
    }
}

// ============================
// 🧩 TRIVIA
// ============================
let triviaGame = null;

function initTrivia() {
    triviaGame = {
        questions: [...window.TRIVIA_QUESTIONS].sort(() => Math.random() - 0.5),
        currentQuestion: 0,
        score: 0,
        answered: false
    };

    showNextTriviaQuestion();
}

function showNextTriviaQuestion() {
    if (triviaGame.currentQuestion >= triviaGame.questions.length) {
        endTriviaGame();
        return;
    }

    const question = triviaGame.questions[triviaGame.currentQuestion];
    triviaGame.answered = false;

    const gameArea = document.getElementById('gameArea');
    gameArea.innerHTML = `
        <div class="trivia-container">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                <h2 style="color: #FFD700; margin: 0;">❓ Trivial Cofrade</h2>
                <button onclick="closeMinigame()" style="background: #dc3545; color: white; border: none; padding: 0.5rem 1rem; border-radius: 15px; cursor: pointer;">❌ Cerrar</button>
            </div>
            <div style="text-align: center; margin-bottom: 1rem; color: #d4af37;">
                Pregunta ${triviaGame.currentQuestion + 1} de ${triviaGame.questions.length} | Puntuación: ${triviaGame.score}
            </div>
            <div class="question-text">${question.question}</div>
            <div class="answer-buttons">
                ${question.answers.map((answer, index) => `
                    <button class="answer-btn" onclick="selectTriviaAnswer(${index})">${answer}</button>
                `).join('')}
            </div>
            <div id="trivia-feedback" style="margin-top: 1rem; text-align: center; min-height: 30px;"></div>
        </div>
    `;
}

function selectTriviaAnswer(selectedIndex) {
    if (triviaGame.answered) return;

    triviaGame.answered = true;
    const question = triviaGame.questions[triviaGame.currentQuestion];
    const buttons = document.querySelectorAll('.answer-btn');
    const feedback = document.getElementById('trivia-feedback');

    buttons.forEach((btn, index) => {
        btn.disabled = true;
        if (index === question.correct) {
            btn.classList.add('correct');
        } else if (index === selectedIndex && selectedIndex !== question.correct) {
            btn.classList.add('incorrect');
        }
    });

    if (selectedIndex === question.correct) {
        triviaGame.score += 50;
        feedback.innerHTML = `<div style="color: #00ff00; font-weight: bold;">¡Correcto! +50 monedas 💰</div>`;
        window.addCoins(50);
    } else {
        feedback.innerHTML = `<div style="color: #ff4444;">Incorrecto. ${question.explanation}</div>`;
    }

    setTimeout(() => {
        triviaGame.currentQuestion++;
        showNextTriviaQuestion();
    }, 2000);
}

function endTriviaGame() {
    const gameArea = document.getElementById('gameArea');
    gameArea.innerHTML = `
        <div class="trivia-container" style="text-align: center;">
            <h2 style="color: #FFD700;">¡Trivia Completada! 🎉</h2>
            <div style="font-size: 1.5rem; margin: 2rem 0; color: #d4af37;">
                Puntuación final: ${triviaGame.score} monedas
            </div>
            <button onclick="closeMinigame()" class="game-btn" style="background: linear-gradient(145deg, #FFD700, #d4af37); color: #000;">
                Volver al juego
            </button>
        </div>
    `;
}

// ============================
// 🧠 MEMORIA
// ============================
const MEMORY_CARDS = [
    { id: 1, icon: "✝️", name: "Cruz" },
    { id: 2, icon: "🌹", name: "Rosa" },
    { id: 3, icon: "🕊️", name: "Paloma" },
    { id: 4, icon: "⛪", name: "Iglesia" },
    { id: 5, icon: "🎺", name: "Trompeta" },
    { id: 6, icon: "🌿", name: "Ramo" },
    { id: 7, icon: "🏛️", name: "Templo" },
    { id: 8, icon: "🔔", name: "Campana" }
];

let memoryGame = null;

function initMemory() {
    memoryGame = {
        cards: [...MEMORY_CARDS, ...MEMORY_CARDS].sort(() => Math.random() - 0.5),
        flippedCards: [],
        matchedCards: [],
        moves: 0,
        maxMoves: 20,
        reward: 200
    };

    const gameArea = document.getElementById('gameArea');
    gameArea.innerHTML = `
        <div class="memory-container">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                <h2 style="color: #FFD700; margin: 0;">🧠 Encuentra las Parejas</h2>
                <button onclick="closeMinigame()" style="background: #dc3545; color: white; border: none; padding: 0.5rem 1rem; border-radius: 15px; cursor: pointer;">❌ Cerrar</button>
            </div>
            <div style="text-align: center; margin-bottom: 1rem; color: #d4af37;">
                Movimientos: <span id="memory-moves">0</span>/${memoryGame.maxMoves} | Parejas: <span id="memory-pairs">0</span>/${MEMORY_CARDS.length}
            </div>
            <div class="memory-grid" id="memory-grid"></div>
            <div id="memory-feedback" style="margin-top: 1rem; text-align: center; min-height: 30px;"></div>
        </div>
    `;

    renderMemoryGrid();
}

function renderMemoryGrid() {
    const grid = document.getElementById('memory-grid');
    if (!grid) return;

    grid.innerHTML = '';

    memoryGame.cards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.className = 'memory-card';
        cardElement.dataset.cardId = card.id;
        cardElement.dataset.index = index;

        cardElement.innerHTML = `
            <span style="display: none;">${card.icon}</span>
            <div style="font-size: 1rem; color: #d4af37;">?</div>
        `;

        cardElement.addEventListener('click', () => flipMemoryCard(index));
        grid.appendChild(cardElement);
    });
}

function flipMemoryCard(index) {
    const cardElement = document.querySelector(`[data-index="${index}"]`);
    if (!cardElement || memoryGame.flippedCards.length >= 2 || memoryGame.flippedCards.includes(index) || memoryGame.matchedCards.includes(index)) {
        return;
    }

    const card = memoryGame.cards[index];
    cardElement.classList.add('flipped');
    cardElement.querySelector('span').style.display = 'block';
    cardElement.querySelector('div').style.display = 'none';

    memoryGame.flippedCards.push(index);

    if (memoryGame.flippedCards.length === 2) {
        memoryGame.moves++;
        document.getElementById('memory-moves').textContent = memoryGame.moves;

        setTimeout(() => {
            checkMemoryMatch();
        }, 1000);
    }
}

function checkMemoryMatch() {
    const [index1, index2] = memoryGame.flippedCards;
    const card1 = memoryGame.cards[index1];
    const card2 = memoryGame.cards[index2];

    const cardElement1 = document.querySelector(`[data-index="${index1}"]`);
    const cardElement2 = document.querySelector(`[data-index="${index2}"]`);

    if (card1.id === card2.id) {
        cardElement1.classList.add('matched');
        cardElement2.classList.add('matched');
        memoryGame.matchedCards.push(index1, index2);

        document.getElementById('memory-pairs').textContent = memoryGame.matchedCards.length / 2;

        if (memoryGame.matchedCards.length === memoryGame.cards.length) {
            setTimeout(() => {
                endMemoryGame(true);
            }, 500);
        }
    } else {
        cardElement1.classList.remove('flipped');
        cardElement2.classList.remove('flipped');
        cardElement1.querySelector('span').style.display = 'none';
        cardElement2.querySelector('span').style.display = 'none';
        cardElement1.querySelector('div').style.display = 'block';
        cardElement2.querySelector('div').style.display = 'block';
    }

    memoryGame.flippedCards = [];

    if (memoryGame.moves >= memoryGame.maxMoves && memoryGame.matchedCards.length < memoryGame.cards.length) {
        setTimeout(() => {
            endMemoryGame(false);
        }, 500);
    }
}

function endMemoryGame(completed) {
    const gameArea = document.getElementById('gameArea');
    let message = '';
    let reward = 0;

    if (completed) {
        message = `¡Felicidades! ¡Completaste el juego en ${memoryGame.moves} movimientos! 🎉`;
        reward = memoryGame.reward;
        window.addCoins(reward);
    } else {
        message = `Se agotaron los movimientos. ¡Inténtalo de nuevo! 😔`;
    }

    gameArea.innerHTML = `
        <div class="memory-container" style="text-align: center;">
            <h2 style="color: #FFD700;">Juego Terminado</h2>
            <div style="font-size: 1.2rem; margin: 2rem 0; color: #d4af37;">
                ${message}
                ${reward > 0 ? `<br>¡Ganaste ${reward} monedas! 💰` : ''}
            </div>
            <button onclick="initMemory()" class="game-btn" style="margin-right: 1rem;">
                Jugar de Nuevo
            </button>
            <button onclick="closeMinigame()" class="game-btn">
                Volver al juego
            </button>
        </div>
    `;
}

// ============================
// 🎮 SISTEMA DE MINIJUEGOS
// ============================
let currentMinigame = null;

function playMinigame(gameType) {
    const gameArea = document.getElementById('gameArea');
    if (!gameArea) return;

    currentMinigame = gameType;
    gameArea.classList.remove('hidden');
    gameArea.innerHTML = '';

    switch(gameType) {
        case 'wordsearch':
            initWordsearch();
            break;
        case 'trivia':
            initTrivia();
            break;
        case 'memory':
            initMemory();
            break;
    }
}

function closeMinigame() {
    const gameArea = document.getElementById('gameArea');
    if (gameArea) {
        gameArea.classList.add('hidden');
        gameArea.innerHTML = '';
    }
    currentMinigame = null;
}

function initWordsearch() {
    const game = new WordSearchGame();
    game.generateGrid();

    const gameArea = document.getElementById('gameArea');
    gameArea.innerHTML = `
        <div class="wordsearch-container">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                <h2 style="color: #FFD700; margin: 0;">🔤 Sopa de Letras</h2>
                <button onclick="closeMinigame()" style="background: #dc3545; color: white; border: none; padding: 0.5rem 1rem; border-radius: 15px; cursor: pointer;">❌ Cerrar</button>
            </div>
            <div id="wordsearch-selected-word" style="text-align: center; margin-bottom: 1rem; font-size: 1.2rem; color: #FFD700; min-height: 30px;"></div>
            <div id="wordsearch-grid" class="wordsearch-grid" style="display: grid; gap: 2px; justify-content: center; margin: 1rem 0;"></div>
            <div id="wordsearch-words" class="wordsearch-list"></div>
            <div id="wordsearch-score" style="text-align: center; margin-top: 1rem; color: #d4af37;">
                Palabras encontradas: <span id="found-count">0</span>/${game.words.length}
            </div>
        </div>
    `;

    // Renderizar grid
    const gridContainer = document.getElementById('wordsearch-grid');
    gridContainer.style.gridTemplateColumns = `repeat(${game.gridSize}, 40px)`;

    for (let row = 0; row < game.gridSize; row++) {
        for (let col = 0; col < game.gridSize; col++) {
            const cell = document.createElement('div');
            cell.className = 'wordsearch-cell';
            cell.textContent = game.grid[row][col];
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.dataset.letter = game.grid[row][col];

            cell.addEventListener('mousedown', (e) => startWordSelection(e, game));
            cell.addEventListener('mouseenter', (e) => continueWordSelection(e, game));
            cell.addEventListener('mouseup', (e) => endWordSelection(e, game));
            cell.addEventListener('touchstart', (e) => handleTouchStart(e, game), { passive: false });
            cell.addEventListener('touchmove', (e) => handleTouchMove(e, game), { passive: false });
            cell.addEventListener('touchend', (e) => handleTouchEnd(e, game), { passive: false });

            gridContainer.appendChild(cell);
        }
    }

    // Renderizar lista de palabras
    const wordsContainer = document.getElementById('wordsearch-words');
    game.words.forEach(wordObj => {
        const wordElement = document.createElement('div');
        wordElement.className = 'word-item';
        wordElement.textContent = wordObj.word;
        wordElement.dataset.word = wordObj.word;

        if (game.foundWords.includes(wordObj.word)) {
            wordElement.classList.add('found');
        }

        wordsContainer.appendChild(wordElement);
    });
}

function startWordSelection(e, game) {
    e.preventDefault();
    game.isSelecting = true;
    game.currentSelection = [];

    const cell = e.target;
    const row = parseInt(cell.dataset.row);
    const col = parseInt(cell.dataset.col);

    game.currentSelection.push({
        row, col, letter: cell.dataset.letter, element: cell
    });

    cell.classList.add('selected');
    updateSelectedWord(game);
}

function continueWordSelection(e, game) {
    if (!game.isSelecting) return;
    e.preventDefault();

    const cell = e.target;
    const row = parseInt(cell.dataset.row);
    const col = parseInt(cell.dataset.col);

    const lastCell = game.currentSelection[game.currentSelection.length - 1];
    const rowDiff = Math.abs(row - lastCell.row);
    const colDiff = Math.abs(col - lastCell.col);

    if (rowDiff <= 1 && colDiff <= 1 && !(rowDiff === 0 && colDiff === 0)) {
        const alreadySelected = game.currentSelection.some(c => c.row === row && c.col === col);

        if (!alreadySelected) {
            game.currentSelection.push({
                row, col, letter: cell.dataset.letter, element: cell
            });
            cell.classList.add('selected');
            updateSelectedWord(game);
        }
    }
}

function endWordSelection(e, game) {
    if (!game.isSelecting) return;
    e.preventDefault();

    game.isSelecting = false;

    if (game.currentSelection.length > 1) {
        const foundWord = game.checkWord(game.currentSelection);

        if (foundWord) {
            game.currentSelection.forEach(cell => {
                cell.element.classList.remove('selected');
                cell.element.classList.add('found');
            });

            // Actualizar UI
            const wordElement = document.querySelector(`[data-word="${foundWord.word}"]`);
            if (wordElement) wordElement.classList.add('found');

            document.getElementById('found-count').textContent = game.foundWords.length;

            // Recompensa
            window.addCoins(foundWord.reward);
            window.showMessage(`¡Encontraste "${foundWord.word}"! +${foundWord.reward} monedas 💰`, 'success');

            if (game.foundWords.length === game.words.length) {
                setTimeout(() => {
                    window.showMessage('¡Felicidades! ¡Completaste la sopa de letras! 🎉', 'success');
                    window.addCoins(100);
                }, 500);
            }
        } else {
            game.currentSelection.forEach(cell => {
                cell.element.classList.remove('selected');
            });
        }
    } else if (game.currentSelection.length === 1) {
        game.currentSelection[0].element.classList.remove('selected');
    }

    game.currentSelection = [];
    updateSelectedWord(game);
}

function updateSelectedWord(game) {
    const selectedWordElement = document.getElementById('wordsearch-selected-word');
    if (!selectedWordElement) return;

    if (game.currentSelection.length > 0) {
        const word = game.currentSelection.map(cell => cell.letter).join('');
        selectedWordElement.textContent = word;
    } else {
        selectedWordElement.textContent = '';
    }
}

function handleTouchStart(e, game) {
    e.preventDefault();
    startWordSelection(e, game);
}

function handleTouchMove(e, game) {
    e.preventDefault();
    const touch = e.touches[0];
    const element = document.elementFromPoint(touch.clientX, touch.clientY);
    if (element && element.classList.contains('wordsearch-cell')) {
        continueWordSelection({ target: element }, game);
    }
}

function handleTouchEnd(e, game) {
    e.preventDefault();
    endWordSelection(e, game);
}

// ============================
// 🌍 FUNCIONES GLOBALES
// ============================
window.playMinigame = playMinigame;
window.closeMinigame = closeMinigame;
window.selectTriviaAnswer = selectTriviaAnswer;
window.flipMemoryCard = flipMemoryCard;
window.initMemory = initMemory;
