import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

type Choice = { name: string; img: string };

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent {
  // base names (without extension) that exist both as audio and gif
  readonly items = [
    '67','bostezo','bowling','cerdo','chiken','dientes','esqueleto','heheheha','lengua','lloro','mimimimi','minipekka'
  ];

  question?: string; // base name for current audio
  choices: Choice[] = [];
  correctIndex = -1;
  feedback: string | null = null;
  audio?: HTMLAudioElement;

  ngOnInit(): void {
    this.newQuestion();
  }

  private pickRandomBase(): string {
    const i = Math.floor(Math.random() * this.items.length);
    return this.items[i];
  }

  private makeChoices(correct: string): Choice[] {
    const others = this.items.filter(i => i !== correct);
    // shuffle and pick 3
    for (let i = others.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [others[i], others[j]] = [others[j], others[i]];
    }
    const picks = others.slice(0, 3);
    const all = [...picks, correct];
    // shuffle all choices
    for (let i = all.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [all[i], all[j]] = [all[j], all[i]];
    }
    this.correctIndex = all.indexOf(correct);
    return all.map(name => ({ name, img: new URL(`../GifRoyale/${name}.gif`, import.meta.url).href }));
  }

  newQuestion(): void {
    this.stopAudio();
    this.feedback = null;
    const base = this.pickRandomBase();
    this.question = base;
    this.choices = this.makeChoices(base);
  }

  play(): void {
    if (!this.question) return;
  const relative = `../AudiosRoyale/${this.question}${this.audioExt(this.question)}`;
  const path = new URL(relative, import.meta.url).href;
  this.stopAudio();
  this.audio = new Audio(path);
    this.audio.play().catch(() => {
      // ignore play errors (autoplay policy)
    });
  }

  private audioExt(name: string): string {
    // map known names with mp3 vs wav
    if (name === 'mimimimi' || name === 'clash-royale-click') return '.mp3';
    return '.wav';
  }

  stopAudio(): void {
    if (this.audio) {
      try { this.audio.pause(); } catch {}
      this.audio = undefined;
    }
  }

  select(i: number): void {
    if (this.feedback) return; // already answered
    if (i === this.correctIndex) {
      this.feedback = '¡Correcto!';
    } else {
      this.feedback = `Incorrecto — la respuesta correcta era "${this.choices[this.correctIndex].name}"`;
    }
    this.stopAudio();
  }
}
