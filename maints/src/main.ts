import { Playlist } from "./Playlist";
import { Player } from "./Player";
import { Video } from "./models/Video";
import { AdVideo } from "./models/AdVideo";
import { LiveStream } from "./models/LiveStream";

// Criação de vídeos
const v1 = new AdVideo("ad1", "Super Promo - 30s", 30, "Marca X", "Marca X", 5);
const v2 = new Video("v1", "Tutorial TypeScript", 600, "Andre Pena");
const v3 = new LiveStream("live1", "Coding Live - Projeto", "Canal Dev", 120);
const v4 = new Video("v2", "Top 10 dicas de programação", 420, "Canal Tech");
const v5 = new Video("v3", "Música Relaxante", 1800, "Chill Beats");

// Criar playlist
const pl = new Playlist();
[ v1, v2, v3, v4, v5 ].forEach(v => pl.add(v));

// Criar player
const player = new Player(pl);

console.log('\n--- Início da Simulação ---\n');

console.log('\nTocar anúncio (AdVideo):');
player.play(); // toca o atual (inicialmente index 0 que é ad1)

console.log('\nNext -> vídeo normal:');
player.next(); // pula para próximo e toca

console.log('\nNext -> live stream:');
player.next();

console.log('\nAtivar shuffle:');
player.setShuffle(true);

console.log('\nNext (shuffle):');
player.next();

console.log('\nPrevious (shuffle):');
player.previous();

console.log('\nAtivar loop e percorrer até o fim da ordem embaralhada:');
player.setLoop(true);
// avançar várias vezes para mostrar reembaralhamento
for (let i = 0; i < 8; i++) {
  player.next();
}

console.log('\nHistórico (últimos tocados):');
console.log(player.getHistory());

console.log('\nInfo do vídeo atual:');
const current = (pl as any).getCurrent();
console.log(current?.info());

console.log('\n--- Fim da Simulação ---\n');