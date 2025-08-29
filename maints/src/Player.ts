import { Playlist } from "./Playlist";
import { Video } from "./models/Video";

type State = "stopped" | "playing" | "paused";

export class Player {
  private playlist: Playlist;
  private state: State = "stopped";
  private loop = false;
  private shuffle = false;
  private shuffleOrder: number[] = [];
  private shufflePointer = 0;
  private history: string[] = [];

  constructor(playlist: Playlist) {
    this.playlist = playlist;
  }

  private currentIndex(): number {
    if (!this.shuffle) {

      const current = this.playlist.getCurrent();
      if (!current) return 0;
      return this.playlist.indexOf(current);
    } else {
      return this.shuffleOrder[this.shufflePointer] ?? 0;
    }
  }

  private setPlaylistIndex(idx: number) {

    (this.playlist as any).setIndex(idx);
  }

  private pushHistory(video: Video | null) {
    if (!video) return;
    this.history.push(`${video.id} - ${video.title}`);
  }

  getHistory(): string[] {
    return [...this.history];
  }

  play(): void {
    const current = this.playlist.getCurrent();
    if (!current) {
      console.log("Nenhum vídeo na playlist.");
      return;
    }
    this.state = "playing";
    current.play();
    this.pushHistory(current);
  }

  pause(): void {
    const current = this.playlist.getCurrent();
    if (!current) return;
    this.state = "paused";
    current.pause();
  }

  stop(): void {
    const current = this.playlist.getCurrent();
    if (!current) return;
    this.state = "stopped";
    current.stop();
  }

  next(): void {
    if (this.playlist.length === 0) return;

    if (!this.shuffle) {
      const hasNext = (this.playlist as any).hasNext?.() ?? this.playlist.indexOf(this.playlist.getCurrent()!) < this.playlist.length - 1;
      if (hasNext) {
        const idx = (this.playlist as any).nextIndex();
        this.setPlaylistIndex(idx);
      } else if (this.loop) {
        this.setPlaylistIndex(0);
      } else {
        console.log("Fim da playlist.");
        this.stop();
        return;
      }
    } else {
      this.shufflePointer += 1;
      if (this.shufflePointer >= this.shuffleOrder.length) {
        if (this.loop) {
          this.generateShuffleOrder();
          this.shufflePointer = 0;
        } else {
          console.log("Fim da ordem embaralhada.");
          this.stop();
          return;
        }
      }
      const idx = this.shuffleOrder[this.shufflePointer];
      this.setPlaylistIndex(idx);
    }

    this.play();
  }

  previous(): void {
    if (this.playlist.length === 0) return;

    if (!this.shuffle) {
      const hasPrev = (this.playlist as any).hasPrevious?.() ?? this.playlist.indexOf(this.playlist.getCurrent()!) > 0;
      if (hasPrev) {
        const idx = (this.playlist as any).previousIndex();
        this.setPlaylistIndex(idx);
        this.play();
      } else {
        console.log("Início da playlist.");
      }
    } else {
      if (this.shufflePointer > 0) {
        this.shufflePointer -= 1;
        const idx = this.shuffleOrder[this.shufflePointer];
        this.setPlaylistIndex(idx);
        this.play();
      } else {
        console.log("Início da ordem embaralhada.");
      }
    }
  }

  setLoop(on: boolean) {
    this.loop = on;
    console.log(`Loop ${on ? "ON" : "OFF"}`);
  }

  setShuffle(on: boolean) {
    this.shuffle = on;
    console.log(`Shuffle ${on ? "ON" : "OFF"}`);
    if (on) {
      this.generateShuffleOrder();
      this.shufflePointer = 0;
      const idx = this.shuffleOrder[this.shufflePointer];
      this.setPlaylistIndex(idx);
    } else {
      this.shuffleOrder = [];
      this.shufflePointer = 0;
    }
  }

  private generateShuffleOrder() {
    const n = this.playlist.length;
    this.shuffleOrder = Array.from({ length: n }, (_, i) => i);
    for (let i = this.shuffleOrder.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.shuffleOrder[i], this.shuffleOrder[j]] = [this.shuffleOrder[j], this.shuffleOrder[i]];
    }
    console.log("Ordem embaralhada:", this.shuffleOrder.map((i) => (this.playlist as any).getVideoAt(i)?.title));
  }
}