// Em desenvolvimento os assets ficam em public/game-assets (fora do Git).
// Em produção, NEXT_PUBLIC_GAME_ASSETS_URL aponta para o storage/CDN.
const ASSETS_BASE_URL = process.env.NEXT_PUBLIC_GAME_ASSETS_URL ?? "/game-assets";

export function assetUrl(path: string) {
  return `${ASSETS_BASE_URL}/${path}`;
}
