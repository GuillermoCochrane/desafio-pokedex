// Juegos agrupados por generación
export const generations = [
  {
    id: "generation-i",
    name: "Generación I",
    versions: ["red-blue", "yellow"],
  },
  {
    id: "generation-ii",
    name: "Generación II",
    versions: ["gold-silver", "crystal"],
  },
  {
    id: "generation-iii",
    name: "Generación III",
    versions: ["ruby-sapphire", "emerald", "firered-leafgreen"],
  },
  {
    id: "generation-iv",
    name: "Generación IV",
    versions: ["diamond-pearl", "platinum", "heartgold-soulsilver"],
  },
  {
    id: "generation-v",
    name: "Generación V",
    versions: ["black-white", "black-2-white-2"],
  },
  {
    id: "generation-vi",
    name: "Generación VI",
    versions: ["x-y", "omega-ruby-alpha-sapphire"],
  },
  {
    id: "generation-vii",
    name: "Generación VII",
    versions: [
      "sun-moon",
      "ultra-sun-ultra-moon",
      "lets-go-pikachu-lets-go-eevee",
    ],
  },
  {
    id: "generation-viii",
    name: "Generación VIII",
    versions: ["sword-shield"],
  },
  {
    id: "generation-ix",
    name: "Generación IX",
    versions: ["scarlet-violet"],
  },
];

//Nombres problematicos de versiones
export const versionDisplayNames = {
  "black-2-white-2": "Black 2 / White 2",
  "ultra-sun-ultra-moon": "Ultra Sun / Ultra Moon",
  "lets-go-pikachu-lets-go-eevee": "Let's Go Pikachu / Let's Go Eevee",
  "omega-ruby-alpha-sapphire": "Omega Ruby / Alpha Sapphire",
  "x-y": "X & Y",
};

//Datos estructurados por juegos
export const games = [
  { 
    id: "red-blue",
    name: "Red / Blue",
    generation: "i",
    color: "#ff0000",
    font: "--light-font"
  },
  { 
    id: "yellow",
    name: "Yellow",
    generation: "i",
    color: "#ffff00",
    font: "--dark-font"
  },
  {
    id: "gold-silver",
    name: "Gold / Silver",
    generation: "ii",
    color: "#ffd700",
    font: "--dark-font"
  },
  { 
    id: "crystal",
    name: "Crystal", 
    generation: "ii", 
    color: "#00ffff",
    font: "--dark-font"
  },
  {
    id: "ruby-sapphire",
    name: "Ruby / Sapphire",
    generation: "iii",
    color: "#ff0000",
    font: "--light-font"
  },
  { 
    id: "emerald",
    name: "Emerald",
    generation: "iii",
    color: "#00ff00",
    font: "--dark-font"
  },
  {
    id: "firered-leafgreen",
    name: "FireRed / LeafGreen",
    generation: "iii",
    color: "#ff4500",
    font: "--light-font"
  },
  {
    id: "diamond-pearl",
    name: "Diamond / Pearl",
    generation: "iv",
    color: "#b19cd9",
    font: "--dark-font"
  },
  { 
    id: "platinum",
    name: "Platinum",
    generation: "iv",
    color: "#e5e4e2",
    font: "--dark-font"
  },
  {
    id: "heartgold-soulsilver",
    name: "HeartGold / SoulSilver",
    generation: "iv",
    color: "#ffd700",
    font: "--dark-font"
  },
  {
    id: "black-white",
    name: "Black / White",
    generation: "v",
    color: "#000000",
    font: "--light-font"
  },
  {
    id: "black-2-white-2",
    name: "Black 2 / White 2",
    generation: "v",
    color: "#36454f",
    font: "--light-font"
  },
  { 
    id: "x-y",
    name: "X & Y",
    generation: "vi",
    color: "#007acc",
    font: "--light-font"
  },
  {
    id: "omega-ruby-alpha-sapphire",
    name: "Omega Ruby / Alpha Sapphire",
    generation: "vi",
    color: "#ff0000",
    font: "--light-font"
  },
  { 
    id: "sun-moon",
    name: "Sun/Moon", 
    generation: "vii",
    color: "#ff8c00",
    font: "--light-font"
  },
  {
    id: "ultra-sun-ultra-moon",
    name: "Ultra Sun / Ultra Moon",
    generation: "vii",
    color: "#8a2be2",
    font: "--light-font"
  },
  {
    id: "lets-go-pikachu-lets-go-eevee",
    name: "Let's Go Pikachu / Let's Go Eevee",
    generation: "vii",
    color: "#ffd700",
    font: "--dark-font"
  },
  {
    id: "sword-shield",
    name: "Sword / Shield",
    generation: "viii",
    color: "#0000ff",
    font: "--light-font"
  },
  {
    id: "scarlet-violet",
    name: "Scarlet / Violet",
    generation: "ix",
    color: "#ff2400",
    font: "--light-font"
  },
];

