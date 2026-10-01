// Envia public/game-assets/ (arte e sons licenciados, fora do Git) para o Vercel Blob.
// Uso: node --env-file=.env.local scripts/upload-game-assets.mjs
// Precisa de BLOB_READ_WRITE_TOKEN (criado ao conectar um Blob store ao projeto na Vercel).
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { put } from "@vercel/blob";

const SOURCE = join(import.meta.dirname, "..", "public", "game-assets");
const PREFIX = "game-assets";

if (!process.env.BLOB_READ_WRITE_TOKEN) {
  console.error("Falta BLOB_READ_WRITE_TOKEN (rode com --env-file=.env.local).");
  process.exit(1);
}

const files = (function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
})(SOURCE);

let baseUrl = "";
for (const file of files) {
  const pathname = `${PREFIX}/${relative(SOURCE, file).split(sep).join("/")}`;
  const blob = await put(pathname, readFileSync(file), {
    access: "public",
    addRandomSuffix: false, // URL estável: o jogo monta o caminho a partir da URL base
    allowOverwrite: true, // rodar de novo atualiza os arquivos
    cacheControlMaxAge: 60 * 60 * 24 * 30, // 30 dias de cache no CDN e no navegador
  });
  baseUrl = blob.url.slice(0, blob.url.indexOf(`/${PREFIX}/`) + PREFIX.length + 1);
  console.log("enviado", pathname);
}

console.log(`\n${files.length} arquivos enviados.`);
console.log(`Configure na Vercel: NEXT_PUBLIC_GAME_ASSETS_URL=${baseUrl}`);
