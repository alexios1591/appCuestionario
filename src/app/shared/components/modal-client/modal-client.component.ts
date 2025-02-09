import { Component, EventEmitter, Output, OnInit, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSave, faXmark } from '@fortawesome/free-solid-svg-icons';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ClienteService } from '../../../api/cliente.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { LocalidadService } from '../../../api/localidad.service';

@Component({
  selector: 'app-modal-client',
  imports: [FontAwesomeModule, CommonModule, ReactiveFormsModule],
  templateUrl: './modal-client.component.html',
  styleUrl: './modal-client.component.css',
})
export class ModalClientComponent implements OnInit {
  faSave = faSave;
  faXmark = faXmark;

  @Output() close = new EventEmitter<void>();
  @Output() getClientes = new EventEmitter<void>();

  departamentos: any[] = [];
  provincias: any[] = [];
  distritos: any[] = [];
  registroForm!: FormGroup;

  selectedDepartamento: number | null = null;
  selectedProvincia: number | null = null;

  private fb = inject(FormBuilder);
  localidadService = inject(LocalidadService);
  clienteService = inject(ClienteService);

  ngOnInit() {
    this.initForm();
    this.localidadService.getDepartamento().subscribe(
      (data) => {
        this.departamentos = data.departamento;
      },
      (error) => {
        console.error('Error al cargar departamentos', error);
      }
    );
  }

  initForm() {
    this.registroForm = this.fb.group({
      NomClie: ['', [Validators.required, Validators.minLength(2)]],
      AppClie: ['', [Validators.required]],
      ApmClie: ['', [Validators.required]],
      EmaClie: ['', [Validators.required, Validators.email]],
      CelClie: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
      DniClie: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
      FnaClie: ['', [Validators.required]],
      localidad: [{ value: '', disabled: true }, [Validators.required]],
    });
  }

  onDepartamentoChange(selectElement: HTMLSelectElement) {
    this.registroForm.get('localidad')?.disable();
    this.registroForm.get('localidad')?.setValue('');

    const departamentoId = selectElement.value;
    this.selectedDepartamento = Number(departamentoId);
    this.provincias = [];
    this.distritos = [];
    this.localidadService.getProvincia(Number(departamentoId)).subscribe(
      (data) => {
        this.provincias = data.provincias;
      },
      (error) => {
        console.error('Error al cargar provincias', error);
      }
    );
  }

  onProvinciaChange(selectElement: HTMLSelectElement) {
    this.registroForm.get('localidad')?.disable();
    this.registroForm.get('localidad')?.setValue('');

    const provinciaId = selectElement.value;
    this.selectedProvincia = Number(provinciaId);
    this.distritos = [];
    this.localidadService.getDistrito(Number(provinciaId)).subscribe(
      (data) => {
        this.distritos = data.distritos;
        this.registroForm.get('localidad')?.enable();
      },
      (error) => {
        console.error('Error al cargar distritos', error);
      }
    );
  }

  onSubmit() {
    if (this.registroForm.valid) {
      this.clienteService.insert(this.registroForm.value).subscribe({
        next: (data) => {
          console.log(data);
          localStorage.setItem('cliente', JSON.stringify(data.cliente));

          Swal.fire({
            position: 'top-end',
            text: 'Cliente registrado correctamente.',
            icon: 'success',
            showConfirmButton: false,
            timer: 3000,
          });

          this.closeModal();
          this.getClientes.emit();
        },
        error: (error) => {
          const mensajeError = error.error?.message;

          if (error.error?.errors) {
            Object.keys(error.error.errors).forEach((field) => {
              const formControl = this.registroForm.get(field);
              if (formControl) {
                formControl.setErrors({
                  serverError: error.error.errors[field].join(' '),
                });
                formControl.markAsTouched();
              }
            });
          }

          Swal.fire({
            position: 'top-end',
            text: mensajeError,
            icon: 'error',
            showConfirmButton: false,
            timer: 3000,
          });

          console.error('Error al registrar cliente:', error);
        },
        complete: () => {
          console.log('La operación se completó');
        },
      });
    } else {
      console.error('Formulario inválido');
      console.log();
      this.markFormGroupTouched(this.registroForm);
      Swal.fire({
        position: 'top-end',
        text: 'El formulario contiene errores.',
        icon: 'error',
        showConfirmButton: false,
        timer: 1000,
      });

    }
  }
  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      } else {
        control.markAsTouched();
      }
    });
  }
  getErrorMessage(controlName: string): string | null {
    const control = this.registroForm.get(controlName);

    if (control?.hasError('required')) {
      return 'Este campo es obligatorio.';
    }
    if (control?.hasError('email')) {
      return 'El correo electrónico no es válido.';
    }
    if (control?.hasError('pattern')) {
      return 'El formato no es válido.';
    }
    if (control?.hasError('serverError')) {
      return control.getError('serverError');
    }

    return null;
  }

  closeModal() {
    this.close.emit();
  }
}
