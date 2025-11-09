// 🎯 SISTEMA PRINCIPAL DEL JUEGO - COFRADÍA DIGITAL

// 🎮 VARIABLES GLOBALES DEL JUEGO
let gameState = {
    coins: 1500,
    characters: [],
    pityCount: 0,
    currentUser: null,
    musicPlaying: false
};

// 📊 ESTADÍSTICAS DE PROBABILIDADES
const PROBABILITIES = {
    legendary: 4.0,
    epic: 4.5,
    rare: 30.0,
    common: 61.5
};

// 🏛️ BASE DE DATOS DE PERSONAJES
const CHARACTER_DATABASE = [
    // LEGENDARIAS (4%)
    { name: "Jesús del Gran Poder", city: "Sevilla", rarity: "legendary", icon: "✝️", description: "Cristo más venerado de Sevilla" },
    { name: "Virgen de la Macarena", city: "Sevilla", rarity: "legendary", icon: "🌹", description: "Patrona de Sevilla" },
    { name: "Virgen de la Esperanza", city: "Triana", rarity: "legendary", icon: "🕊️", description: "Reina de Triana" },
    { name: "Cristo de los Gitanos", city: "Sevilla", rarity: "legendary", icon: "🌙", description: "Hermandad gitana" },
    { name: "Virgen del Rocío", city: "Almonte", rarity: "legendary", icon: "🏹", description: "Romería más famosa" },
    { name: "Cristo de la Buena Muerte", city: "Málaga", rarity: "legendary", icon: "⚔️", description: "Legión española" },
    
    // ÉPICAS (4.5%)
    { name: "San Gonzalo", city: "Sevilla", rarity: "epic", icon: "🎺", description: "Trompetas gloriosas" },
    { name: "El Cachorro", city: "Sevilla", rarity: "epic", icon: "🦁", description: "Torero devoto" },
    { name: "La Hiniesta", city: "Sevilla", rarity: "epic", icon: "🌿", description: "Verde esperanza" },
    { name: "Los Javieres", city: "Málaga", rarity: "epic", icon: "🎖️", description: "Milicia cofrade" },
    { name: "El Silencio", city: "Sevilla", rarity: "epic", icon: "🤫", description: "Procesión muda" },
    { name: "El Paso", city: "Málaga", rarity: "epic", icon: "🚶", description: "Cristo atado a la columna" },
    { name: "La Pollinica", city: "Málaga", rarity: "epic", icon: "🐝", description: "Reina de las flores" },
    { name: "La Estrella", city: "Sevilla", rarity: "epic", icon: "⭐", description: "Estrella de Belén" },
    
    // RARAS (30%)
    { name: "El Museo", city: "Sevilla", rarity: "rare", icon: "🏛️", description: "Hermandad del museo" },
    { name: "El Calvario", city: "Sevilla", rarity: "rare", icon: "⛰️", description: "Camino al Gólgota" },
    { name: "La Paz", city: "Sevilla", rarity: "rare", icon: "🕊️", description: "Paz y serenidad" },
    { name: "El Dulce Nombre", city: "Sevilla", rarity: "rare", icon: "📿", description: "Nombre de Jesús" },
    { name: "Santa Marta", city: "Sevilla", rarity: "rare", icon: "⚰️", description: "Sepelio de Cristo" },
    { name: "Las Penas", city: "Sevilla", rarity: "rare", icon: "😢", description: "Dolor y tristeza" },
    { name: "El Baratillo", city: "Sevilla", rarity: "rare", icon: "🎯", description: "Mercado y devoción" },
    { name: "El Sol", city: "Málaga", rarity: "rare", icon: "☀️", description: "Luz divina" },
    { name: "La Victoria", city: "Málaga", rarity: "rare", icon: "🏆", description: "Triunfo de la fe" },
    { name: "La Merced", city: "Málaga", rarity: "rare", icon: "🔗", description: "Cautivos liberados" },
    { name: "El Rocío", city: "Málaga", rarity: "rare", icon: "🌾", description: "Hermandad rociera" },
    { name: "La Amargura", city: "Málaga", rarity: "rare", icon: "😔", description: "Amargura de María" },
    
    // COMUNES (61.5%)
    { name: "San Esteban", city: "Sevilla", rarity: "common", icon: "⛪", description: "Parroquia antigua" },
    { name: "San Isidoro", city: "Sevilla", rarity: "common", icon: "📚", description: "Obispo y doctor" },
    { name: "El Salvador", city: "Sevilla", rarity: "common", icon: "✨", description: "Salvador del mundo" },
    { name: "Santa Catalina", city: "Sevilla", rarity: "common", icon: "🎡", description: "Rueda de martirio" },
    { name: "San Andrés", city: "Sevilla", rarity: "common", icon: "✝️", description: "Apóstol crucificado" },
    { name: "San Marcos", city: "Sevilla", rarity: "common", icon: "🦁", description: "Evangelista" },
    { name: "San Lucas", city: "Sevilla", rarity: "common", icon: "🐂", description: "Médico y evangelista" },
    { name: "San Juan", city: "Sevilla", rarity: "common", icon: "🦅", description: "Amado discípulo" },
    { name: "La Caridad", city: "Sevilla", rarity: "common", icon: "❤️", description: "Amor al prójimo" },
    { name: "La Esperanza", city: "Sevilla", rarity: "common", icon: "🌅", description: "Esperanza cristiana" },
    { name: "La Fe", city: "Sevilla", rarity: "common", icon: "✝️", description: "Fe cristiana" },
    { name: "La Caridad", city: "Málaga", rarity: "common", icon: "🤝", description: "Hermandad benéfica" },
    { name: "La Esperanza", city: "Málaga", rarity: "common", icon: "🌄", description: "Esperanza malagueña" },
    { name: "San Pablo", city: "Málaga", rarity: "common", icon: "🗡️", description: "Apóstol de los gentiles" },
    { name: "San Pedro", city: "Málaga", rarity: "common", icon: "🔑", description: "Llaves del reino" },
    { name: "Santa Ana", city: "Málaga", rarity: "common", icon: "👵", description: "Abuela de Jesús" },
    { name: "San Joaquín", city: "Málaga", rarity: "common", icon: "👴", description: "Abuelo de Jesús" },
    { name: "La Asunción", city: "Málaga", rarity: "common", icon: "☁️", description: "María asunta a cielos" },
    { name: "La Inmaculada", city: "Málaga", rarity: "common", icon: "👑", description: "Concebida sin pecado" },
    { name: "San José", city: "Málaga", rarity: "common", icon: "🔨", description: "Padre adoptivo" },
    { name: "Santa Teresa", city: "Málaga", rarity: "common", icon: "🌹", description: "Doctora de la Iglesia" },
    { name: "San Juan de la Cruz", city: "Málaga", rarity: "common", icon: "🗿", description: "Místico carmelita" },
    { name: "Santa Bernarda", city: "Málaga", rarity: "common", icon: "🏠", description: "Madre de los pobres" },
    { name: "San Francisco", city: "Málaga", rarity: "common", icon: "🕊️", description: "Pobreza franciscana" }
];

