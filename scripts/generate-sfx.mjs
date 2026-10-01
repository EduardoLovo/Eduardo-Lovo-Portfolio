// Gera os efeitos sonoros "retrô" do jogo (WAV mono 16-bit) a partir de ondas simples.
// Sons criados aqui são nossos: sem licença de terceiros. Uso: node scripts/generate-sfx.mjs
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const RATE = 22050;
const OUT = join(import.meta.dirname, "..", "public", "game-assets", "audio");

const waves = {
  sine: (phase) => Math.sin(2 * Math.PI * phase),
  square: (phase) => (phase % 1 < 0.5 ? 1 : -1),
  triangle: (phase) => 1 - 4 * Math.abs((phase % 1) - 0.5),
};

/**
 * Uma nota: frequência (pode deslizar de `freq` até `to`), forma de onda, duração e decaimento.
 * `start` posiciona a nota dentro do som, permitindo arpejos e acordes.
 */
function note({ freq, to = freq, wave = "square", start = 0, duration, volume = 0.5, decay = 4 }) {
  return { freq, to, wave, start, duration, volume, decay };
}

function render(notes) {
  const length = Math.ceil(Math.max(...notes.map((n) => n.start + n.duration)) * RATE);
  const samples = new Float32Array(length);
  for (const n of notes) {
    const first = Math.floor(n.start * RATE);
    const count = Math.floor(n.duration * RATE);
    let phase = 0;
    for (let i = 0; i < count; i++) {
      const t = i / count;
      phase += (n.freq + (n.to - n.freq) * t) / RATE;
      const attack = Math.min(1, i / (RATE * 0.004)); // 4ms de ataque evita estalos
      const envelope = attack * Math.exp(-n.decay * t);
      samples[first + i] += waves[n.wave](phase) * n.volume * envelope;
    }
  }
  return samples;
}

function toWav(samples) {
  const data = Buffer.alloc(samples.length * 2);
  samples.forEach((s, i) => data.writeInt16LE(Math.round(Math.max(-1, Math.min(1, s)) * 32767), i * 2));
  const header = Buffer.alloc(44);
  header.write("RIFF", 0);
  header.writeUInt32LE(36 + data.length, 4);
  header.write("WAVEfmt ", 8);
  header.writeUInt32LE(16, 16); // tamanho do bloco fmt
  header.writeUInt16LE(1, 20); // PCM
  header.writeUInt16LE(1, 22); // mono
  header.writeUInt32LE(RATE, 24);
  header.writeUInt32LE(RATE * 2, 28); // bytes por segundo
  header.writeUInt16LE(2, 32); // bytes por amostra
  header.writeUInt16LE(16, 34); // bits por amostra
  header.write("data", 36);
  header.writeUInt32LE(data.length, 40);
  return Buffer.concat([header, data]);
}

// Sino de balcão: parciais agudas e "desafinadas" entre si, como metal, tocado duas vezes
const bellStrike = (start) => [
  note({ freq: 1760, wave: "sine", start, duration: 1.1, volume: 0.35, decay: 5 }),
  note({ freq: 1760 * 2.76, wave: "sine", start, duration: 0.5, volume: 0.12, decay: 9 }),
  note({ freq: 1760 * 5.4, wave: "sine", start, duration: 0.25, volume: 0.05, decay: 14 }),
];

const SOUNDS = {
  // Sino da porta / do balcão
  bell: [...bellStrike(0), ...bellStrike(0.16)],
  // Letra do diálogo aparecendo
  blip: [note({ freq: 880, duration: 0.035, volume: 0.25, decay: 6 })],
  // Abrir conversa
  open: [note({ freq: 520, to: 880, wave: "triangle", duration: 0.08, volume: 0.45, decay: 3 })],
  // Resposta natural: arpejo maior subindo
  correct: [523, 659, 784].map((freq, i) =>
    note({ freq, start: i * 0.07, duration: 0.12, volume: 0.3, decay: 5 }),
  ),
  // Resposta entendível: duas notas neutras
  ok: [392, 523].map((freq, i) => note({ freq, wave: "triangle", start: i * 0.09, duration: 0.14, volume: 0.45, decay: 5 })),
  // Resposta errada: tom grave descendo
  wrong: [
    note({ freq: 220, to: 150, duration: 0.28, volume: 0.3, decay: 3 }),
    note({ freq: 223, to: 152, start: 0.01, duration: 0.27, volume: 0.15, decay: 3 }),
  ],
  // Fim de jogo: fanfarra curta
  fanfare: [523, 659, 784, 1047].map((freq, i) =>
    note({ freq, start: i * 0.12, duration: i === 3 ? 0.6 : 0.14, volume: 0.3, decay: i === 3 ? 3 : 5 }),
  ),
};

mkdirSync(OUT, { recursive: true });
for (const [name, notes] of Object.entries(SOUNDS)) {
  const file = join(OUT, `${name}.wav`);
  writeFileSync(file, toWav(render(notes)));
  console.log("gerado", file);
}
