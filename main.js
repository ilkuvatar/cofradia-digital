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
            // 🏆 LEGENDARIAS (8 figuras - 0.5% cada una)
            { id: 1, name: "Jesús del Gran Poder", city: "Sevilla", icon: "⛪", rarity: "legendary", rate: 0.005, wikiUrl: "https://es.wikipedia.org/wiki/Jes%C3%BAs_del_Gran_Poder" },
            { id: 2, name: "Virgen de la Macarena", city: "Sevilla", icon: "🌹", rarity: "legendary", rate: 0.005, wikiUrl: "https://es.wikipedia.org/wiki/Nuestra_Se%C3%B1ora_de_la_Esperanza_Macarena" },
            { id: 3, name: "Esperanza de Triana", city: "Sevilla", icon: "🚢", rarity: "legendary", rate: 0.005, wikiUrl: "https://es.wikipedia.org/wiki/Virgen_de_la_Esperanza_de_Triana" },
            { id: 4, name: "Cristo de los Gitanos", city: "Sevilla", icon: "💃", rarity: "legendary", rate: 0.005, wikiUrl: "https://es.wikipedia.org/wiki/Cristo_de_los_Gitanos" },
            { id: 5, name: "Cristo del Cachorro", city: "Sevilla", icon: "🐺", rarity: "legendary", rate: 0.005, wikiUrl: "https://es.wikipedia.org/wiki/Cristo_del_Cachorro" },
            { id: 6, name: "Jesús Nazareno del Silencio", city: "Sevilla", icon: "🤫", rarity: "legendary", rate: 0.005, wikiUrl: "https://es.wikipedia.org/wiki/El_Silencio_(Sevilla)" },
            { id: 7, "name": "Virgen del Rocío", "city": "Almonte", "icon": "🌾", "rarity": "legendary", "rate": 0.005, "wikiUrl": "https://es.wikipedia.org/wiki/Virgen_del_Roc%C3%ADo" },
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