// 🎵 SISTEMA DE AUDIO - SOUNDCLOUD
let soundCloudWidget = null;
let soundCloudReady = false;

// 🎮 INICIALIZACIÓN DEL JUEGO
document.addEventListener('DOMContentLoaded', function() {
    loadGameState();
    initializeSoundCloud();
    updateUI();
    startCoinGeneration();
    
    // Mostrar información del usuario si existe
    const savedUser = localStorage.getItem('cofradiaUser');
    if (savedUser) {
        gameState.currentUser = JSON.parse(savedUser);
        showUserDisplay();
    }
});

// 💾 SISTEMA DE GUARDADO
function saveGameState() {
    localStorage.setItem('cofradiaGameState', JSON.stringify(gameState));
}

function loadGameState() {
    const saved = localStorage.getItem('cofradiaGameState');
    if (saved) {
        const loadedState = JSON.parse(saved);
        gameState = { ...gameState, ...loadedState };
    }
}

// 🎵 INICIALIZACIÓN DE SOUNDCLOUD
function initializeSoundCloud() {
    // Cargar script de la API de SoundCloud
    const script = document.createElement('script');
    script.src = 'https://w.soundcloud.com/player/api.js';
    script.async = true;
    script.onload = function() {
        const iframe = document.getElementById('soundcloudPlayer');
        if (iframe && typeof SC !== 'undefined') {
            soundCloudWidget = SC.Widget(iframe);
            soundCloudWidget.bind(SC.Widget.Events.READY, function() {
                soundCloudReady = true;
                console.log('✅ SoundCloud player ready');
                // Mostrar mensaje inicial
                setTimeout(() => {
                    showMessage('🎵 Haz clic en ▶️ para escuchar las marchas de Semana Santa', 'success');
                }, 2000);
            });
        }
    };
    document.head.appendChild(script);
}

