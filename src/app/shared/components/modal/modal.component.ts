import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { faXmark, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { CuestionarioService } from '../../../api/cuestionario.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-modal',
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './modal.component.html',
})
export class ModalComponent {
  @Input() cliente: any;
  @Output() close = new EventEmitter<void>();
  preguntas: any;

  faFilePdf = faFilePdf;
  environment = environment;

  cuestionaroService = inject(CuestionarioService);

  ngOnInit() {
    this.cuestionaroService.getById(this.cliente.CodClie).subscribe(
      (data) => {
        this.preguntas = data.cuestionario;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  closeModal() {
    this.close.emit();
  }

  get total(): number {
    return [
      this.preguntas?.Pre1,
      this.preguntas?.Pre2,
      this.preguntas?.Pre3,
      this.preguntas?.Pre4,
      this.preguntas?.Pre5,
      this.preguntas?.Pre6,
      this.preguntas?.Pre7,
      this.preguntas?.Pre8,
      this.preguntas?.Pre9,
      this.preguntas?.Pre11,
    ].reduce((sum, value) => sum + (Number(value) || 0), 0);
  }

  faXMark = faXmark;
}
