# 🎯 COFRADÍA DIGITAL - Juego Gacha de Semana Santa

## 📋 DESCRIPCIÓN
Un juego web interactivo de estilo gacha con minijuegos, inspirado en la Semana Santa española. Colecciona más de 150 figuras cofrades, participa en minijuegos y construye tu propia colección digital.

## ✨ CARACTERÍSTICAS PRINCIPALES

### 🎮 Sistema Gacha
- **150+ figuras únicas** de hermandades españolas
- **4 niveles de rareza**: Común, Rara, Épica, Legendaria
- **Sistema de garantía**: Legendario garantizado cada 100 invocaciones
- **Probabilidades transparentes**: 4% legendarias, 4.5% épicas, 30% raras, 61.5% comunes

### 🧩 Minijuegos Interactivos

#### 🔤 Sopa de Letras Mejorada
- **Selección interactiva**: Arrastra para seleccionar palabras
- **15 palabras cofrades** para encontrar
- **Recompensas**: 8-20 monedas por palabra encontrada
- **Diseño responsivo** para móviles y tablets
- **Animaciones suaves** al encontrar palabras

#### ❓ Trivial Cofrade
- **8 preguntas** sobre Semana Santa
- **Temas variados**: Historia, tradiciones, hermandades
- **Recompensas**: 50 monedas por respuesta correcta
- **Sistema de retroalimentación** inmediata

#### 🧠 Juego de Memoria
- **8 parejas** de cartas con iconos cofrades
- **Límite de movimientos**: 20 intentos máximo
- **Recompensas**: 200 monedas por completar
- **Dificultad balanceada** para todos los niveles

### 🎵 Sistema de Audio
- **Música de fondo** con controles de volumen
- **Efectos de sonido** en animaciones
- **Controles intuitivos**: Play/Pause y slider de volumen

### 🎨 Animaciones Especiales
- **Estrella de Belén**: Animación dorada cruzando la pantalla
- **Espíritu Santo**: Efecto de fuego y paloma divina
- **Invocaciones especiales**: Cartas con efectos de brillo según rareza

### 💰 Sistema Económico
- **Generación automática**: +50 monedas cada minuto
- **Recompensas por minijuegos**: 10-250 monedas
- **Múltiples opciones de invocación**: x1 (100💰), x10 (900💰), x50 (4000💰)

## 🛠️ TECNOLOGÍAS UTILIZADAS

### Frontend
- **HTML5**: Estructura semántica y accesible
- **CSS3**: Animaciones, gradientes y efectos visuales
- **JavaScript ES6+**: Programación orientada a objetos

### Características Técnicas
- **LocalStorage**: Guardado de progreso automático
- **Responsive Design**: Adaptación a todos los dispositivos
- **PWA Ready**: Preparado para convertir en app web
- **Optimización**: Código modular y eficiente

## 📁 ESTRUCTURA DE ARCHIVOS

```
/
├── index.html          # Página principal del juego
├── login.html          # Sistema de autenticación
├── hermandades.html    # Información sobre hermandades
├── main.js            # Lógica principal del juego
├── minigames.js       # Sistema de minijuegos
└── README.md          # Documentación
```

## 🎮 CÓMO JUGAR

### 1. Inicio de Sesión
- **Opción 1**: Iniciar con Google (requiere configurar Client ID)
- **Opción 2**: Jugar como invitado
- **Progreso**: Se guarda automáticamente en el navegador

### 2. Colección de Figuras
1. **Gana monedas** jugando minijuegos o esperando la generación automática
2. **Invoca figuras** usando tus monedas
3. **Completa tu colección** de 150+ figuras únicas
4. **Comparte tu progreso** con otros jugadores

### 3. Minijuegos
- **Sopa de Letras**: Encuentra palabras arrastrando el dedo/ratón
- **Trivial**: Responde preguntas sobre Semana Santa
- **Memoria**: Encuentra parejas en el menor número de movimientos

## 🎯 MEJORAS IMPLEMENTADAS

### Correcciones de Errores
- ✅ **Error de sintaxis CSS**: Corregido paréntesis extra en línea 321
- ✅ **Sistema de guardado**: Progreso persistente entre sesiones
- ✅ **Navegación mejorada**: Transiciones suaves entre pestañas

