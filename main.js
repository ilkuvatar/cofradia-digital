// 🎯 SISTEMA PRINCIPAL DEL JUEGO - COFRADÍA DIGITAL
// Versión completa con controles SoundCloud y trivia aleatoria manteniendo toda la base de datos

// 🎮 VARIABLES GLOBALES DEL JUEGO
let gameState = {
    coins: 1500,
    characters: [],
    pityCount: 0,
    currentUser: null,
    musicPlaying: false
};

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
            // 🏆 LEGENDARIAS (8 figuras - 0.5% cada una)
            { id: 1, name: "Jesús del Gran Poder", city: "Sevilla", icon: "⛪", rarity: "legendary", rate: 0.005, wikiUrl: "https://es.wikipedia.org/wiki/Jes%C3%BAs_del_Gran_Poder" },
            { id: 2, name: "Virgen de la Macarena", city: "Sevilla", icon: "🌹", rarity: "legendary", rate: 0.005, wikiUrl: "https://es.wikipedia.org/wiki/Nuestra_Se%C3%B1ora_de_la_Esperanza_Macarena" },
            { id: 3, name: "Esperanza de Triana", city: "Sevilla", icon: "🚢", rarity: "legendary", rate: 0.005, wikiUrl: "https://es.wikipedia.org/wiki/Virgen_de_la_Esperanza_de_Triana" },
            { id: 4, name: "Cristo de los Gitanos", city: "Sevilla", icon: "💃", rarity: "legendary", rate: 0.005, wikiUrl: "https://es.wikipedia.org/wiki/Cristo_de_los_Gitanos" },
            { id: 5, name: "Cristo del Cachorro", city: "Sevilla", icon: "🐺", rarity: "legendary", rate: 0.005, wikiUrl: "https://es.wikipedia.org/wiki/Cristo_del_Cachorro" },
            { id: 6, name: "Jesús Nazareno del Silencio", city: "Sevilla", icon: "🤫", rarity: "legendary", rate: 0.005, wikiUrl: "https://es.wikipedia.org/wiki/El_Silencio_(Sevilla)" },
            { id: 7, name: "Virgen del Rocío", "city": "Almonte", "icon": "🌾", "rarity": "legendary", "rate": 0.005, "wikiUrl": "https://es.wikipedia.org/wiki/Virgen_del_Roc%C3%ADo" },
            { id: 8, name: "Cristo de la Sangre", city: "Málaga", icon: "🩸", rarity: "legendary", rate: 0.005, wikiUrl: "https://es.wikipedia.org/wiki/Cristo_de_la_Sangre_(M%C3%A1laga)" },

            // ⭐ ÉPICAS (15 figuras - 0.3% cada una)
            { id: 9, name: "Cristo del Silencio", city: "Sevilla", icon: "🤫", rarity: "epic", rate: 0.003, wikiUrl: "https://es.wikipedia.org/wiki/El_Silencio_(Sevilla)" },
            { id: 10, name: "Virgen de la Amargura", city: "Sevilla", icon: "😢", rarity: "epic", rate: 0.003, wikiUrl: "https://es.wikipedia.org/wiki/Virgen_de_la_Amargura" },
            { id: 11, name: "Cristo del Calvario", city: "Sevilla", icon: "⛰️", rarity: "epic", rate: 0.003, wikiUrl: "https://es.wikipedia.org/wiki/Cristo_del_Calvario" },
            { id: 12, name: "Cristo de la Buena Muerte", city: "Sevilla", icon: "⚔️", rarity: "epic", rate: 0.003, wikiUrl: "https://es.wikipedia.org/wiki/Cristo_de_la_Buena_Muerte" },
            { id: 13, name: "Virgen de la Estrella", city: "Sevilla", icon: "⭐", rarity: "epic", rate: 0.003, wikiUrl: "https://es.wikipedia.org/wiki/Virgen_de_la_Estrella" },
            { id: 14, name: "Cristo del Museo", city: "Sevilla", icon: "🏛️", rarity: "epic", rate: 0.003, wikiUrl: "https://es.wikipedia.org/wiki/Cristo_del_Museo" },
            { id: 15, name: "Cristo de la Sed", city: "Sevilla", icon: "💧", rarity: "epic", rate: 0.003, wikiUrl: "https://es.wikipedia.org/wiki/Cristo_de_la_Sed" },
            { id: 16, name: "Virgen de la O", city: "Sevilla", icon: "🅾️", rarity: "epic", rate: 0.003, wikiUrl: "https://es.wikipedia.org/wiki/Virgen_de_la_O" },
            { id: 17, name: "Cristo de Mena", city: "Málaga", icon: "🎖️", rarity: "epic", rate: 0.003, wikiUrl: "https://es.wikipedia.org/wiki/Cristo_de_Mena" },
            { id: 18, name: "Cristo de la Salud", city: "Sevilla", icon: "🏥", rarity: "epic", rate: 0.003, wikiUrl: "https://es.wikipedia.org/wiki/Cristo_de_la_Salud" },
            { id: 19, name: "Virgen de la Soledad", city: "Sevilla", icon: "🌑", rarity: "epic", rate: 0.003, wikiUrl: "https://es.wikipedia.org/wiki/Virgen_de_la_Soledad" },
            { id: 20, name: "Cristo del Dulce Nombre", city: "Sevilla", icon: "🍯", rarity: "epic", rate: 0.003, wikiUrl: "https://es.wikipedia.org/wiki/Cristo_del_Dulce_Nombre" },
            { id: 21, name: "Virgen de las Aguas", city: "Sevilla", icon: "💦", rarity: "epic", rate: 0.003, wikiUrl: "https://es.wikipedia.org/wiki/Virgen_de_las_Aguas" },
            { id: 22, name: "Cristo de la Providencia", city: "Sevilla", icon: "🛡️", rarity: "epic", rate: 0.003, wikiUrl: "https://es.wikipedia.org/wiki/Cristo_de_la_Providencia" },
            { id: 23, name: "Virgen de la Candelaria", city: "Sevilla", icon: "🕯️", rarity: "epic", rate: 0.003, wikiUrl: "https://es.wikipedia.org/wiki/Virgen_de_la_Candelaria" },

            // 💙 RARAS (45 figuras - 0.666% cada una)
            { id: 24, name: "La Borriquita", city: "Sevilla", icon: "🐴", rarity: "rare", rate: 0.00666, wikiUrl: "https://es.wikipedia.org/wiki/La_Borriquita" },
            { id: 25, name: "Jesús Despojado", city: "Sevilla", icon: "👔", rarity: "rare", rate: 0.00666, wikiUrl: "https://es.wikipedia.org/wiki/Jes%C3%BAs_Despojado" },
            { id: 26, name: "La Paz", city: "Sevilla", icon: "☮️", rarity: "rare", rate: 0.00666, wikiUrl: "https://es.wikipedia.org/wiki/La_Paz_(Sevilla)" },
            { id: 27, name: "La Cena", city: "Sevilla", icon: "🍞", rarity: "rare", rate: 0.00666, wikiUrl: "https://es.wikipedia.org/wiki/La_Cena_(Sevilla)" },
            { id: 28, name: "La Hiniesta", city: "Sevilla", icon: "🌿", rarity: "rare", rate: 0.00666, wikiUrl: "https://es.wikipedia.org/wiki/La_Hiniesta" },
            { id: 29, name: "San Roque", city: "Sevilla", icon: "🦴", rarity: "rare", rate: 0.00666, wikiUrl: "https://es.wikipedia.org/wiki/San_Roque_(Sevilla)" },
            { id: 30, name: "La Amargura", city: "Sevilla", icon: "🥀", rarity: "rare", rate: 0.00666, wikiUrl: "https://es.wikipedia.org/wiki/La_Amargura" },
            { id: 31, name: "El Amor", city: "Sevilla", icon: "❤️", rarity: "rare", rate: 0.00666, wikiUrl: "https://es.wikipedia.org/wiki/El_Amor_(Sevilla)" },
            { id: 32, name: "San Pablo", city: "Sevilla", icon: "📜", rarity: "rare", rate: 0.00666, wikiUrl: "https://es.wikipedia.org/wiki/San_Pablo_(Sevilla)" },
            { id: 33, name: "La Redención", city: "Sevilla", icon: "🔓", rarity: "rare", rate: 0.00666, wikiUrl: "https://es.wikipedia.org/wiki/La_Redenci%C3%B3n" },
            { id: 34, name: "Santa Genoveva", city: "Sevilla", icon: "👰", rarity: "rare", rate: 0.00666, wikiUrl: "https://es.wikipedia.org/wiki/Santa_Genoveva" },
            { id: 35, name: "Santa Marta", city: "Sevilla", icon: "⚰️", rarity: "rare", rate: 0.00666, wikiUrl: "https://es.wikipedia.org/wiki/Santa_Marta_(Sevilla)" },
            { id: 36, name: "San Gonzalo", city: "Sevilla", icon: "🎯", rarity: "rare", rate: 0.00666, wikiUrl: "https://es.wikipedia.org/wiki/San_Gonzalo" },
            { id: 37, name: "Vera-Cruz", city: "Sevilla", icon: "✟", rarity: "rare", rate: 0.00666, wikiUrl: "https://es.wikipedia.org/wiki/Vera-Cruz_(Sevilla)" },
            { id: 38, name: "Las Penas", city: "Sevilla", icon: "😞", rarity: "rare", rate: 0.00666, wikiUrl: "https://es.wikipedia.org/wiki/Las_Penas" },
            { id: 39, name: "Las Aguas", city: "Sevilla", icon: "🌊", rarity: "rare", rate: 0.00666, wikiUrl: "https://es.wikipedia.org/wiki/Las_Aguas" },
            { id: 40, name: "El Cerro del Águila", city: "Sevilla", icon: "🦅", rarity: "rare", rate: 0.00666, wikiUrl: "https://es.wikipedia.org/wiki/El_Cerro_del_%C3%81guila" },
            { id: 41, name: "San Benito", city: "Sevilla", icon: "🎣", rarity: "rare", rate: 0.00666, wikiUrl: "https://es.wikipedia.org/wiki/San_Benito_(Sevilla)" },
            { id: 42, name: "El Dulce Nombre", city: "Sevilla", icon: "🍯", rarity: "rare", rate: 0.00666, wikiUrl: "https://es.wikipedia.org/wiki/El_Dulce_Nombre" },
            { id: 43, name: "La Candelaria", city: "Sevilla", icon: "🕯️", rarity: "rare", rate: 0.00666, wikiUrl: "https://es.wikipedia.org/wiki/La_Candelaria_(Sevilla)" },
            { id: 44, name: "San Esteban", city: "Sevilla", icon: "🗿", rarity: "rare", rate: 0.00666, wikiUrl: "https://es.wikipedia.org/wiki/San_Esteban_(Sevilla)" },
            { id: 45, name: "Los Javieres", city: "Sevilla", icon: "🗡️", rarity: "rare", rate: 0.00666, wikiUrl: "https://es.wikipedia.org/wiki/Los_Javieres" },
            { id: 46, name: "Los Estudiantes", city: "Sevilla", icon: "📚", rarity: "rare", rate: 0.00666, wikiUrl: "https://es.wikipedia.org/wiki/Los_Estudiantes" },
            { id: 47, name: "Santa Cruz", city: "Sevilla", icon: "✝️", rarity: "rare", rate: 0.00666, wikiUrl: "https://es.wikipedia.org/wiki/Santa_Cruz_(Sevilla)" },
            { id: 48, name: "La Carretería", city: "Sevilla", icon: "🛠️", rarity: "rare", rate: 0.00666, wikiUrl: "https://es.wikipedia.org/wiki/La_Carreter%C3%ADa" },
            { id: 49, name: "Soledad de San Buenaventura", city: "Sevilla", icon: "🕊️", rarity: "rare", rate: 0.00666, wikiUrl: "https://es.wikipedia.org/wiki/Soledad_de_San_Buenaventura" },
            { id: 50, name: "El Cachorro", city: "Sevilla", icon: "🐶", rarity: "rare", rate: 0.00666, wikiUrl: "https://es.wikipedia.org/wiki/El_Cachorro" },
            { id: 51, name: "La O", city: "Sevilla", icon: "🔵", rarity: "rare", rate: 0.00666, wikiUrl: "https://es.wikipedia.org/wiki/La_O" },
            { id: 52, name: "Tres Caídas", city: "Sevilla", icon: "3️⃣", rarity: "rare", rate: 0.00666, wikiUrl: "https://es.wikipedia.org/wiki/Tres_Ca%C3%ADdas" },
            { id: 53, name: "Montserrat", city: "Sevilla", icon: "⛰️", rarity: "rare", rate: 0.00666, wikiUrl: "https://es.wikipedia.org/wiki/Montserrat_(Sevilla)" },
            { id: 54, name: "Sagrada Mortaja", city: "Sevilla", icon: "⚱️", rarity: "rare", rate: 0.00666, wikiUrl: "https://es.wikipedia.org/wiki/Sagrada_Mortaja" },
            { id: 55, name: "Jesús El Rico", city: "Málaga", icon: "💰", rarity: "rare", rate: 0.00666, wikiUrl: "https://es.wikipedia.org/wiki/Jes%C3%Bas_El_Rico" },
            { id: 56, name: "Cristo de la Expiración", city: "Málaga", icon: "💨", rarity: "rare", rate: 0.00666, wikiUrl: "https://es.wikipedia.org/wiki/Cristo_de_la_Expiraci%C3%B3n" },
            { id: 57, name: "Virgen de la Paloma", city: "Málaga", icon: "🕊️", rarity: "rare", rate: 0.00666, wikiUrl: "https://es.wikipedia.org/wiki/Virgen_de_la_Paloma" },
            { id: 58, name: "Cristo de los Remedios", city: "Granada", icon: "🆘", rarity: "rare", rate: 0.00666, wikiUrl: "https://es.wikipedia.org/wiki/Cristo_de_los_Remedios" },
            { id: 59, name: "Virgen de la Alhambra", city: "Granada", icon: "🏰", rarity: "rare", rate: 0.00666, wikiUrl: "https://es.wikipedia.org/wiki/Virgen_de_la_Alhambra" },
            { id: 60, name: "Cristo de la Caída", city: "Valladolid", icon: "🍂", rarity: "rare", rate: 0.00666, wikiUrl: "https://es.wikipedia.org/wiki/Cristo_de_la_Ca%C3%ADda" },
            { id: 61, name: "Virgen de las Angustias", city: "Valladolid", icon: "🥺", rarity: "rare", rate: 0.00666, wikiUrl: "https://es.wikipedia.org/wiki/Virgen_de_las_Angustias" },
            { id: 62, name: "Cristo de la Columna", city: "Zamora", icon: "🏛️", rarity: "rare", rate: 0.00666, wikiUrl: "https://es.wikipedia.org/wiki/Cristo_de_la_Columna" },
            { id: 63, name: "Virgen de la Soledad", city: "Zamora", icon: "🌫️", rarity: "rare", rate: 0.00666, wikiUrl: "https://es.wikipedia.org/wiki/Virgen_de_la_Soledad_(Zamora)" },
            { id: 64, name: "Cristo del Perdón", city: "León", icon: "🕊️", rarity: "rare", rate: 0.00666, wikiUrl: "https://es.wikipedia.org/wiki/Cristo_del_Perd%C3%B3n" },
            { id: 65, name: "Virgen de los Dolores", city: "León", icon: "😭", rarity: "rare", rate: 0.00666, wikiUrl: "https://es.wikipedia.org/wiki/Virgen_de_los_Dolores_(Le%C3%B3n)" },
            { id: 66, name: "Cristo de las Injurias", city: "Salamanca", icon: "🤬", rarity: "rare", rate: 0.00666, wikiUrl: "https://es.wikipedia.org/wiki/Cristo_de_las_Injurias" },
            { id: 67, name: "Cristo de la Agonía", city: "Salamanca", icon: "😰", rarity: "rare", rate: 0.00666, wikiUrl: "https://es.wikipedia.org/wiki/Cristo_de_la_Agon%C3%ADa" },
            { id: 68, name: "Virgen de la Piedad", city: "Salamanca", icon: "🙏", rarity: "rare", rate: 0.00666, wikiUrl: "https://es.wikipedia.org/wiki/Virgen_de_la_Piedad_(Salamanca)" },

            // 🤍 COMUNES (82 figuras - 0.786% cada una)
            { id: 69, name: "Nazareno de Pasión", city: "Sevilla", icon: "🙏", rarity: "common", rate: 0.00786, wikiUrl: "https://es.wikipedia.org/wiki/Nazareno" },
            { id: 70, name: "Costalero de Gran Poder", city: "Sevilla", icon: "💪", rarity: "common", rate: 0.00786, wikiUrl: "https://es.wikipedia.org/wiki/Costalero" },
            { id: 71, name: "Capataz del Silencio", city: "Sevilla", icon: "📯", rarity: "common", rate: 0.00786, wikiUrl: "https://es.wikipedia.org/wiki/Capataz" },
            { id: 72, name: "Candelero de la Macarena", city: "Sevilla", icon: "🕯️", rarity: "common", rate: 0.00786, wikiUrl: "https://es.wikipedia.org/wiki/Candelero" },
            { id: 73, name: "Mayordomo de Triana", city: "Sevilla", icon: "🎩", rarity: "common", rate: 0.00786, wikiUrl: "https://es.wikipedia.org/wiki/Mayordomo" },
            { id: 74, name: "Hermano Mayor", city: "Sevilla", icon: "👑", rarity: "common", rate: 0.00786, wikiUrl: "https://es.wikipedia.org/wiki/Hermano_Mayor" },
            { id: 75, name: "Acólito", city: "Sevilla", icon: "⛪", rarity: "common", rate: 0.00786, wikiUrl: "https://es.wikipedia.org/wiki/Ac%C3%B3lito" },
            { id: 76, name: "Saetero", city: "Sevilla", icon: "🎵", rarity: "common", rate: 0.00786, wikiUrl: "https://es.wikipedia.org/wiki/Saeta_(canci%C3%B3n)" },
            { id: 77, name: "Penitente", city: "Sevilla", icon: "⛓️", rarity: "common", rate: 0.00786, wikiUrl: "https://es.wikipedia.org/wiki/Penitente" },
            { id: 78, name: "Diácono", city: "Sevilla", icon: "📿", rarity: "common", rate: 0.00786, wikiUrl: "https://es.wikipedia.org/wiki/Di%C3%A1cono" },
            { id: 79, name: "Monaguillo", city: "Sevilla", icon: "🔔", rarity: "common", rate: 0.00786, wikiUrl: "https://es.wikipedia.org/wiki/Monaguillo" },
            { id: 80, name: "Capitán de Cruz", city: "Sevilla", icon: "⚔️", rarity: "common", rate: 0.00786, wikiUrl: "https://es.wikipedia.org/wiki/Capit%C3%A1n_de_Cruz" },
            { id: 81, name: "Guardia de Honor", city: "Sevilla", icon: "🛡️", rarity: "common", rate: 0.00786, wikiUrl: "https://es.wikipedia.org/wiki/Guardia_de_Honor" },
            { id: 82, name: "Farolero", city: "Sevilla", icon: "🏮", rarity: "common", rate: 0.00786, wikiUrl: "https://es.wikipedia.org/wiki/Farolero" },
            { id: 83, name: "Banda de Cornetas", city: "Sevilla", icon: "🎺", rarity: "common", rate: 0.00786, wikiUrl: "https://es.wikipedia.org/wiki/Banda_de_Cornetas" },
            { id: 84, name: "Tambor", city: "Sevilla", icon: "🥁", rarity: "common", rate: 0.00786, wikiUrl: "https://es.wikipedia.org/wiki/Tambor" },
            { id: 85, name: "Portador de Paso", city: "Sevilla", icon: "🏋️", rarity: "common", rate: 0.00786, wikiUrl: "https://es.wikipedia.org/wiki/Portador" },
            { id: 86, name: "Mujer de la Esperanza", city: "Sevilla", icon: "🌹", rarity: "common", rate: 0.00786, wikiUrl: "https://es.wikipedia.org/wiki/Mujer_de_la_Esperanza" },
            { id: 87, name: "Anciano Cofrade", city: "Sevilla", icon: "👴", rarity: "common", rate: 0.00786, wikiUrl: "https://es.wikipedia.org/wiki/Anciano_Cofrade" },
            { id: 88, name: "Joven Nazareno", city: "Sevilla", icon: "👦", rarity: "common", rate: 0.00786, wikiUrl: "https://es.wikipedia.org/wiki/Joven_Nazareno" },
            { id: 89, name: "Niño Costalero", city: "Sevilla", icon: "👶", rarity: "common", rate: 0.00786, wikiUrl: "https://es.wikipedia.org/wiki/Ni%C3%B1o_Costalero" },
            { id: 90, name: "Hermanita Blanca", city: "Sevilla", icon: "👧", rarity: "common", rate: 0.00786, wikiUrl: "https://es.wikipedia.org/wiki/Hermanita_Blanca" },
            { id: 91, name: "Cofrade de Málaga", city: "Málaga", icon: "🌊", rarity: "common", rate: 0.00786, wikiUrl: "https://es.wikipedia.org/wiki/Cofrade_de_M%C3%A1laga" },
            { id: 92, name: "Costalero Malagueño", city: "Málaga", icon: "🐟", rarity: "common", rate: 0.00786, wikiUrl: "https://es.wikipedia.org/wiki/Costalero_Malague%C3%B1o" },
            { id: 93, name: "Nazareno de la Sangre", city: "Málaga", icon: "🩸", rarity: "common", rate: 0.00786, wikiUrl: "https://es.wikipedia.org/wiki/Nazareno_de_la_Sangre" },
            { id: 94, name: "Penitente de El Rico", city: "Málaga", icon: "💰", rarity: "common", rate: 0.00786, wikiUrl: "https://es.wikipedia.org/wiki/Penitente_de_El_Rico" },
            { id: 95, name: "Portador de Mena", city: "Málaga", icon: "🪖", rarity: "common", rate: 0.00786, wikiUrl: "https://es.wikipedia.org/wiki/Portador_de_Mena" },
            { id: 96, name: "Legionario Acompañante", city: "Málaga", icon: "🎖️", rarity: "common", rate: 0.00786, wikiUrl: "https://es.wikipedia.org/wiki/Legionario_Acompa%C3%B1ante" },
            { id: 97, name: "Cofrade Granadino", city: "Granada", icon: "🏔️", rarity: "common", rate: 0.00786, wikiUrl: "https://es.wikipedia.org/wiki/Cofrade_Granadino" },
            { id: 98, name: "Costalero de la Alhambra", city: "Granada", icon: "🏰", rarity: "common", rate: 0.00786, wikiUrl: "https://es.wikipedia.org/wiki/Costalero_de_la_Alhambra" },
            { id: 99, name: "Nazareno de Sacromonte", city: "Granada", icon: "⛰️", rarity: "common", rate: 0.00786, wikiUrl: "https://es.wikipedia.org/wiki/Nazareno_de_Sacromonte" },
            { id: 100, name: "Penitente de las Angustias", city: "Granada", icon: "🥀", rarity: "common", rate: 0.00786, wikiUrl: "https://es.wikipedia.org/wiki/Penitente_de_las_Angustias" },
            { id: 101, name: "Cofrade Vallisoletano", city: "Valladolid", icon: "🏛️", rarity: "common", rate: 0.00786, wikiUrl: "https://es.wikipedia.org/wiki/Cofrade_Vallisoletano" },
            { id: 102, name: "Costalero de la Piedad", city: "Valladolid", icon: "🙏", rarity: "common", rate: 0.00786, wikiUrl: "https://es.wikipedia.org/wiki/Costalero_de_la_Piedad" },
            { id: 103, name: "Nazareno de las Angustias", city: "Valladolid", icon: "😢", rarity: "common", rate: 0.00786, wikiUrl: "https://es.wikipedia.org/wiki/Nazareno_de_las_Angustias" },
            { id: 104, name: "Penitente de San Benito", city: "Valladolid", icon: "🎗️", rarity: "common", rate: 0.00786, wikiUrl: "https://es.wikipedia.org/wiki/Penitente_de_San_Benito" },
            { id: 105, name: "Cofrade Zamorano", city: "Zamora", icon: "🏰", rarity: "common", rate: 0.00786, wikiUrl: "https://es.wikipedia.org/wiki/Cofrade_Zamorano" },
            { id: 106, name: "Costalero de la Soledad", city: "Zamora", icon: "🌑", rarity: "common", rate: 0.00786, wikiUrl: "https://es.wikipedia.org/wiki/Costalero_de_la_Soledad" },
            { id: 107, name: "Nazareno de la Columna", city: "Zamora", icon: "🏛️", rarity: "common", rate: 0.00786, wikiUrl: "https://es.wikipedia.org/wiki/Nazareno_de_la_Columna" },
            { id: 108, name: "Penitente de la Lamentación", city: "Zamora", icon: "😭", rarity: "common", rate: 0.00786, wikiUrl: "https://es.wikipedia.org/wiki/Penitente_de_la_Lamentaci%C3%B3n" },
            { id: 109, name: "Cofrade Leones", city: "León", icon: "🦁", rarity: "common", rate: 0.00786, wikiUrl: "https://es.wikipedia.org/wiki/Cofrade_Leones" },
            { id: 110, name: "Costalero del Perdón", city: "León", icon: "🕊️", rarity: "common", rate: 0.00786, wikiUrl: "https://es.wikipedia.org/wiki/Costalero_del_Perd%C3%B3n" },
            { id: 111, name: "Nazareno de las Injurias", city: "León", icon: "🤬", rarity: "common", rate: 0.00786, wikiUrl: "https://es.wikipedia.org/wiki/Nazareno_de_las_Injurias" },
            { id: 112, name: "Penitente de la Agonía", city: "León", icon: "😰", rarity: "common", rate: 0.00786, wikiUrl: "https://es.wikipedia.org/wiki/Penitente_de_la_Agon%C3%ADa" },
            { id: 113, name: "Cofrade Salmantino", city: "Salamanca", icon: "🎓", rarity: "common", rate: 0.00786, wikiUrl: "https://es.wikipedia.org/wiki/Cofrade_Salmantino" },
            { id: 114, name: "Costalero de la Piedad", city: "Salamanca", icon: "🙏", rarity: "common", rate: 0.00786, wikiUrl: "https://es.wikipedia.org/wiki/Costalero_de_la_Piedad_(Salamanca)" },
            { id: 115, name: "Nazareno de la Verónica", city: "Salamanca", icon: "👤", rarity: "common", rate: 0.00786, wikiUrl: "https://es.wikipedia.org/wiki/Nazareno_de_la_Ver%C3%B3nica" },
            { id: 116, name: "Penitente de la Caridad", city: "Salamanca", icon: "❤️", rarity: "common", rate: 0.00786, wikiUrl: "https://es.wikipedia.org/wiki/Penitente_de_la_Caridad" },
            { id: 117, name: "Cofrade Murciano", city: "Murcia", icon: "🌺", rarity: "common", rate: 0.00786, wikiUrl: "https://es.wikipedia.org/wiki/Cofrade_Murciano" },
            { id: 118, name: "Costalero de la Sangre", city: "Murcia", icon: "🩸", rarity: "common", rate: 0.00786, wikiUrl: "https://es.wikipedia.org/wiki/Costalero_de_la_Sangre" },
            { id: 119, name: "Nazareno de la Cruz", city: "Murcia", icon: "✝️", rarity: "common", rate: 0.00786, wikiUrl: "https://es.wikipedia.org/wiki/Nazareno_de_la_Cruz" },
            { id: 120, name: "Penitente de la Misericordia", city: "Murcia", icon: "🕊️", rarity: "common", rate: 0.00786, wikiUrl: "https://es.wikipedia.org/wiki/Penitente_de_la_Misericordia" },
            { id: 121, name: "Cofrade Cordobés", city: "Córdoba", icon: "🌸", rarity: "common", rate: 0.00786, wikiUrl: "https://es.wikipedia.org/wiki/Cofrade_Cordob%C3%A9s" },
            { id: 122, name: "Costalero de la Sentencia", city: "Córdoba", icon: "📜", rarity: "common", rate: 0.00786, wikiUrl: "https://es.wikipedia.org/wiki/Costalero_de_la_Sentencia" },
            { id: 123, name: "Nazareno de los Dolores", city: "Córdoba", icon: "😢", rarity: "common", rate: 0.00786, wikiUrl: "https://es.wikipedia.org/wiki/Nazareno_de_los_Dolores" },
            { id: 124, name: "Penitente de la Aurora", city: "Córdoba", icon: "🌅", rarity: "common", rate: 0.00786, wikiUrl: "https://es.wikipedia.org/wiki/Penitente_de_la_Aurora" },
            { id: 125, name: "Cofrade Sevillano Básico", city: "Sevilla", icon: "⚫", rarity: "common", rate: 0.00786, wikiUrl: "https://es.wikipedia.org/wiki/Cofrade_Sevillano" },
            { id: 126, name: "Cofrade de Paso Corto", city: "Sevilla", icon: "🚶", rarity: "common", rate: 0.00786, wikiUrl: "https://es.wikipedia.org/wiki/Paso_Corto" },
            { id: 127, name: "Cofrade de Paso Largo", city: "Sevilla", icon: "🏃", rarity: "common", rate: 0.00786, wikiUrl: "https://es.wikipedia.org/wiki/Paso_Largo" },
            { id: 128, name: "Hermano de la Caridad", city: "Sevilla", icon: "🤝", rarity: "common", rate: 0.00786, wikiUrl: "https://es.wikipedia.org/wiki/Hermano_de_la_Caridad" },
            { id: 129, name: "Portador de Cruz de Guía", city: "Sevilla", icon: "✝️", rarity: "common", rate: 0.00786, wikiUrl: "https://es.wikipedia.org/wiki/Cruz_de_Gu%C3%ADa" },
            { id: 130, name: "Cofrade de la Hiniesta", city: "Sevilla", icon: "🌿", rarity: "common", rate: 0.00786, wikiUrl: "https://es.wikipedia.org/wiki/Cofrade_de_la_Hiniesta" },
            { id: 131, name: "Nazareno de San Esteban", city: "Sevilla", icon: "🗿", rarity: "common", rate: 0.00786, wikiUrl: "https://es.wikipedia.org/wiki/Nazareno_de_San_Esteban" },
            { id: 132, name: "Penitente de la Paz", city: "Sevilla", icon: "☮️", rarity: "common", rate: 0.00786, wikiUrl: "https://es.wikipedia.org/wiki/Penitente_de_la_Paz" },
            { id: 133, name: "Cofrade de la Estrella", city: "Sevilla", icon: "⭐", rarity: "common", rate: 0.00786, wikiUrl: "https://es.wikipedia.org/wiki/Cofrade_de_la_Estrella" },
            { id: 134, name: "Hermano de la Amargura", city: "Sevilla", icon: "🥀", rarity: "common", rate: 0.00786, wikiUrl: "https://es.wikipedia.org/wiki/Hermano_de_la_Amargura" },
            { id: 135, name: "Costalero del Amor", city: "Sevilla", icon: "💕", rarity: "common", rate: 0.00786, wikiUrl: "https://es.wikipedia.org/wiki/Costalero_del_Amor" },
            { id: 136, name: "Nazareno de San Pablo", city: "Sevilla", icon: "📜", rarity: "common", rate: 0.00786, wikiUrl: "https://es.wikipedia.org/wiki/Nazareno_de_San_Pablo" },
            { id: 137, name: "Penitente de la Redención", city: "Sevilla", icon: "🔓", rarity: "common", rate: 0.00786, wikiUrl: "https://es.wikipedia.org/wiki/Penitente_de_la_Redenci%C3%B3n" },
            { id: 138, name: "Cofrade de Santa Genoveva", city: "Sevilla", icon: "👰", rarity: "common", rate: 0.00786, wikiUrl: "https://es.wikipedia.org/wiki/Cofrade_de_Santa_Genoveva" },
            { id: 139, name: "Hermano de Santa Marta", city: "Sevilla", icon: "⚰️", rarity: "common", rate: 0.00786, wikiUrl: "https://es.wikipedia.org/wiki/Hermano_de_Santa_Marta" },
            { id: 140, name: "Nazareno de San Gonzalo", city: "Sevilla", icon: "🎯", rarity: "common", rate: 0.00786, wikiUrl: "https://es.wikipedia.org/wiki/Nazareno_de_San_Gonzalo" },
            { id: 141, name: "Penitente de Vera-Cruz", city: "Sevilla", icon: "✟", rarity: "common", rate: 0.00786, wikiUrl: "https://es.wikipedia.org/wiki/Penitente_de_Vera-Cruz" },
            { id: 142, name: "Cofrade de las Penas", city: "Sevilla", icon: "😞", rarity: "common", rate: 0.00786, wikiUrl: "https://es.wikipedia.org/wiki/Cofrade_de_las_Penas" },
            { id: 143, name: "Hermano de las Aguas", city: "Sevilla", icon: "💦", rarity: "common", rate: 0.00786, wikiUrl: "https://es.wikipedia.org/wiki/Hermano_de_las_Aguas" },
            { id: 144, name: "Nazareno del Cerro", city: "Sevilla", icon: "🦅", rarity: "common", rate: 0.00786, wikiUrl: "https://es.wikipedia.org/wiki/Nazareno_del_Cerro" },
            { id: 145, name: "Penitente de San Benito", city: "Sevilla", icon: "🎣", rarity: "common", rate: 0.00786, wikiUrl: "https://es.wikipedia.org/wiki/Penitente_de_San_Benito" },
            { id: 146, name: "Cofrade del Dulce Nombre", city: "Sevilla", icon: "🍯", rarity: "common", rate: 0.00786, wikiUrl: "https://es.wikipedia.org/wiki/Cofrade_del_Dulce_Nombre" },
            { id: 147, name: "Hermano de la Candelaria", city: "Sevilla", icon: "🕯️", rarity: "common", rate: 0.00786, wikiUrl: "https://es.wikipedia.org/wiki/Hermano_de_la_Candelaria" },
            { id: 148, name: "Nazareno de San Esteban", city: "Sevilla", icon: "🗿", rarity: "common", rate: 0.00786, wikiUrl: "https://es.wikipedia.org/wiki/Nazareno_de_San_Esteban" },
            { id: 149, name: "Penitente de Los Javieres", city: "Sevilla", icon: "🗡️", rarity: "common", rate: 0.00786, wikiUrl: "https://es.wikipedia.org/wiki/Penitente_de_Los_Javieres" },
            { id: 150, name: "Cofrade de Los Estudiantes", city: "Sevilla", icon: "📚", rarity: "common", rate: 0.00786, wikiUrl: "https://es.wikipedia.org/wiki/Cofrade_de_Los_Estudiantes" }
        ];