//Datos estructurados por juegos individuales
export const individualGames = [
  { id: null, name: "Todos", color: null, font: "--light-font", version: "red" },
  { id: "red", name: "Red", color: "#ff0000", font: "--light-font" },
  { id: "blue", name: "Blue", color: "#0000ff", font: "--light-font" },
  { id: "yellow", name: "Yellow", color: "#ffcc00", font: "--dark-font" },
  { id: "gold", name: "Gold", color: "#d4af37", font: "--dark-font" },
  { id: "silver", name: "Silver", color: "#c0c0c0", font: "--dark-font" },
  { id: "crystal", name: "Crystal", color: "#4fd9ff", font: "--dark-font" },
  { id: "ruby", name: "Ruby", color: "#e0115f", font: "--light-font" },
  { id: "sapphire", name: "Sapphire", color: "#0f52ba", font: "--light-font" },
  { id: "emerald", name: "Emerald", color: "#50c878", font: "--dark-font" },
  { id: "firered", name: "FireRed", color: "#ff4500", font: "--light-font" },
  { id: "leafgreen", name: "LeafGreen", color: "#32cd32", font: "--dark-font" },
  { id: "diamond", name: "Diamond", color: "#b9f2ff", font: "--dark-font" },
  { id: "pearl", name: "Pearl", color: "#f0f0f0", font: "--dark-font" },
  { id: "platinum", name: "Platinum", color: "#e5e4e2", font: "--dark-font" },
  { id: "heartgold", name: "HeartGold", color: "#ffd700", font: "--dark-font" },
  { id: "soulsilver", name: "SoulSilver", color: "#c0c0c0", font: "--dark-font" },
  { id: "black", name: "Black", color: "#000000", font: "--light-font" },
  { id: "white", name: "White", color: "#ffffff", font: "--dark-font" },
  { id: "black-2", name: "Black 2", color: "#2f2f2f", font: "--light-font" },
  { id: "white-2", name: "White 2", color: "#f8f8f8", font: "--dark-font" },
  { id: "x", name: "X", color: "#0077be", font: "--light-font" },
  { id: "y", name: "Y", color: "#ff69b4", font: "--light-font" },
  { id: "omega-ruby", name: "Omega Ruby", color: "#e0115f", font: "--light-font" },
  { id: "alpha-sapphire", name: "Alpha Sapphire", color: "#0f52ba", font: "--light-font" },
  { id: "sun", name: "Sun", color: "#ff8c00", font: "--light-font" },
  { id: "moon", name: "Moon", color: "#8a2be2", font: "--light-font" },
  { id: "ultra-sun", name: "Ultra Sun", color: "#ff4500", font: "--light-font" },
  { id: "ultra-moon", name: "Ultra Moon", color: "#4b0082", font: "--light-font" },
  { id: "lets-go-pikachu", name: "Let's Go Pikachu", color: "#ffcc00", font: "--dark-font" },
  { id: "lets-go-eevee", name: "Let's Go Eevee", color: "#8b4513", font: "--light-font" },
  { id: "sword", name: "Sword", color: "#1e90ff", font: "--light-font" },
  { id: "shield", name: "Shield", color: "#dc143c", font: "--light-font" },
  { id: "scarlet", name: "Scarlet", color: "#ff2400", font: "--light-font" },
  { id: "violet", name: "Violet", color: "#8a2be2", font: "--light-font" }
];