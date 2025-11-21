import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quiz-choice',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizChoiceComponent {
  @Input() src = '';
  @Input() label = '';
  @Input() disabled = false;
  @Output() choose = new EventEmitter<void>();

  onClick() {
    if (!this.disabled) this.choose.emit();
  }
  
}
