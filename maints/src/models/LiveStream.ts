import { Video } from "./Video";

export class LiveStream extends Video {
  private concurrentViewers: number;
  readonly isLive = true;

  constructor(id: string, title: string, author: string, concurrentViewers = 0) {
    super(id, title, null, author); // no fixed duration
    this.concurrentViewers = concurrentViewers;
  }

  play(): void {
    this.incrementViews();
    console.log(`🔴 AO VIVO: ${this.title} - ${this.author} (${this.concurrentViewers} espectadores)`);
  }

  info(): string {
    return `[LIVE] ${this.title} - ${this.author} - ${this.concurrentViewers} espectadores`;
  }
}