### Nuevas Funcionalidades
- ✅ **Sopa de letras interactiva**: Selección por arrastre
- ✅ **Soporte táctil**: Compatible con dispositivos móviles
- ✅ **Animaciones mejoradas**: Efectos visuales más impactantes
- ✅ **Sistema de sonido**: Música de fondo y efectos de audio

### Optimizaciones
- ✅ **Código modular**: JavaScript organizado en archivos separados
- ✅ **Rendimiento**: Animaciones optimizadas con CSS3
- ✅ **Accesibilidad**: Mejoras en la experiencia de usuario

## 🎨 DISEÑO VISUAL

### Paleta de Colores
- **Dorado (#FFD700)**: Elementos principales y rareza legendaria
- **Morado (#6a0dad)**: Elementos secundarios y rareza épica
- **Negro**: Fondo principal con gradientes
- **Blanco**: Texto principal

### Tipografías
- **Cinzel**: Títulos y elementos decorativos
- **Roboto**: Texto principal y contenido

### Efectos Visuales
- **Gradientes**: Fondos con transiciones suaves
- **Sombras**: Profundidad y realce de elementos
- **Animaciones**: Transformaciones y transiciones CSS
- **Filtros**: Efectos de desenfoque y brillo

## 📱 COMPATIBILIDAD

### Navegadores Soportados
- ✅ **Chrome/Chromium**: 90+
- ✅ **Firefox**: 88+
- ✅ **Safari**: 14+
- ✅ **Edge**: 90+

### Dispositivos
- ✅ **Escritorio**: Windows, macOS, Linux
- ✅ **Móvil**: iOS, Android
- ✅ **Tablet**: iPad, Android tablets

## 🚀 INSTALACIÓN Y USO

### Opción 1: Servidor Local
```bash
# Clonar o descargar los archivos
cd cofradia-digital

# Iniciar servidor local
python -m http.server 8000

# Abrir en navegador
# http://localhost:8000
```

### Opción 2: Uso Directo
1. **Descargar** todos los archivos
2. **Abrir** `login.html` en tu navegador
3. **Comenzar** a jugar inmediatamente

## 🔧 CONFIGURACIÓN OPCIONAL

### Google OAuth
1. **Obtener** Client ID en [Google Cloud Console](https://console.cloud.google.com/)
2. **Configurar** dominios autorizados
3. **Actualizar** `GOOGLE_CLIENT_ID` en `login.html`

### Personalización
- **Colores**: Modificar variables CSS en `index.html`
- **Música**: Reemplazar archivo de audio en `index.html`
- **Figuras**: Agregar nuevos personajes en `main.js`

## 📊 ESTADÍSTICAS Y LOGROS

### Sistema de Progreso
- **Colección**: 0/150 figuras iniciales
- **Monedas**: 1500 iniciales (1000 para invitados)
- **Progreso**: Porcentaje de colección completada
- **Garantía**: Contador de invocaciones sin legendario

### Logros Disponibles
- **Coleccionista**: Primera figura legendaria
- **Experto**: Completar todos los minijuegos
- **Millonario**: Alcanzar 10,000 monedas
- **Completista**: Colección al 100%

## 🤝 CONTRIBUIR

### Cómo Ayudar
- **Reportar bugs** en el sistema de issues
- **Sugerir mejoras** para nuevas funcionalidades
- **Agregar contenido**: Nuevas figuras o minijuegos
- **Mejorar traducciones**: Soporte multiidioma

### Desarrollo
1. **Fork** del proyecto
2. **Crear** rama para nuevas funcionalidades
3. **Commit** de cambios con descripciones claras
4. **Push** a la rama
5. **Pull Request** con explicación detallada

## 📄 LICENCIA

Este proyecto es de código abierto para uso educativo y personal.

## 🙏 AGRADECIMIENTOS

- **Comunidad cofrade**: Por la inspiración y tradiciones
- **Desarrolladores**: Por las herramientas y frameworks
- **Diseñadores**: Por los recursos visuales y gráficos
- **Jugadores**: Por el feedback y apoyo

---

**⚜️ ¡Viva la Semana Santa! ⚜️**

*Desarrollado con ❤️ para la comunidad cofrade digital*