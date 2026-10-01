// Peças visuais compartilhadas pela interface do jogo

/** Fonte pixel (Pixelify Sans, carregada na página /cafe) */
export const PIXEL_FONT = { fontFamily: "var(--font-pixel), monospace" };

/** Cartão no estilo das caixas de diálogo */
export const PANEL = "rounded-lg border-4 border-[#3b2a33] bg-[#f3eee6] text-[#1b1420] shadow-xl";

/** Suporta **negrito** nos textos do dialogs.json */
export function RichText({ text }: { text: string }) {
  return text
    .split(/(\*\*.+?\*\*)/g)
    .map((part, i) => (part.startsWith("**") ? <strong key={i}>{part.slice(2, -2)}</strong> : <span key={i}>{part}</span>));
}
