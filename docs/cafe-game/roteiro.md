# Roteiro dos diálogos — "Bean There Café" ☕

Mini jogo em pixel art para praticar inglês (nível A1–A2). O jogador começa logo após entrar na cafeteria e precisa conversar, pedir, pagar e retirar o pedido — tudo em inglês.

> Nome da cafeteria é um trocadilho com *"been there"* — pode ser trocado.

---

## Regras do sistema de respostas

Cada fala do NPC tem respostas de 3 tipos:

| Tipo | O que acontece | Pontos |
|---|---|---|
| ✅ **Natural** | Avança | +2 |
| 🟡 **Entendível, mas estranha** | Avança + mostra dica de como soaria melhor | +1 |
| ❌ **Errada** | NPC fica confuso, dica aparece, tenta de novo | 0 |

**Recursos de ajuda:**
- Botão **🇧🇷** traduz a fala do NPC (não tira pontos, mas conta no resultado).
- Extra opcional e grátis: botão **🔊** que lê a fala em voz alta com a **Web Speech API** do navegador (treina a escuta, sem custo).

**Estado inicial:** carteira com **$10.00** e a missão do dia.

---

## Cardápio (`menu.json`)

| Bebidas | Preço | | Comidas | Preço |
|---|---|---|---|---|
| Espresso | $2.50 | | Cookie | $1.50 |
| Cappuccino | $3.50 | | Blueberry muffin | $2.50 |
| Latte | $3.75 | | Croissant | $3.00 |
| Hot chocolate | $3.00 | | Cheese sandwich | $5.00 |
| Iced coffee | $4.00 | | | |

Tamanhos: **small** (preço base) · **medium** (+$0.50) · **large** (+$1.00)

---

## 🎬 Cena 0 — Introdução (em português)

> Você acabou de chegar aos Estados Unidos e entrou numa cafeteria pela primeira vez. Ninguém aqui fala português!
>
> 📋 **Missão:** pedir um **latte médio para viagem** e um **muffin de blueberry**.
> 💵 Você tem **$10.00**.
>
> Use as setas/WASD para andar e **E** para conversar.

🔔 *sino da porta toca*

---

## 🎬 Cena 1 — Emma, a recepcionista (cumprimentos)

**Emma:** *"Hi! Welcome to Bean There Café! How are you today?"*
- ✅ *"I'm good, thanks! How about you?"*
- 🟡 *"I am fine, thank you. And you?"*
  > 💡 Correto, mas bem formal — parece livro escolar. Nativos costumam dizer "I'm good, thanks!"
- ❌ *"Yes, thank you."*
  > 💡 Ela perguntou **como** você está, não uma pergunta de sim/não.

**Emma:** *"I'm great, thanks for asking! Is this your first time here?"*
- ✅ *"Yes, it is! It looks really cozy."*
- 🟡 *"Yes."*
  > 💡 Só "Yes" soa seco. Complemente: "Yes, it is!"
- ❌ *"Yes, is my first time."*
  > 💡 Em inglês a frase precisa de sujeito: "it **is** my first time".

**Emma:** *"Awesome! You can order at the counter. Leo will help you. Enjoy!"*
- ✅ *"Thank you so much!"*
- 🟡 *"Okay."*
- ❌ *"Of nothing!"*
  > 💡 "De nada" não se traduz assim! E aqui você deveria **agradecer**, não responder a um agradecimento.

📘 **Glossário:** *How about you?* · *first time* · *cozy* · *counter*

---

## 🎬 Cena 2 — Leo, o barista (fazer o pedido)

**Leo:** *"Hey there! What can I get for you?"*
- ✅ *"Can I get a latte, please?"*
- 🟡 *"I want a latte."*
  > 💡 "I want" soa direto demais ao pedir. Prefira "Can I get..." ou "I'd like...".
- ❌ *"Give me a latte."*
  > 💡 Soa grosseiro, como uma ordem. Use "Can I get...?"

