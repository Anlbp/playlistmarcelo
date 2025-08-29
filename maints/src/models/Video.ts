import { Playable } from "../interfaces/Playable";
import { Describable } from "../interfaces/Describable";

export class Video implements Playable, Describable {
  readonly id: string;
  private _title: string;
  private _durationSeconds: number | null; 
  private _author: string;
  private _views: number;
  protected _currentTime: number; 

  constructor(
    id: string,
    title: string,
    durationSeconds: number | null,
    author: string,
    views = 0
  ) {
    this.id = id;
    this._title = title;
    this._durationSeconds = durationSeconds;
    this._author = author;
    this._views = views;
    this._currentTime = 0;
  }

  // Getters / Setters 
  get title() {
    return this._title;
  }
  set title(v: string) {
    if (!v) throw new Error("Title cannot be empty");
    this._title = v;
  }

  get durationSeconds(): number | null {
    return this._durationSeconds;
  }

  get author() {
    return this._author;
  }

  get views() {
    return this._views;
  }

  protected incrementViews() {
    this._views += 1;
  }

  play(): void {
    this.incrementViews();
    this._currentTime = 0;
    console.log(`▶ Reproduzindo: ${this.title} (${this._author})`);
  }

  pause(): void {
    console.log(`II Pausado: ${this.title} @ ${this._currentTime}s`);
  }

  stop(): void {
    this._currentTime = 0;
    console.log(`■ Parado: ${this.title}`);
  }

  info(): string {
    const dur = this.durationSeconds === null ? "(ao vivo)" : `${this.durationSeconds}s`;
    return `[${this.id}] ${this.title} - ${this.author} - ${dur} - ${this.views} views`;
  }
}