# Player de Vídeo com Playlist (TypeScript + POO)


## Estrutura
- `src/interfaces` - Playable e Describable
- `src/models` - Video, AdVideo, LiveStream
- `src/Playlist.ts` - gerencia coleção de vídeos
- `src/Player.ts` - controles, modos (loop, shuffle) e histórico
- `src/main.ts` - simulação e exemplos


## Como executar
1. Inicialize projeto e instale dependências para TypeScript (exemplo rápido):


```bash
npm init -y
npm install -D typescript ts-node @types/node
npx tsc --init
```


2. Execute a simulação:


```bash
npx ts-node src/main.ts
```


Ou compile com `npx tsc` e rode `node dist/main.js`.


## Onde apliquei os 4 pilares de POO
- **Abstração:** `Video`, `Playlist`, `Player` modelam conceitos distintos; interfaces `Playable` e `Describable` definem contratos.
- **Encapsulamento:** campos como `currentTime`, `videos`, `shuffleOrder`, `history` são privados/protegidos; acesso feito via getters/setters ou métodos públicos.
- **Herança:** `AdVideo` e `LiveStream` estendem `Video`.
- **Polimorfismo:** `play()` e `info()` têm implementações distintas nas subclasses (`AdVideo` mostra anúncio, `LiveStream` mostra ao vivo).


## Detalhes de comportamento
- `Player.setShuffle(true)` cria uma `shuffleOrder` com Fisher-Yates.
- `loop` faz com que ao terminar a ordem (normal ou embaralhada) o player reinicie.
- Histórico guarda uma lista simples com `id - title` dos vídeos tocados. `getHistory()` retorna cópia.


## Observações
- Simulação em `main.ts` demonstra: tocar anúncio → vídeo normal → live → usar next/previous em shuffle e loop e imprimir histórico.
- Para simplificar a simulação não foi implementado um cronômetro real do `currentTime` (não necessário para o objetivo didático).
*/