// 🎵 SISTEMA DE AUDIO - SOUNDCLOUD
let soundCloudWidget = null;
let soundCloudReady = false;

document.addEventListener('DOMContentLoaded', function() {
    loadGameState();
    initializeSoundCloud();
    updateUI();
    startCoinGeneration();

    const savedUser = localStorage.getItem('cofradiaUser');
    if (savedUser) {
        gameState.currentUser = JSON.parse(savedUser);
        showUserDisplay();
    }
});

function loadGameState() {
    const saved = localStorage.getItem('cofradiaGameState');
    if (saved) {
        const loadedState = JSON.parse(saved);
        gameState = { ...gameState, ...loadedState };
    }
}

function saveGameState() {
    localStorage.setItem('cofradiaGameState', JSON.stringify(gameState));
}

// 🎵 INICIALIZACIÓN DE SOUNDCLOUD
function initializeSoundCloud() {
    const script = document.createElement('script');
    script.src = 'https://w.soundcloud.com/player/api.js';
    script.async = true;
    script.onload = function() {
        const iframe = document.getElementById('soundcloudPlayer');
        if (iframe && typeof SC !== 'undefined') {
            soundCloudWidget = SC.Widget(iframe);
            soundCloudWidget.bind(SC.Widget.Events.READY, function() {
                soundCloudReady = true;
                console.log('✅ SoundCloud listo');
                showMessage('🎵 Haz clic en ▶️ para escuchar las marchas de Semana Santa', 'success');
            });
        }
    };
    document.head.appendChild(script);
}

