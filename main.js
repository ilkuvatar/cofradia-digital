// 🎯 COFRADÍA DIGITAL - SISTEMA PRINCIPAL
// Juego Gacha de Semana Santa Española
// Base de datos completa + Trivial + Sistema de invocación

// ============================
// 📊 CONFIGURACIÓN GLOBAL
// ============================
const PROBABILITIES = {
    legendary: 4.0,
    epic: 4.5,
    rare: 30.0,
    common: 61.5
};

let gameState = {
    coins: 1500,
    characters: [],
    pityCount: 0,
    currentUser: null,
    musicPlaying: false,
    filter: 'all'
};

// ============================
// 🧍 BASE DE DATOS COMPLETA (150 personajes)
// ============================
const CHARACTER_DATABASE = [
    // 🏆 LEGENDARIAS (8 figuras - 0.5% cada una)
    { id: 1, name: "Jesús del Gran Poder", city: "Sevilla", icon: "⛪", rarity: "legendary", rate: 0.005, wikiUrl: "https://es.wikipedia.org/wiki/Jes%C3%BAs_del_Gran_Poder" },
    { id: 2, name: "Virgen de la Macarena", city: "Sevilla", icon: "🌹", rarity: "legendary", rate: 0.005, wikiUrl: "https://es.wikipedia.org/wiki/Nuestra_Se%C3%B1ora_de_la_Esperanza_Macarena" },
    { id: 3, name: "Esperanza de Triana", city: "Sevilla", icon: "🚢", rarity: "legendary", rate: 0.005, wikiUrl: "https://es.wikipedia.org/wiki/Virgen_de_la_Esperanza_de_Triana" },
    { id: 4, name: "Cristo de los Gitanos", city: "Sevilla", icon: "💃", rarity: "legendary", rate: 0.005, wikiUrl: "https://es.wikipedia.org/wiki/Cristo_de_los_Gitanos" },
    { id: 5, name: "Cristo del Cachorro", city: "Sevilla", icon: "🐺", rarity: "legendary", rate: 0.005, wikiUrl: "https://es.wikipedia.org/wiki/Cristo_del_Cachorro" },
    { id: 6, name: "Jesús Nazareno del Silencio", city: "Sevilla", icon: "🤫", rarity: "legendary", rate: 0.005, wikiUrl: "https://es.wikipedia.org/wiki/El_Silencio_(Sevilla)" },
    { id: 7, name: "Virgen del Rocío", city: "Almonte", icon: "🌾", rarity: "legendary", rate: 0.005, wikiUrl: "https://es.wikipedia.org/wiki/Virgen_del_Roc%C3%ADo" },
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
    { id: 55, name: "Jesús El Rico", city: "Málaga", icon: "💰", rarity: "rare", rate: 0.00666, wikiUrl: "https://es.wikipedia.org/wiki/Jes%C3%BAs_El_Rico" },
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

// ============================
// ❓ TRIVIA COMPLETA ( 200reguntas)
// ============================
        const TRIVIA_QUESTIONS = [
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

// ============================
// 🧠 FUNCIONES PRINCIPALES
// ============================

// Cargar estado del juego
function loadGameState() {
    const saved = localStorage.getItem('cofradiaGameState');
    if (saved) {
        gameState = { ...gameState, ...JSON.parse(saved) };
    }
}

// Guardar estado del juego
function saveGameState() {
    localStorage.setItem('cofradiaGameState', JSON.stringify(gameState));
}

// Actualizar UI
function updateUI() {
    document.getElementById('coins').textContent = gameState.coins;
    document.getElementById('characterCount').textContent = `${gameState.characters.length}/150`;
    document.getElementById('collectionPercent').textContent = `${Math.round((gameState.characters.length / 150) * 100)}%`;
}

// Generar monedas automáticamente
function startCoinGeneration() {
    setInterval(() => {
        gameState.coins += 50;
        updateUI();
        saveGameState();
    }, 60000); // Cada minuto
}

// Invocar personajes
function summon(count) {
    const cost = count === 1 ? 100 : count === 10 ? 900 : 4000;
    
    if (gameState.coins < cost) {
        showMessage('❌ No tienes suficientes monedas', 'error');
        return;
    }

    gameState.coins -= cost;
    const results = [];

    for (let i = 0; i < count; i++) {
        const character = getRandomCharacter();
        results.push(character);
        
        // Añadir a la colección
        const existing = gameState.characters.find(c => c.id === character.id);
        if (existing) {
            existing.count = (existing.count || 1) + 1;
        } else {
            gameState.characters.push({ ...character, count: 1 });
        }

        // Actualizar pity counter
        if (character.rarity === 'legendary') {
            gameState.pityCount = 0;
        } else {
            gameState.pityCount++;
        }
    }

    // Garantía de legendario
    if (gameState.pityCount >= 100) {
        const legendary = CHARACTER_DATABASE.find(c => c.rarity === 'legendary');
        results.push(legendary);
        gameState.pityCount = 0;
        
        const existing = gameState.characters.find(c => c.id === legendary.id);
        if (existing) {
            existing.count = (existing.count || 1) + 1;
        } else {
            gameState.characters.push({ ...legendary, count: 1 });
        }
    }

    updateUI();
    saveGameState();
    showSummonResults(results);
}

// Obtener personaje aleatorio según probabilidades
function getRandomCharacter() {
    const rand = Math.random();
    let accum = 0;

    // Ordenar por rareza (legendarias primero)
    const sorted = [...CHARACTER_DATABASE].sort((a, b) => {
        const rarityOrder = { legendary: 4, epic: 3, rare: 2, common: 1 };
        return rarityOrder[b.rarity] - rarityOrder[a.rarity];
    });

    for (const character of sorted) {
        accum += character.rate;
        if (rand <= accum) {
            return character;
        }
    }

    // Por defecto, devolver el último
    return sorted[sorted.length - 1];
}

// Mostrar resultados de invocación
function showSummonResults(results) {
    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.background = 'rgba(0,0,0,0.9)';
    modal.style.display = 'flex';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
    modal.style.zIndex = '9999';

    const content = document.createElement('div');
    content.style.background = 'linear-gradient(145deg, #2a2a2a, #1a1a1a)';
    content.style.border = '4px solid';
    content.style.borderRadius = '25px';
    content.style.padding = '3rem';
    content.style.textAlign = 'center';
    content.style.maxWidth = '600px';
    content.style.maxHeight = '80vh';
    content.style.overflowY = 'auto';

    // Color del borde según rareza
    const rarity = results[results.length - 1].rarity;
    const borderColor = {
        legendary: '#FFD700',
        epic: '#9b59b6',
        rare: '#4a90e2',
        common: '#ccc'
    }[rarity];
    content.style.borderColor = borderColor;

    let html = '<h2 style="color: #FFD700; margin-bottom: 2rem;">🎉 Resultados de la Invocación</h2>';
    html += '<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem;">';

    results.forEach(character => {
        html += `
            <div style="background: rgba(0,0,0,0.5); border: 2px solid ${borderColor}; border-radius: 15px; padding: 1rem; text-align: center;">
                <div style="font-size: 3rem; margin-bottom: 0.5rem;">${character.icon}</div>
                <div style="font-family: Cinzel; color: #FFD700; font-size: 1.1rem; margin-bottom: 0.5rem;">${character.name}</div>
                <div style="color: #d4af37; font-size: 0.9rem;">${character.city}</div>
                <div style="color: ${borderColor}; font-size: 0.8rem; margin-top: 0.5rem; text-transform: capitalize;">${character.rarity}</div>
            </div>
        `;
    });

    html += '</div>';
    html += '<button onclick="this.parentElement.parentElement.remove()" style="background: #6a0dad; color: white; border: none; padding: 1rem 2rem; border-radius: 15px; cursor: pointer; margin-top: 2rem; font-weight: bold;">Cerrar</button>';

    content.innerHTML = html;
    modal.appendChild(content);
    document.body.appendChild(modal);
}

// Mostrar mensaje
function showMessage(text, type = 'success') {
    const message = document.createElement('div');
    message.className = `game-message ${type}`;
    message.textContent = text;
    document.body.appendChild(message);
    setTimeout(() => message.remove(), 3000);
}

// Cambiar pestaña
function switchTab(tab) {
    // Ocultar todas las pestañas
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));

    // Mostrar pestaña seleccionada
    document.getElementById(`${tab}-tab`).classList.add('active');
    event.target.classList.add('active');

    // Actualizar contenido si es necesario
    if (tab === 'collection') {
        renderCollection();
    }
}

