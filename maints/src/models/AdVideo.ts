import { Video } from "./Video";

export class AdVideo extends Video {
  private advertiser: string;
  private skippableAfterSeconds: number;

  constructor(
    id: string,
    title: string,
    durationSeconds: number,
    author: string,
    advertiser: string,
    skippableAfterSeconds = 5
  ) {
    super(id, title, durationSeconds, author);
    this.advertiser = advertiser;
    this.skippableAfterSeconds = skippableAfterSeconds;
  }

  // Polimorfismo: comportamento diferente em play()
  play(): void {
    this.incrementViews();
    console.log(`▶ ANÚNCIO: ${this.title} - patrocinado por ${this.advertiser}`);
    console.log(`   (skippable after ${this.skippableAfterSeconds}s)`);
    // Simulação: não implementamos contagem de segundos real, apenas mensagem
  }

  info(): string {
    return `${super.info()} [ANÚNCIO - ${this.advertiser}]`;
  }
}