// 🎵 CONTROLES DE SOUNDCLOUD
function toggleSoundCloud() {
    if (!soundCloudReady || !soundCloudWidget) {
        showMessage('⏳ Cargando reproductor...', 'error');
        return;
    }
    const btn = document.getElementById('playBtn');
    soundCloudWidget.getPaused(function(isPaused) {
        if (isPaused) {
            soundCloudWidget.play();
            btn.textContent = '⏸️';
            gameState.musicPlaying = true;
        } else {
            soundCloudWidget.pause();
            btn.textContent = '▶️';
            gameState.musicPlaying = false;
        }
        saveGameState();
    });
}

function stopSoundCloud() {
    if (soundCloudReady && soundCloudWidget) {
        soundCloudWidget.pause();
        gameState.musicPlaying = false;
        saveGameState();
        showMessage('⏹️ Música detenida', 'success');
    }
}

function volumeUp() {
    if (soundCloudReady && soundCloudWidget) {
        soundCloudWidget.getVolume(function(v) {
            let newVol = Math.min(100, v + 10);
            soundCloudWidget.setVolume(newVol);
            showMessage('🔊 Volumen: ' + newVol + '%', 'success');
        });
    }
}

function volumeDown() {
    if (soundCloudReady && soundCloudWidget) {
        soundCloudWidget.getVolume(function(v) {
            let newVol = Math.max(0, v - 10);
            soundCloudWidget.setVolume(newVol);
            showMessage('🔉 Volumen: ' + newVol + '%', 'success');
        });
    }
}