// 🎵 CONTROLES DE SOUNDCLOUD
function toggleSoundCloud() {
    if (!soundCloudReady || !soundCloudWidget) {
        showMessage('⏳ Cargando reproductor de SoundCloud...', 'error');
        return;
    }
    
    const btn = document.getElementById('playBtn');
    soundCloudWidget.getPaused(function(isPaused) {
        if (isPaused) {
            soundCloudWidget.play();
            btn.textContent = '⏸️';
            gameState.musicPlaying = true;
            showMessage('🎶 Reproduciendo marchas de Semana Santa', 'success');
        } else {
            soundCloudWidget.pause();
            btn.textContent = '▶️';
            gameState.musicPlaying = false;
        }
        saveGameState();
    });
}

function skipSoundCloudTrack(direction) {
    if (!soundCloudReady || !soundCloudWidget) return;
    
    // Nota: SoundCloud no permite control directo de pistas en playlists
    // Esta función muestra el reproductor para que el usuario lo controle manualmente
    const container = document.getElementById('soundcloud-container');
    container.style.display = 'block';
    container.style.position = 'fixed';
    container.style.bottom = '80px';
    container.style.right = '20px';
    container.style.zIndex = '1001';
    container.style.width = '300px';
    container.style.border = '2px solid #FFD700';
    container.style.borderRadius = '10px';
    container.style.overflow = 'hidden';
    container.style.boxShadow = '0 0 20px rgba(255, 215, 0, 0.5)';
    
    // Ocultar después de 8 segundos
    setTimeout(() => {
        container.style.display = 'none';
    }, 8000);
    
    showMessage('Usa el reproductor de SoundCloud para cambiar de pista', 'error');
}

// El control de volumen no funciona con iframe de SoundCloud
function changeVolume() {
    showMessage('🔇 Control de volumen: usa el reproductor de SoundCloud', 'error');
}

// 💰 SISTEMA DE GENERACIÓN DE MONEDAS
function startCoinGeneration() {
    setInterval(() => {
        gameState.coins += 50;
        updateUI();
        saveGameState();
    }, 60000); // 1 minuto
}

// 🎯 SISTEMA DE INVOCACIONES
function summon(count = 1) {
    const cost = count === 50 ? 4000 : count === 10 ? 900 : count * 100;
    
    if (gameState.coins < cost) {
        showMessage('¡No tienes suficientes monedas! 💰', 'error');
        return;
    }
    
    gameState.coins -= cost;
    const results = [];
    
    for (let i = 0; i < count; i++) {
        const character = getRandomCharacter();
        results.push(character);
        addCharacterToCollection(character);
        gameState.pityCount++;
    }
    
    // Garantía de legendario cada 100 invocaciones
    if (gameState.pityCount >= 100) {
        const legendaries = CHARACTER_DATABASE.filter(c => c.rarity === 'legendary');
        results[results.length - 1] = legendaries[0];
        addCharacterToCollection(legendaries[0]);
        gameState.pityCount = 0;
        showHolySpiritAnimation();
    }
    
    updateUI();
    saveGameState();
    showSummonResults(results);
}

