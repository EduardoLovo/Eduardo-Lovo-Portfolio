// Moldura com a proporção do jogo (640x352). Usada pelo botão Play, pelo carregamento e pelo jogo.
export function GameFrame({ children, center = false }: { children: React.ReactNode; center?: boolean }) {
  return (
    <div
      className={`relative aspect-[640/352] w-full overflow-hidden rounded-2xl border border-border bg-[#1b1420] ${
        center ? "flex items-center justify-center" : ""
      }`}
    >
      {children}
    </div>
  );
}