// 🔧 CORRECCIÓN FILTERCOLLECTION
function filterCollection(rarity, event = null) {
    gameState.filter = rarity;
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    if (event && event.target) event.target.classList.add('active');
    renderCollection();
}

// 🎲 FUNCIÓN DE ALEATORIZACIÓN GENERAL
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// 🧩 TRIVIA (respeta la base de datos original)
function initTrivia() {
    const gameArea = document.getElementById('gameArea');

    let questions = [
                   {
                question: "¿Qué ciudad es famosa por su Semana Santa con 'Jesús del Gran Poder'?",
                options: ["Sevilla", "Málaga", "Granada", "Valladolid"],
                correct: 0,
                explanation: "Sevilla es la ciudad del Jesús del Gran Poder, una de las imágenes más veneradas."
            },
            {
                question: "¿Cuál es el color típico de la Semana Santa de Sevilla?",
                options: ["Morado", "Rojo", "Verde", "Azul"],
                correct: 0,
                explanation: "El morado es el color tradicional de la Semana Santa sevillana."
            },
            {
                question: "¿Qué llevan los costaleros sobre la cabeza?",
                options: ["Una corona", "Un costal", "Un sombrero", "Una cinta"],
                correct: 1,
                explanation: "Los costaleros llevan un costal con algodón para protegerse la cabeza."
            },
            {
                question: "¿En qué ciudad se venera a la Virgen del Rocío?",
                options: ["Sevilla", "Almonte", "Huelva", "Málaga"],
                correct: 1,
                explanation: "La Virgen del Rocío se venera en Almonte, provincia de Huelva."
            },
            {
                question: "¿Qué cofradía es conocida como 'El Silencio'?",
                options: ["Jesús Nazareno", "Cristo de la Sed", "Jesús del Gran Poder", "Virgen de la Macarena"],
                correct: 0,
                explanation: "La cofradía de Jesús Nazareno es conocida como 'El Silencio'."
            },
            {
                question: "¿Cuál es el origen de la palabra 'saeta'?",
                options: ["Latín", "Árabe", "Hebreo", "Griego"],
                correct: 1,
                explanation: "La palabra 'saeta' viene del árabe 'sā'ita', que significa flecha."
            },
            {
                question: "¿Qué día comienza oficialmente la Semana Santa?",
                options: ["Domingo de Ramos", "Lunes Santo", "Viernes de Dolores", "Jueves Santo"],
                correct: 0,
                explanation: "La Semana Santa comienza el Domingo de Ramos con la entrada triunfal de Jesús en Jerusalén."
            },
            {
                question: "¿Qué cofradía procesiona el Miércoles Santo en Sevilla?",
                options: ["El Cachorro", "La Hiniesta", "Los Javieres", "Todos los anteriores"],
                correct: 3,
                explanation: "El Miércoles Santo en Sevilla procesionan El Cachorro, La Hiniesta y Los Javieres."
            },
            {
                question: "¿Qué representa el capirote en la Semana Santa?",
                options: ["Pena y humildad", "Poder y gloria", "Alegría y festividad", "Sabiduría"],
                correct: 0,
                explanation: "El capirote representa la penitencia y humildad de los cofrades."
            },
            {
                question: "¿En qué ciudad se celebra la 'Tamborrada'?",
                options: ["Sevilla", "San Sebastián", "Zamora", "Salamanca"],
                correct: 1,
                explanation: "La Tamborrada es una tradición típica de San Sebastián, aunque no es propiamente Semana Santa."
            },
            {
                question: "¿Qué es el 'paso' en una procesión?",
                options: ["El trono con la imagen", "El recorrido", "Los costaleros", "La música"],
                correct: 0,
                explanation: "El 'paso' es el trono o anda que lleva la imagen religiosa."
            },
            {
                question: "¿Cuántos pasos tiene una cofradía típica?",
                options: ["Uno", "Dos", "Tres", "Cuatro"],
                correct: 1,
                explanation: "Tradicionalmente una cofradía tiene dos pasos: el de misterio y el de palio."
            },
            {
                question: "¿Qué es el 'trono de palio'?",
                options: ["El paso con la imagen de Cristo", "El paso con la imagen de la Virgen", "El paso de los costaleros", "El paso de los nazarenos"],
                correct: 1,
                explanation: "El trono de palio es el que lleva la imagen de la Virgen, cubierto por un dosel."
            },
            {
                question: "¿Qué ciudad es famosa por sus procesiones nocturnas?",
                options: ["Sevilla", "Zamora", "Málaga", "Granada"],
                correct: 1,
                explanation: "Zamora es famosa por sus impresionantes procesiones nocturnas."
            },
            {
                question: "¿Qué es el 'paso de misterio'?",
                options: ["El paso con Cristo", "El paso con la Virgen", "El paso de los costaleros", "El paso de los nazarenos"],
                correct: 0,
                explanation: "El paso de misterio lleva la imagen de Cristo representando alguna escena de la Pasión."
            },
            {
                question: "¿Qué cofradía procesiona el Viernes Santo por la mañana en Sevilla?",
                options: ["Gran Poder", "Macarena", "El Cachorro", "Gitanos"],
                correct: 2,
                explanation: "El Cachorro procesiona el Viernes Santo por la mañana en Sevilla."
            },
            {
                question: "¿Qué es el 'costal'?",
                options: ["Una prenda religiosa", "Una protección para la cabeza", "Un instrumento musical", "Una ofrenda"],
                correct: 1,
                explanation: "El costal es una especie de almohadilla que protege la cabeza de los costaleros."
            },
            {
                question: "¿Qué significa 'levantar el paso'?",
                options: ["Terminar la procesión", "Alzar el trono", "Dar la vuelta", "Acelerar el paso"],
                correct: 1,
                explanation: "Levantar el paso significa alzar el trono desde el suelo."
            },
            {
                question: "¿Qué es el 'capataz'?",
                options: ["El jefe de los costaleros", "El sacerdote", "El músico", "El penitente"],
                correct: 0,
                explanation: "El capataz dirige a los costaleros y guía el paso durante la procesión."
            },
            {
                question: "¿Qué ciudad tiene más cofradías en España?",
                options: ["Sevilla", "Málaga", "Granada", "Córdoba"],
                correct: 0,
                explanation: "Sevilla es la ciudad con más cofradías de Semana Santa en España."
            },
            {
                question: "¿Qué es la 'saeta'?",
                options: ["Una canción religiosa", "Un instrumento", "Una vestimenta", "Una procesión"],
                correct: 0,
                explanation: "La saeta es un cante religioso improvisado que se canta a las imágenes."
            },
            {
                question: "¿Qué día no hay procesiones en la Semana Santa?",
                options: ["Lunes Santo", "Martes Santo", "Miércoles Santo", "Sábado Santo"],
                correct: 3,
                explanation: "Tradicionalmente no hay procesiones el Sábado Santo, día de recogimiento."
            },
            {
                question: "¿Qué es el 'besapiés'?",
                options: ["Una procesión", "Una ceremonia de veneración", "Una canción", "Una vestimenta"],
                correct: 1,
                explanation: "El besapiés es una ceremonia donde los fieles besan los pies de la imagen."
            },
            {
                question: "¿Qué cofradía es la más antigua de Sevilla?",
                options: ["Gran Poder", "El Silencio", "La O", "Los Negritos"],
                correct: 3,
                explanation: "La cofradía de Los Negritos es la más antigua documentada en Sevilla."
            },
            {
                question: "¿Qué es el 'nazareno'?",
                options: ["Un miembro de la cofradía", "Un sacerdote", "Un músico", "Un espectador"],
                correct: 0,
                explanation: "El nazareno es el miembro de la cofradía que participa en la procesión."
            },
            {
                question: "¿Qué lleva el nazareno en la mano?",
                options: ["Una cruz", "Un cirio", "Un libro", "Una campana"],
                correct: 1,
                explanation: "Tradicionalmente el nazareno lleva un cirio o vela encendida."
            },
            {
                question: "¿Qué es el 'capirote'?",
                options: ["Un sombrero", "Una capa", "Una capucha cónica", "Una máscara"],
                correct: 2,
                explanation: "El capirote es una capucha cónica que cubre la cabeza del nazareno."
            },
            {
                question: "¿Qué ciudad es famosa por su Semana Santa con 'Cristo de Mena'?",
                options: ["Sevilla", "Málaga", "Granada", "Valladolid"],
                correct: 1,
                explanation: "Málaga es famosa por su Cristo de Mena, obra de Pedro de Mena."
            },
            {
                question: "¿Qué es la 'marcha procesional'?",
                options: ["Un tipo de procesión", "Una pieza musical", "Una vestimenta", "Una ofrenda"],
                correct: 1,
                explanation: "La marcha procesional es una pieza musical que acompaña las procesiones."
            },
            {
                question: "¿Qué instrumento es típico en las procesiones?",
                options: ["Guitarra", "Corneta", "Piano", "Violín"],
                correct: 1,
                explanation: "La corneta es el instrumento típico que acompaña las procesiones."
            },
            {
                question: "¿Qué es el 'trono'?",
                options: ["La procesión", "El paso", "La vestimenta", "La música"],
                correct: 1,
                explanation: "El trono es sinónimo de paso, el soporte que lleva la imagen."
            },
            {
                question: "¿Qué es el 'anda'?",
                options: ["Un tipo de paso", "Una canción", "Una vestimenta", "Un instrumento"],
                correct: 0,
                explanation: "El anda es un tipo de paso portado a hombros sin costales."
            },
            {
                question: "¿Qué es el 'paso de Cristo'?",
                options: ["El paso de misterio", "El paso de palio", "El paso de costaleros", "El paso de nazarenos"],
                correct: 0,
                explanation: "El paso de Cristo es el paso de misterio que representa la Pasión."
            },
            {
                question: "¿Qué es el 'paso de la Virgen'?",
                options: ["El paso de misterio", "El paso de palio", "El paso de costaleros", "El paso de nazarenos"],
                correct: 1,
                explanation: "El paso de la Virgen es el paso de palio, con su dosel característico."
            },
            {
                question: "¿Qué es el 'paso de penitencia'?",
                options: ["El paso con Cristo", "El paso con la Virgen", "El paso de los nazarenos", "El paso de los costaleros"],
                correct: 2,
                explanation: "El paso de penitencia es el conjunto de nazarenos que acompañan la procesión."
            },
            {
                question: "¿Qué es el 'paso de costaleros'?",
                options: ["El paso con Cristo", "El paso con la Virgen", "Los que llevan el paso", "Los nazarenos"],
                correct: 2,
                explanation: "El paso de costaleros son los hermanos que portan el trono."
            },
            {
                question: "¿Qué es el 'paso de música'?",
                options: ["La banda", "La canción", "El instrumento", "La procesión"],
                correct: 0,
                explanation: "El paso de música es la banda que acompaña la procesión."
            },
            {
                question: "¿Qué es el 'paso de cruz'?",
                options: ["El paso con Cristo", "El paso con la Virgen", "Los nazarenos con cruces", "Los costaleros"],
                correct: 2,
                explanation: "El paso de cruz son los nazarenos que llevan cruces en la procesión."
            },
            {
                question: "¿Qué es el 'paso de estandarte'?",
                options: ["El paso principal", "Los nazarenos con estandartes", "La banda", "Los costaleros"],
                correct: 1,
                explanation: "El paso de estandarte son los nazarenos que llevan los estandartes de la cofradía."
            },
            {
                question: "¿Qué es el 'paso de faroles'?",
                options: ["El paso con Cristo", "El paso con la Virgen", "Los nazarenos con faroles", "Los costaleros"],
                correct: 2,
                explanation: "El paso de faroles son los nazarenos que llevan faroles o cirios."
            },
            {
                question: "¿Qué es el 'paso de cirios'?",
                options: ["El paso con Cristo", "El paso con la Virgen", "Los nazarenos con cirios", "Los costaleros"],
                correct: 2,
                explanation: "El paso de cirios son los nazarenos que llevan cirios encendidos."
            },
            {
                question: "¿Qué es el 'paso de cera'?",
                options: ["El paso con Cristo", "El paso con la Virgen", "Los nazarenos con cirios", "Los costaleros"],
                correct: 2,
                explanation: "El paso de cera es otro nombre para los nazarenos que llevan cirios."
            },
            {
                question: "¿Qué es el 'paso de mantilla'?",
                options: ["El paso con Cristo", "El paso con la Virgen", "Las mujeres con mantilla", "Los costaleros"],
                correct: 2,
                explanation: "El paso de mantilla son las mujeres que visten de mantilla en la procesión."
            },
            {
                question: "¿Qué es el 'paso de capa'?",
                options: ["El paso con Cristo", "El paso con la Virgen", "Los nazarenos con capa", "Los costaleros"],
                correct: 2,
                explanation: "El paso de capa son los nazarenos que llevan capa en la procesión."
            },
            {
                question: "¿Qué es el 'paso de capirote'?",
                options: ["El paso con Cristo", "El paso con la Virgen", "Los nazarenos con capirote", "Los costaleros"],
                correct: 2,
                explanation: "El paso de capirote son los nazarenos que llevan el típico capirote."
            },
            {
                question: "¿Qué es el 'paso de antifaz'?",
                options: ["El paso con Cristo", "El paso con la Virgen", "Los nazarenos con antifaz", "Los costaleros"],
                correct: 2,
                explanation: "El paso de antifaz son los nazarenos que llevan antifaz en la procesión."
            },
            {
                question: "¿Qué es el 'paso de capucha'?",
                options: ["El paso con Cristo", "El paso con la Virgen", "Los nazarenos con capucha", "Los costaleros"],
                correct: 2,
                explanation: "El paso de capucha son los nazarenos que llevan capucha en la procesión."
            },
            {
                question: "¿Qué es el 'paso de túnica'?",
                options: ["El paso con Cristo", "El paso con la Virgen", "Los nazarenos con túnica", "Los costaleros"],
                correct: 2,
                explanation: "El paso de túnica son los nazarenos que visten la túnica característica."
            },
            {
                question: "¿Qué es el 'paso de cíngulo'?",
                options: ["El paso con Cristo", "El paso con la Virgen", "Los nazarenos con cíngulo", "Los costaleros"],
                correct: 2,
                explanation: "El paso de cíngulo son los nazarenos que llevan el cíngulo o cinturón."
            },
            {
                question: "¿Qué es el 'paso de escapulario'?",
                options: ["El paso con Cristo", "El paso con la Virgen", "Los nazarenos con escapulario", "Los costaleros"],
                correct: 2,
                explanation: "El paso de escapulario son los nazarenos que llevan el escapulario de la cofradía."
            },
            {
                question: "¿Qué es el 'paso de medalla'?",
                options: ["El paso con Cristo", "El paso con la Virgen", "Los nazarenos con medalla", "Los costaleros"],
                correct: 2,
                explanation: "El paso de medalla son los nazarenos que llevan la medalla de la cofradía."
            },
            {
                question: "¿Qué es el 'paso de rosario'?",
                options: ["El paso con Cristo", "El paso con la Virgen", "Los nazarenos con rosario", "Los costaleros"],
                correct: 2,
                explanation: "El paso de rosario son los nazarenos que rezan el rosario durante la procesión."
            },
            {
                question: "¿Qué es el 'paso de libro'?",
                options: ["El paso con Cristo", "El paso con la Virgen", "Los nazarenos con libro", "Los costaleros"],
                correct: 2,
                explanation: "El paso de libro son los nazarenos que llevan el libro de oraciones."
            },
            {
                question: "¿Qué es el 'paso de campana'?",
                options: ["El paso con Cristo", "El paso con la Virgen", "Los nazarenos con campana", "Los costaleros"],
                correct: 2,
                explanation: "El paso de campana son los nazarenos que llevan campanas en la procesión."
            },
            {
                question: "¿Qué es el 'paso de tambor'?",
                options: ["El paso con Cristo", "El paso con la Virgen", "Los nazarenos con tambor", "Los costaleros"],
                correct: 2,
                explanation: "El paso de tambor son los nazarenos que tocan el tambor en la procesión."
            }

    ];

    // Aleatorizar el orden de las preguntas
    questions = shuffle(questions);

    let currentIndex = 0;

    function renderQuestion() {
        if (currentIndex >= questions.length) {
            gameArea.innerHTML = '<h3>🎉 Has completado el trivial</h3>';
            return;
        }
        const q = questions[currentIndex];
        gameArea.innerHTML = `
            <div class="trivia-question">
                <h3>${q.question}</h3>
                ${q.options.map((opt, i) => `<button class="option" onclick="checkAnswer(${i}, ${q.correct}, '${q.explanation.replace(/'/g, "\\'")}', ${currentIndex})">${opt}</button>`).join('')}
            </div>
        `;
    }

    renderQuestion();
}

function checkAnswer(selected, correct, explanation, currentIndex) {
    if (selected === correct) {
        showMessage('✅ Correcto: ' + explanation, 'success');
    } else {
        showMessage('❌ Incorrecto: ' + explanation, 'error');
    }
    setTimeout(() => {
        currentIndex++;
        const gameArea = document.getElementById('gameArea');
        if (currentIndex < questions.length) {
            const q = questions[currentIndex];
            gameArea.innerHTML = `
                <div class="trivia-question">
                    <h3>${q.question}</h3>
                    ${q.options.map((opt, i) => `<button class="option" onclick="checkAnswer(${i}, ${q.correct}, '${q.explanation.replace(/'/g, "\\'")}', ${currentIndex})">${opt}</button>`).join('')}
                </div>
            `;
        } else {
            gameArea.innerHTML = '<h3>🎉 Has completado el trivial</h3>';
        }
    }, 1500);
}

// 🔔 SISTEMA DE MENSAJES
function showMessage(text, type = 'success') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `game-message ${type}`;
    messageDiv.textContent = text;
    document.body.appendChild(messageDiv);
    setTimeout(() => messageDiv.remove(), 3000);
}


// main.js

(() => {
  // URL del sonido angelical libre de derechos
  const ANGEL_SOUND_URL = 'https://cdn.pixabay.com/download/audio/2022/01/22/audio_bd7d140e38.mp3?filename=angel-wings-flying-110973.mp3';
  // (Puedes cambiarlo por otro recurso si prefieres) :contentReference[oaicite:1]{index=1}

  // Insertar estilos CSS dinámicamente
  const style = document.createElement('style');
  style.innerHTML = `
    /* Modal overlay */
    #gachaModal {
      position: fixed;
      top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(0,0,0,0.8);
      display: none; align-items: center; justify-content: center;
      z-index: 1000;
    }
    #gachaModal .modal-content {
      position: relative;
      width: 90%; max-width: 600px;
      background: #1e1e1e; color: #fff;
      border-radius: 8px;
      padding: 20px;
      text-align: center;
      overflow: hidden;
    }
    #gachaModal .close-btn {
      position: absolute; top: 10px; right: 15px;
      background: transparent; border: none; font-size: 1.5rem; color: #fff;
      cursor: pointer;
    }
    /* SoundCloud controls container */
    #soundCloudControls {
      margin: 20px 0;
      text-align: center;
    }
    #soundCloudControls button {
      margin: 0 5px;
      padding: 10px 15px;
      font-size: 1rem;
      background: #ff5500; color: #fff;
      border: none; border-radius: 4px;
      cursor: pointer;
      transition: background-color .3s, transform .2s;
    }
    #soundCloudControls button:hover {
      background: #e64e00;
      transform: scale(1.05);
    }
    /* Gacha animation area */
    #gachaModal .card-container {
      perspective: 800px;
      margin: 20px 0;
    }
    #gachaModal .card {
      width: 120px; height: 180px;
      background: #333; border-radius: 6px;
      margin: 0 auto;
      transform-style: preserve-3d;
      transform: rotateY(90deg);
      transition: transform .8s;
    }
    #gachaModal .card.flipped {
      transform: rotateY(0);
    }
    #gachaModal .card .front,
    #gachaModal .card .back {
      position: absolute; width: 100%; height: 100%;
      backface-visibility: hidden;
      border-radius: 6px;
      overflow: hidden;
    }
    #gachaModal .card .front {
      background: #444;
      color: #fff;
      display: flex; align-items: center; justify-content: center;
      font-size: 1.2rem;
    }
    #gachaModal .card .back {
      background: #222;
      color: #fff;
      transform: rotateY(180deg);
      display: flex; align-items: center; justify-content: center;
      font-size: 1.2rem;
    }
    /* Rareza efectos */
    .rarity-common { box-shadow: 0 0 10px #888; }
    .rarity-rare { box-shadow: 0 0 20px #4a90e2; }
    .rarity-epic { box-shadow: 0 0 30px #a64ae2; }
    .rarity-legendary { box-shadow: 0 0 40px #e2b84a; }
    /* Partículas */
    #gachaModal .particles {
      position: absolute; top: 0; left: 0;
      width: 100%; height: 100%;
      pointer-events: none;
      overflow: hidden;
    }
    .particle {
      position: absolute;
      width: 6px; height: 6px;
      background: radial-gradient(circle, #fff, rgba(255,255,255,0));
      opacity: 0.8;
      border-radius: 50%;
      animation: rise 1.2s ease-out forwards;
    }
    @keyframes rise {
      from { transform: translateY(0) scale(1); opacity: 0.8; }
      to { transform: translateY(-150px) scale(0.5); opacity: 0; }
    }
  `;
  document.head.appendChild(style);

  // Create modal HTML and append to document body
  const modal = document.createElement('div');
  modal.id = 'gachaModal';
  modal.innerHTML = `
    <div class="modal-content">
      <button class="close-btn">&times;</button>
      <h2 id="modalTitle">Gacha Time!</h2>
      <div class="card-container"><div class="card"><div class="front">?</div><div class="back"></div></div></div>
      <div class="particles"></div>
      <button id="gachaRevealBtn">Revelar carta</button>
    </div>
  `;
  document.body.appendChild(modal);

  const closeBtn = modal.querySelector('.close-btn');
  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  // SoundCloud controls setup
  const soundControlsContainer = document.createElement('div');
  soundControlsContainer.id = 'soundCloudControls';
  soundControlsContainer.innerHTML = `
    <button id="scPlay">Play SoundCloud</button>
    <button id="scPause">Pause SoundCloud</button>
  `;
  const gameArea = document.getElementById('gameArea') || document.body;
  gameArea.appendChild(soundControlsContainer);

  let scPlayer = null;
  // Assumes you have SoundCloud embed IFrame with id="scIframe"
  const scIframe = document.getElementById('scIframe');
  if (scIframe) {
    scPlayer = new window.SC.Widget(scIframe); // SoundCloud widget API
    document.getElementById('scPlay').addEventListener('click', () => scPlayer.play());
    document.getElementById('scPause').addEventListener('click', () => scPlayer.pause());
  } else {
    document.getElementById('scPlay').disabled = true;
    document.getElementById('scPause').disabled = true;
    console.warn('SoundCloud iframe with id="scIframe" not found.');
  }

  // Gacha logic (ejemplo rápido)
  const rarities = ['common', 'rare', 'epic', 'legendary'];
  function pickCard() {
    const rand = Math.random();
    if (rand < 0.6) return { name: 'Carta Común', rarity: 'common' };
    if (rand < 0.85) return { name: 'Carta Rara', rarity: 'rare' };
    if (rand < 0.97) return { name: 'Carta Épica', rarity: 'epic' };
    return { name: 'Carta Legendaria', rarity: 'legendary' };
  }

  const audioAngel = new Audio(ANGEL_SOUND_URL);

  const revealBtn = modal.querySelector('#gachaRevealBtn');
  const cardElem = modal.querySelector('.card');
  const cardBack = modal.querySelector('.card .back');

  revealBtn.addEventListener('click', () => {
    const result = pickCard();
    // Reset card
    cardElem.classList.remove('flipped', ...rarities.map(r => `rarity-${r}`));
    cardBack.textContent = result.name;
    cardElem.classList.add(`rarity-${result.rarity}`);

    // Play sound
    audioAngel.currentTime = 0;
    audioAngel.play();

    // Particles effect
    const particlesContainer = modal.querySelector('.particles');
    for (let i = 0; i < 30; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      p.style.left = Math.random() * 100 + '%';
      p.style.animationDelay = (Math.random() * 0.5) + 's';
      particlesContainer.appendChild(p);
      // remove after animation
      p.addEventListener('animationend', () => p.remove());
    }

    // Trigger flip after short delay
    setTimeout(() => {
      cardElem.classList.add('flipped');
    }, 200);
  });

  // Function to open modal (para trivial o gacha)
  window.openGachaModal = function(title = 'Gacha Time!') {
    modal.querySelector('#modalTitle').textContent = title;
    modal.style.display = 'flex';
  };

  // EXAMPLE: Hook into your trivial/gacha triggers
  // document.getElementById('btnOpenGacha').addEventListener('click', () => openGachaModal());
  // document.getElementById('btnOpenTrivial').addEventListener('click', () => openGachaModal('Trivial Game'));
  
  // Actual trivial/gacha logic debe venir de tu código existente — este archivo sólo añade la ventana modal y animaciones.
})();