import { Video } from "./models/Video";

export class Playlist {
  private videos: Video[] = [];
  private currentIndex = 0;

  add(video: Video) {
    this.videos.push(video);
  }

  remove(id: string) {
    const idx = this.videos.findIndex((v) => v.id === id);
    if (idx >= 0) this.videos.splice(idx, 1);
    if (this.currentIndex >= this.videos.length) this.currentIndex = Math.max(0, this.videos.length - 1);
  }

  getCurrent(): Video | null {
    return this.videos.length === 0 ? null : this.videos[this.currentIndex];
  }

  hasNext(): boolean {
    return this.currentIndex < this.videos.length - 1;
  }

  hasPrevious(): boolean {
    return this.currentIndex > 0;
  }

  get length(): number {
    return this.videos.length;
  }

  getVideoAt(idx: number): Video | null {
    if (idx < 0 || idx >= this.videos.length) return null;
    return this.videos[idx];
  }

  indexOf(video: Video): number {
    return this.videos.findIndex((v) => v.id === video.id);
  }


  setIndex(idx: number) {
    if (this.videos.length === 0) return;
    if (idx < 0) idx = 0;
    if (idx >= this.videos.length) idx = this.videos.length - 1;
    this.currentIndex = idx;
  }

  nextIndex(): number {
    return Math.min(this.currentIndex + 1, Math.max(0, this.videos.length - 1));
  }

  previousIndex(): number {
    return Math.max(this.currentIndex - 1, 0);
  }


  listTitles(): string[] {
    return this.videos.map((v) => v.title);
  }
}