function getRandomCharacter() {
    const rand = Math.random() * 100;
    let rarity = 'common';
    
    if (rand < PROBABILITIES.legendary) {
        rarity = 'legendary';
    } else if (rand < PROBABILITIES.legendary + PROBABILITIES.epic) {
        rarity = 'epic';
    } else if (rand < PROBABILITIES.legendary + PROBABILITIES.epic + PROBABILITIES.rare) {
        rarity = 'rare';
    }
    
    const charactersOfRarity = CHARACTER_DATABASE.filter(c => c.rarity === rarity);
    return charactersOfRarity[Math.floor(Math.random() * charactersOfRarity.length)];
}

function addCharacterToCollection(character) {
    const existing = gameState.characters.find(c => c.name === character.name);
    if (existing) {
        existing.count = (existing.count || 1) + 1;
    } else {
        gameState.characters.push({ ...character, count: 1 });
    }
}

// 🎨 SISTEMA DE ANIMACIONES
function showStarAnimation() {
    const animation = document.getElementById('starAnimation');
    if (animation) {
        animation.style.display = 'block';
        setTimeout(() => {
            animation.style.display = 'none';
        }, 3000);
    }
}

function showHolySpiritAnimation() {
    const animation = document.getElementById('holySpiritAnimation');
    if (animation) {
        animation.style.display = 'block';
        setTimeout(() => {
            animation.style.display = 'none';
        }, 2000);
    }
}

function showSummonResults(results) {
    // Implementar sistema de visualización de resultados
    console.log('Summon results:', results);
    showStarAnimation();
}

// 🎮 SISTEMA DE CAMBIO DE PESTAÑAS
function switchTab(tabName) {
    // Ocultar todas las pestañas
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(tab => tab.classList.remove('active'));
    
    // Remover active de todos los botones
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(btn => btn.classList.remove('active'));
    
    // Mostrar la pestaña seleccionada
    const targetTab = document.getElementById(tabName + '-tab');
    const targetButton = document.querySelector(`[onclick="switchTab('${tabName}')"]`);
    
    if (targetTab) targetTab.classList.add('active');
    if (targetButton) targetButton.classList.add('active');
}

// 🔄 ACTUALIZACIÓN DE INTERFAZ
function updateUI() {
    const coinsElement = document.getElementById('coins');
    const characterCountElement = document.getElementById('characterCount');
    const collectionPercentElement = document.getElementById('collectionPercent');
    const pityCountElement = document.getElementById('pityCount');
    const pityBarElement = document.getElementById('pityBar');
    
    if (coinsElement) coinsElement.textContent = gameState.coins;
    if (characterCountElement) characterCountElement.textContent = `${gameState.characters.length}/150`;
    if (collectionPercentElement) collectionPercentElement.textContent = `${Math.round((gameState.characters.length / 150) * 100)}%`;
    if (pityCountElement) pityCountElement.textContent = gameState.pityCount;
    if (pityBarElement) pityBarElement.style.width = `${gameState.pityCount}%`;
    
    // Actualizar botones de invocación
    document.getElementById('summon1Btn').disabled = gameState.coins < 100;
    document.getElementById('summon10Btn').disabled = gameState.coins < 900;
    document.getElementById('summon50Btn').disabled = gameState.coins < 4000;
}

// 👤 SISTEMA DE USUARIO
function showUserDisplay() {
    const userDisplay = document.getElementById('userDisplay');
    if (userDisplay && gameState.currentUser) {
        userDisplay.innerHTML = `
            <div style="color: #FFD700; font-weight: bold;">${gameState.currentUser.name}</div>
            <div style="color: #d4af37; font-size: 0.9rem;">${gameState.currentUser.email}</div>
        `;
        userDisplay.classList.add('show');
    }
}