**Leo:** *"Sure! What size would you like? Small, medium or large?"*
- ✅ *"Medium, please."*
- 🟡 *"The medium."*
- ❌ *"Middle, please."*
  > 💡 Para tamanho de bebida, o certo é "medium".

**Leo:** *"Is that for here or to go?"*
- ✅ *"To go, please."*
- 🟡 *"I will take it."*
  > 💡 Ele entendeu, mas o natural é "To go" (para viagem) ou "For here" (para comer aqui).
- ❌ *"For travel."*
  > 💡 "Para viagem" em inglês é **"to go"**!

**Leo:** *"Got it. Anything else?"*
- ✅ *"Yes, can I also get a blueberry muffin?"*
- 🟡 *"And a muffin."*
- ❌ *"No, thanks."*
  > 💡 Opa, a missão pedia um muffin também! (pode tentar de novo)

**Leo:** *"Perfect. Can I get a name for the order?"*
- ✅ *"It's Eduardo."* (usa o nome escolhido pelo jogador)
- 🟡 *"My name is Eduardo, I am from Brazil and I like coffee."*
  > 💡 Simpático, mas ele só precisava do nome 😄
- ❌ *"I have Eduardo."*
  > 💡 Nome não se "tem" em inglês — use "It's..." ou "My name is...".

**Leo:** *"Thanks, Eduardo! Please pay at the register with Mia."*

📘 **Glossário:** *Can I get...?* · *size* · *to go / for here* · *Anything else?* · *order*
🏷️ **Flag:** `hasOrdered`

---

## 🎬 Cena 3 — Mia, no caixa (números e dinheiro)

> 🔒 Só atende após `hasOrdered`. Antes disso: *"Hi! Please order with Leo first."*

**Mia:** *"Hi! So, a medium latte to go and a blueberry muffin. That'll be six seventy-five."*

Checagem de **escuta de números** — pergunta do jogo: *"Quanto ela disse?"*
- ✅ **$6.75**
- ❌ **$7.65**
- ❌ **$6.57**

**Mia:** *"Will that be cash or card?"*
- ✅ *"Cash, please."*
- 🟡 *"Money."*
  > 💡 Para dinheiro em espécie, usa-se "cash".
- ❌ *"Yes."*
  > 💡 Ela deu duas opções — escolha uma!

💵 *Jogador entrega $10.00*

**Mia:** *"Out of ten... here's your change."*

Pergunta do jogo: *"Quanto de troco você deve receber?"*
- ✅ **$3.25** → *"Thank you!"*
- ❌ **$4.25** → dica: *"Confira a conta: 10.00 − 6.75"*

**Mia:** *"Would you like the receipt?"*
- ✅ *"No, thanks. I'm good."*
- ✅ *"Yes, please."*
- ❌ *"I don't like."*
  > 💡 "Would you like...?" é uma oferta — responda "Yes, please" ou "No, thanks".

**Mia:** *"Your order will be ready in a few minutes. Feel free to have a seat!"*

📘 **Glossário:** *That'll be...* · *cash / card* · *change* · *receipt* · *have a seat*
🏷️ **Flag:** `hasPaid` · 💵 carteira: $3.25

---

## 🎬 Cena 4 — Mr. Brown, o cliente (conversa opcional, pontos bônus)

> Um senhor lendo jornal numa mesa. Pode ser feita enquanto o pedido fica pronto.

**Jogador inicia:**
- ✅ *"Excuse me, is this seat taken?"*
- 🟡 *"Can I sit?"*
- ❌ *"This chair is free?"*
  > 💡 Em perguntas, o verbo vem antes: "Is this chair free?" — ou o mais natural: "Is this seat taken?"

**Mr. Brown:** *"Not at all, go ahead! I haven't seen you around. Where are you from?"*
- ✅ *"I'm from Brazil."*
- 🟡 *"Brazil."*
- ❌ *"I'm from Brazilian."*
  > 💡 "Brazil" é o país, "Brazilian" é a nacionalidade: "I'm Brazilian" ou "I'm from Brazil".

