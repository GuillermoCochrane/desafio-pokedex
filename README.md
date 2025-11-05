# 🎮 Pokedex Avanzada | JavaScript Vanilla + Bootstrap

[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E.svg?logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952B3.svg?logo=bootstrap)](https://getbootstrap.com/)
[![PokeAPI](https://img.shields.io/badge/PokeAPI-REST-EF5350.svg)](https://pokeapi.co/)
[![Responsive](https://img.shields.io/badge/Design-Responsive-27B1B1.svg)]()

Una Pokedex interactiva y moderna que demuestra habilidades avanzadas en JavaScript vanilla, arquitectura escalable y UX cuidadosa.

## 🎯 Demo en Vivo
**[👉 Ver Proyecto Desplegado](https://guillermocochrane.github.io/desafio-pokedex/)**

## ✨ Características Destacadas

### 🔍 **Búsqueda Inteligente**
- Búsqueda predictiva con autocomplete
- Cache de 1302 Pokémon para respuestas instantáneas
- Sistema de sugerencias en tiempo real

### 📱 **Experiencia de Usuario**
- **Infinite Scroll** optimizado con lazy loading
- **Modal multi-tabs** (Stats, Movimientos, Habilidades, Ubicaciones)
- **Diseño 100% responsive** (mobile-first)
- **Sistema de notificaciones** en cola

### 🏗️ **Arquitectura Sólida**
- **Modularización extrema** (separación de responsabilidades)
- **Sistema de cache estratificado** (diferentes TTLs por tipo de dato)
- **Manejo de estado** sin librerías externas
- **Error handling** robusto y user-friendly

### 🎮 **Features Técnicos**
- **Filtrado avanzado** por juego individual y métodos de encuentro
- **Ordenamiento dinámico** en tablas (click en headers)
- **Procesamiento complejo** de datos de la PokeAPI
- **Optimizaciones de performance** (batch processing, debouncing natural)

## 🛠️ Stack Tecnológico

| Capa | Tecnologías |
|------|-------------|
| **Frontend** | JavaScript ES6+, Bootstrap 5.3, CSS3 Custom Properties |
| **Arquitectura** | Modular Pattern, Component-based, Cache Strategy |
| **API** | PokeAPI REST |
| **Herramientas** | Git, GitHub Pages, LocalStorage API |

## 🏃‍♂️ Cómo Ejecutar Localmente

```bash
# Clonar el repositorio
git clone https://github.com/guillermocochrane/desafio-pokedex.git

# Entrar al directorio
cd desafio-pokedex

# Abrir en el navegador (no requiere servidor)
open index.html

```

## 📁 Estructura del Proyecto

```
desafio-pokedex/
├── assets/
│   ├── css/                      # Estilos modulares
│   ├── img/                      # Assets visuales
│   ├── js/
│   │   ├── core/                 # Núcleo de la aplicación
│   │   ├── modal_handler/        # Sistema de modales modular
│   │   ├── components/           # Componentes reutilizables
│   │   └── utilities/            # Helpers y utilities
├── index.html
└── README.md
```

## 🚀 Despliegue

El proyecto está desplegado en **GitHub Pages** y se actualiza automáticamente con cada commit a `main`.

## 💡 Decisiones Técnicas Destacadas

1. **JavaScript Vanilla over Frameworks**: Demuestra dominio fundamental del lenguaje
2. **Arquitectura Modular**: Código mantenible y escalable sin overhead de build tools
3. **Cache Estratégico**: Diferentes estrategias según tipo de dato (inicial: 1 semana, individual: 10min)
4. **UX First**: Loading states, notificaciones, feedback constante al usuario

## 👨‍💻 Autor

**Guillermo Cochrane** - [GitHub](https://github.com/guillermocochrane) | [LinkedIn](https://www.linkedin.com/in/guillermo-cochrane/) | [Twitter](https://x.com/DevSouthern) 

## 🎨 Capturas de Pantalla

> --- Proximamente --

---

**Proyecto desarrollado como parte del Curso de Desarrollo Front-End de la UPGL** 🎓  
[Repositorio del Curso](https://github.com/GuillermoCochrane/curso-front-upgl) • [Portfolio del Curso](https://guillermocochrane.github.io/curso-front-upgl/)