function logout() {
    localStorage.removeItem('cofradiaUser');
    localStorage.removeItem('cofradiaGameState');
    window.location.href = 'login.html';
}

// 🔔 SISTEMA DE MENSAJES
function showMessage(text, type = 'success') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `game-message ${type}`;
    messageDiv.textContent = text;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

// === SISTEMAS ADICIONALES PARA FUNCIONALIDAD COMPLETA ===

// 🎮 MINIJUEGOS (conectores)
function playMinigame(gameType) {
    const gameArea = document.getElementById('gameArea');
    if (!gameArea) return;
    
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

function closeGame() {
    const gameArea = document.getElementById('gameArea');
    if (gameArea) {
        gameArea.classList.add('hidden');
        gameArea.innerHTML = '';
    }
}

// COLECCIÓN
function filterCollection(rarity) {
    gameState.filter = rarity;
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    if (event && event.target) {
        event.target.classList.add('active');
    }
    renderCollection();
}

function renderCollection() {
    const grid = document.getElementById('collectionGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    const filteredCharacters = gameState.filter === 'all' 
        ? CHARACTER_DATABASE 
        : CHARACTER_DATABASE.filter(c => c.rarity === gameState.filter);
    
    filteredCharacters.forEach(character => {
        const owned = gameState.characters.find(c => c.name === character.name);
        const card = document.createElement('div');
        card.className = `collection-card ${owned ? 'owned' : ''}`;
        
        const displayContent = owned ? 
            `<span>${character.icon}</span>` 
            : '<span>❓</span>';
        
        card.innerHTML = `
            <div class="icon">${displayContent}</div>
            <div class="name">${owned ? character.name : '???'}</div>
            <div class="rarity">${owned ? character.rarity : '???'}</div>
            <div class="city" style="font-size: 0.7rem; color: #aaa;">${owned ? character.city : '???'}</div>
            ${owned && owned.count > 1 ? `<div class="count">${owned.count}</div>` : ''}
        `;
        
        if (owned) {
            card.onclick = () => showMessage(`Figura: ${character.name} (${character.rarity})`, 'success');
        }
        
        grid.appendChild(card);
    });
}

// TRIVIA
function initTrivia() {
    const gameArea = document.getElementById('gameArea');
    const questions = [
        {
            question: "¿En qué ciudad se celebran las más famosas procesiones de Semana Santa?",
            answers: ["Sevilla", "Málaga", "Granada", "Córdoba"],
            correct: 0,
            reward: 50
        },
        {
            question: "¿Qué hermandad es conocida como 'La Blanca Palidez'?",
            answers: ["El Gran Poder", "La Macarena", "El Silencio", "La Hiniesta"],
            correct: 2,
            reward: 50
        }
    ];
    
    let current = 0;
    let score = 0;
    
    function showQuestion() {
        if (current >= questions.length) {
            endTriviaGame(score);
            return;
        }
        
        const q = questions[current];
        gameArea.innerHTML = `
            <div class="trivia-container">
                <h3>Pregunta ${current + 1}/${questions.length}</h3>
                <div class="question-text">${q.question}</div>
                <div class="answer-buttons">
                    ${q.answers.map((ans, i) => `
                        <button class="answer-btn" onclick="answerTrivia(${i}, ${q.correct}, ${q.reward})">${ans}</button>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    window.answerTrivia = function(selected, correct, reward) {
        const buttons = document.querySelectorAll('.answer-btn');
        buttons.forEach((btn, i) => {
            btn.disabled = true;
            if (i === correct) btn.classList.add('correct');
            else if (i === selected) btn.classList.add('incorrect');
        });
        
        if (selected === correct) {
            score += reward;
            gameState.coins += reward;
            showMessage(`¡Correcto! +${reward} monedas`, 'success');
        } else {
            showMessage('Incorrecto', 'error');
        }
        
        current++;
        setTimeout(showQuestion, 2000);
    };
    
    showQuestion();
}

function endTriviaGame(score) {
    const gameArea = document.getElementById('gameArea');
    gameArea.innerHTML = `
        <div class="trivia-container" style="text-align: center;">
            <h2 style="color: #FFD700;">¡Trivia Completada!</h2>
            <p style="font-size: 1.5rem; margin: 2rem 0;">Obtuviste ${score} monedas</p>
            <button class="game-btn" onclick="closeGame()">Continuar</button>
        </div>
    `;
    updateUI();
    saveGameState();
}

// SOPA DE LETRAS
function initWordsearch() {
    const gameArea = document.getElementById('gameArea');
    const words = ['SEMANA', 'SANTA', 'CRISTO', 'VIRGEN', 'CRUZ', 'PASO'];
    const gridSize = 10;
    const grid = Array(gridSize).fill(null).map(() => Array(gridSize).fill(''));
    
    // Llenar grid (simplificado)
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            grid[i][j] = String.fromCharCode(65 + Math.floor(Math.random() * 26));
        }
    }
    
    gameArea.innerHTML = `
        <div class="wordsearch-container">
            <h3 style="color: #FFD700; margin-bottom: 1rem;">🔤 Sopa de Letras</h3>
            <div class="wordsearch-grid" id="wordsearchGrid" style="grid-template-columns: repeat(${gridSize}, 1fr);"></div>
            <div class="wordsearch-list">${words.map(w => `<div class="word-item">${w}</div>`).join('')}</div>
            <div class="game-controls">
                <button class="game-btn" onclick="rewardWordsearch()">Reclamar Recompensa</button>
                <button class="game-btn" onclick="closeGame()">Cerrar</button>
            </div>
        </div>
    `;
    
    const gridContainer = document.getElementById('wordsearchGrid');
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            const cell = document.createElement('div');
            cell.className = 'wordsearch-cell';
            cell.textContent = grid[i][j];
            gridContainer.appendChild(cell);
        }
    }
}