**Mr. Brown:** *"Brazil! That's amazing. What do you do?"*
- ✅ *"I'm a software developer."*
- 🟡 *"I work with computers."*
- ❌ *"I do software developer."*
  > 💡 "What do you do?" pergunta a profissão — responda "I'm a...".

**Mr. Brown:** *"Nice! Lovely weather today, isn't it?"*
- ✅ *"Yeah, it's really nice out!"*
- 🟡 *"Yes, the weather is good."*
- ❌ *"Yes, it isn't."*
  > 💡 "Isn't it?" só confirma a frase. Concordar é "Yes, it is!".

**Mr. Brown:** *"Well, it was nice talking to you. Enjoy your coffee!"*
- ✅ *"Nice talking to you too!"*
- ❌ *"Me too!"*
  > 💡 Para retribuir, use "**You** too!" ou "Nice talking to you too!".

📘 **Glossário:** *Is this seat taken?* · *Where are you from?* · *What do you do?* · *isn't it?*
🏷️ **Flag:** `talkedToCustomer` (+ bônus no resultado)

---

## 🎬 Cena 5 — A retirada (resolver um problema)

> 🔒 Liberada após `hasPaid`. Leo chama em voz alta (balão sobre o balcão).

**Leo:** *"Medium cappuccino for Eduardo!"* ← ele errou de propósito

O jogador precisa perceber:
- ✅ *"Excuse me, I think I ordered a latte."*
- 🟡 *"This is wrong."*
  > 💡 Soa como reclamação. "Excuse me, I think..." é bem mais educado.
- ❌ *"Thanks!"* (aceitar o pedido errado)
  > 💡 Opa! Confira — você pediu um **latte**, não um cappuccino.

**Leo:** *"Oh, I'm so sorry! My mistake. Here's your medium latte and your blueberry muffin."*
- ✅ *"No worries! Thank you."*
- 🟡 *"Okay."*
- ❌ *"No problem, is nothing."*
  > 💡 "No worries!" ou "No problem!" já bastam.

📘 **Glossário:** *Excuse me* · *I think I ordered...* · *My mistake* · *No worries!*
🏷️ **Flag:** `gotOrder`

---

## 🎬 Cena 6 — Despedida

> Ao voltar para a porta com o pedido em mãos:

**Emma:** *"Have a nice day!"*
- ✅ *"Thanks, you too!"*
- ❌ *"Thanks, me too!"*
  > 💡 Erro clássico! O certo é "**you** too".

---

## 🏆 Tela de resultado

```
☕ Mission complete!

⭐⭐⭐  Fluency: 34 / 40
💬  Respostas naturais: 14 · Entendíveis: 4 · Erradas: 2
🇧🇷  Traduções usadas: 3
🗣️  Bônus: conversou com Mr. Brown ✔
💵  Troco conferido corretamente ✔

📘 Você aprendeu 21 expressões novas!   [Ver glossário]

[ Jogar de novo ]   [ Nova missão ]
```

**Estrelas:** ⭐ completou · ⭐⭐ 70%+ dos pontos · ⭐⭐⭐ 85%+ e conversou com Mr. Brown

---

## 🔁 Rejogabilidade (versão 2)

O botão **"Nova missão"** sorteia outra do `missions.json`. Os nós de diálogo usam variáveis como `{drink}`, `{size}` e `{total}`, então as mesmas falas servem para pedidos diferentes:

- *"A large iced coffee for here and a cookie"* → $6.50, troco $3.50
- *"A small hot chocolate to go and a croissant"* → $6.00, troco $4.00
- *"A cheese sandwich and a medium cappuccino"* → $9.00 (quase todo o dinheiro — o jogador precisa fazer a conta!)

No MVP, começar com a missão fixa do latte e generalizar depois.

---

**Resumo:** ~20 interações, 21 expressões no glossário, uns 10–15 minutos de jogo.
