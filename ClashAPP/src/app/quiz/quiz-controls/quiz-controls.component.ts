import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quiz-controls',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz-controls.component.html',
  styleUrls: ['./quiz-controls.component.css'],
})
export class QuizControlsComponent {
  @Output() play = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();
}
