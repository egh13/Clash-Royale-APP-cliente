import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizChoiceComponent } from './quiz-choice/quiz.component';
import { QuizControlsComponent } from './quiz-controls/quiz.component';

type Choice = { name: string; img: string };

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, QuizChoiceComponent, QuizControlsComponent],
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent {
  readonly items = [
    '67','bostezo','bowling','cerdo','chiken','dientes','esqueleto','heheheha','lengua','lloro','mimimimi','minipekka'
  ];

  readonly assetsMap: Record<string,{ audio: string; gif: string }> = {
    '67': { audio: '67.wav', gif: '67.gif' },
    'bostezo': { audio: 'bostezo.wav', gif: 'bostezo.gif' },
  'bowling': { audio: 'BowlingNieve.wav', gif: 'BowlingNieve.gif' },
    'cerdo': { audio: 'cerdo.wav', gif: 'cerdo.gif' },
    'chiken': { audio: 'gallina.wav', gif: 'gallina.gif' },
    'dientes': { audio: 'dientes.wav', gif: 'dientes.gif' },
    'esqueleto': { audio: 'esqueleto.wav', gif: 'esqueleto.gif' },
    'heheheha': { audio: 'heheheha.wav', gif: 'heheheha.gif' },
    'lengua': { audio: 'lengua.wav', gif: 'lengua.gif' },
    'lloro': { audio: 'lloro.wav', gif: 'lloro.gif' },
    'mimimimi': { audio: 'mimimimi.mp3', gif: 'mimimimi.gif' },
    'minipekka': { audio: 'minipekka.wav', gif: 'minipekka.gif' },
  };

  question?: string; 
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
    for (let i = others.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [others[i], others[j]] = [others[j], others[i]];
    }
    const picks = others.slice(0, 3);
    const all = [...picks, correct];
    for (let i = all.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [all[i], all[j]] = [all[j], all[i]];
    }
    this.correctIndex = all.indexOf(correct);
    return all.map(name => ({ name, img: `/GifRoyale/${this.assetsMap[name]?.gif ?? `${name}.gif`}` }));
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
    const audioFile = this.assetsMap[this.question!]?.audio ?? `${this.question}.wav`;
    const path = `/AudiosRoyale/${audioFile}`;
    fetch(path, { method: 'GET' })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.blob();
      })
      .then(blob => {
        const blobUrl = URL.createObjectURL(blob);
        this.stopAudio();
        this.audio = new Audio(blobUrl);
        this.audio.play().catch(err => {
          console.error('Play error:', err);
          this.feedback = 'No se pudo reproducir el audio (reproducción anulada)';
        });
      })
      .catch(err => {
        console.error('Audio load error:', err);
        this.feedback = `No se pudo cargar el audio: ${err.message}`;
      });
  }
  stopAudio(): void {
    if (this.audio) {
      try { this.audio.pause(); } catch {}
      this.audio = undefined;
    }
  }

  select(i: number): void {
    if (this.feedback) return; 
    if (i === this.correctIndex) {
      this.feedback = '¡Correcto!';
    } else {
      this.feedback = `Incorrecto — la respuesta correcta era "${this.choices[this.correctIndex].name}"`;
    }
    this.stopAudio();
  }
}
