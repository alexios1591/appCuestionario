import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-pregunta',
  imports: [ReactiveFormsModule],
  templateUrl: './pregunta.component.html',
  standalone: true
})
export class PreguntaComponent {
  @Input() indice!: number;
  @Input() pregunta!: string;
  @Input() form!: FormGroup;

  get control() {
    return this.form.get(`q${this.indice + 1}`) as FormControl;
  }
}
