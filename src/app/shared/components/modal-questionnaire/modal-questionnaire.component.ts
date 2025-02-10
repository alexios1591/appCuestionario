import { Component, inject, Output, EventEmitter, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSave, faXmark } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { CuestionarioService } from '../../../api/cuestionario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-questionnaire',
  imports: [FontAwesomeModule, ReactiveFormsModule, CommonModule],
  templateUrl: './modal-questionnaire.component.html',
  styleUrl: './modal-questionnaire.component.css',
})
export class ModalQuestionnaireComponent {
  @Output() close = new EventEmitter<void>();
  @Output() getClientes = new EventEmitter<void>();
  @Input() cliente: any;

  form: FormGroup;
  usuario: any;

  cuestionarioService = inject(CuestionarioService);

  faSave = faSave;
  faXmark = faXmark;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      Pre1: ['', Validators.required],
      Pre2: ['', Validators.required],
      Pre3: ['', Validators.required],
      Pre4: ['', Validators.required],
      Pre5: ['', Validators.required],
      Pre6: ['', Validators.required],
      Pre7: ['', Validators.required],
      Pre8: ['', Validators.required],
      Pre9: ['', Validators.required],
      Pre10: ['', Validators.required],
      Pre11: ['', Validators.required],
      Pre12: ['', Validators.required],
      Pre13: ['', Validators.required],
      ObsPre: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const usuario = localStorage.getItem('usuario');

    if (usuario) {
      this.usuario = JSON.parse(usuario);
      console.log('Datos del cliente:', this.cliente);
    }
  }

  closeModal() {
    this.close.emit();
  }

  onSubmit(): void {
    if (this.form.valid) {
      const CodClie = this.cliente.CodClie;
      const CodUsu = this.usuario?.CodUsu;
      const formData = {
        ...this.form.value,
        CodUsu,
        CodClie,
      };
      console.log(formData);
      this.cuestionarioService.insert(formData).subscribe(
        (data) => {
          console.log(data);
          Swal.fire({
            icon: 'success',
            title: '¡Éxito!',
            text: 'Cuestionario guardado correctamente.',
            showConfirmButton: false,
            timer: 1000,
          });
          this.closeModal();
          this.getClientes.emit();
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al guardar el cuestionario.',
          });
        }
      );
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Formulario invalido.',
      });
    }
  }
}
