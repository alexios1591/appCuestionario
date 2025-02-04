import { Component, OnInit, inject } from '@angular/core';
import { LocalidadService } from '../../../api/localidad.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClienteService } from '../../../api/cliente.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-insertar',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './insertar.component.html',
})
export class InsertarComponent implements OnInit {
  departamentos: any[] = [];
  provincias: any[] = [];
  distritos: any[] = [];
  registroForm!: FormGroup;

  selectedDepartamento: number | null = null;
  selectedProvincia: number | null = null;

  private fb = inject(FormBuilder);
  localidadService = inject(LocalidadService);
  clienteService = inject(ClienteService)
  router = inject(Router)

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
      CelClie: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\d{9}$/), 
        ],
      ],
      DniClie: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\d{8}$/),
        ],
      ],
      FnaClie: ['', [Validators.required]],
      localidad: ['', [Validators.required]],
    });
  }

  
  onDepartamentoChange(selectElement: HTMLSelectElement) {
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
    const provinciaId = selectElement.value;
    this.selectedProvincia = Number(provinciaId);
    this.distritos = [];
    this.localidadService.getDistrito(Number(provinciaId)).subscribe(
      (data) => {
        this.distritos = data.distritos;
      },
      (error) => {
        console.error('Error al cargar distritos', error);
      }
    );
  }

  onSubmit() {
    if (this.registroForm.valid) {
      this.clienteService.insert(this.registroForm.value).subscribe(
        (data) => {
          console.log(data);
          localStorage.setItem('cliente', JSON.stringify(data.cliente));
          
          Swal.fire({
            position: 'top-end',
            text: 'Cliente registrado correctamente.',
            icon: 'success',
            showConfirmButton: false, 
            timer: 3000 
          });
      
          this.router.navigate(['/cuestionario']);
        },
        (error) => {
          console.log(error);
          
          Swal.fire({
            position: 'top-end',
            text: error.error.message,
            icon: 'error',
            showConfirmButton: false,
            timer: 3000 
          });
        }
      );
    } else {
      console.error('Formulario inválido');
      console.log()
      this.markFormGroupTouched(this.registroForm);
    }
  }
  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
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
  
    return null;
  }
  
}