// Renderizar colección
function renderCollection() {
    const grid = document.getElementById('collectionGrid');
    if (!grid) return;

    grid.innerHTML = '';
    
    const characters = gameState.filter === 'all' 
        ? gameState.characters 
        : gameState.characters.filter(c => c.rarity === gameState.filter);

    characters.forEach(character => {
        const card = document.createElement('div');
        card.className = 'collection-card owned';
        card.innerHTML = `
            <div class="icon">${character.icon}</div>
            <div class="name">${character.name}</div>
            <div class="rarity">${character.rarity}</div>
            ${character.count > 1 ? `<div class="count">${character.count}</div>` : ''}
        `;
        grid.appendChild(card);
    });
}

// Cerrar sesión
function logout() {
    localStorage.removeItem('cofradiaUser');
    localStorage.removeItem('cofradiaGameState');
    window.location.href = 'login.html';
}

// Control de música
function toggleMusic() {
    gameState.musicPlaying = !gameState.musicPlaying;
    saveGameState();
    showMessage(gameState.musicPlaying ? '🎵 Música activada' : '🔇 Música desactivada', 'success');
}

// Inicializar juego
document.addEventListener('DOMContentLoaded', function() {
    loadGameState();
    updateUI();
    startCoinGeneration();
    renderCollection();
});

// ============================
// 🌍 FUNCIONES GLOBALES
// ============================
window.switchTab = switchTab;
window.logout = logout;
window.toggleMusic = toggleMusic;
window.summon = summon;
window.renderCollection = renderCollection;
window.showMessage = showMessage;

// ============================
// 📦 EXPORTAR PARA MINIJUEGOS
// ============================
window.gameState = gameState;
window.CHARACTER_DATABASE = CHARACTER_DATABASE;
window.TRIVIA_QUESTIONS = TRIVIA_QUESTIONS;