function rewardWordsearch() {
    gameState.coins += 50;
    updateUI();
    saveGameState();
    showMessage('¡Ganaste 50 monedas!', 'success');
    closeGame();
}

// MEMORIA
function initMemory() {
    const gameArea = document.getElementById('gameArea');
    const cards = ['✝️', '🌹', '🕊️', '⛪', '🎺', '🌿', '🏛️', '🔔'];
    const pairs = [...cards, ...cards].sort(() => Math.random() - 0.5);
    
    gameArea.innerHTML = `
        <div class="memory-container">
            <h3 style="color: #FFD700; text-align: center; margin-bottom: 1rem;">🧠 Encuentra las Parejas</h3>
            <div class="memory-grid" id="memoryGrid"></div>
        </div>
    `;
    
    const grid = document.getElementById('memoryGrid');
    pairs.forEach((card, index) => {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'memory-card';
        cardDiv.innerHTML = `<span style="display: none;">${card}</span><div style="font-size: 1rem; color: #d4af37;">?</div>`;
        cardDiv.onclick = () => flipMemoryCard(index);
        grid.appendChild(cardDiv);
    });
}

function flipMemoryCard(index) {
    const cards = document.querySelectorAll('.memory-card');
    const card = cards[index];
    const span = card.querySelector('span');
    
    if (!card.classList.contains('flipped') && !card.classList.contains('matched')) {
        card.classList.add('flipped');
        span.style.display = 'block';
        card.querySelector('div').style.display = 'none';
        
        const flipped = document.querySelectorAll('.memory-card.flipped:not(.matched)');
        if (flipped.length === 2) {
            setTimeout(() => checkMatch(flipped[0], flipped[1]), 1000);
        }
    }
}

function checkMatch(card1, card2) {
    if (card1.querySelector('span').textContent === card2.querySelector('span').textContent) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        showMessage('¡Pareja encontrada!', 'success');
    } else {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        card1.querySelector('span').style.display = 'none';
        card2.querySelector('span').style.display = 'none';
        card1.querySelector('div').style.display = 'block';
        card2.querySelector('div').style.display = 'block';
    }
}