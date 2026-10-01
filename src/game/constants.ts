// Resolução base: 20x11 tiles de 32px, ampliada sem borrar os pixels
export const TILE = 32;
export const GAME_WIDTH = 640;
export const GAME_HEIGHT = 352;

// Nomes iguais aos tilesets do cafe.tmj e aos arquivos em game-assets/tilesets/
export const TILESETS = ["floors", "walls", "kitchen", "icecream", "grocery", "generic", "livingroom"] as const;

// Nome usado nos diálogos até existir a tela para o jogador digitar o próprio
export const DEFAULT_PLAYER_NAME = "Alex";
