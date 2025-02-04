import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ValidateService } from '../../api/validate.service';
import Swal from 'sweetalert2';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [RouterLink, ReactiveFormsModule, SweetAlert2Module, CommonModule],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  validar!: FormGroup;

  validateService = inject(ValidateService);
  formBuilder = inject(FormBuilder);
  router = inject(Router)

  ngOnInit() {
    this.validar = this.formBuilder.group({
      dni: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
    });
  }
  get dni() {
    return this.validar.get('dni');
  }
  onSubmit() {
    if (this.validar.valid) {
      const dni = this.validar.value.dni;

      this.validateService.validate(dni).subscribe(
        (response) => {
          console.log('DNI validado con éxito', response);
          localStorage.setItem('usuario', JSON.stringify(response.usuario));
          Swal.fire({
            position: 'top-end', 
            icon: 'success', 
            title: 'Bienvenido',
            showConfirmButton: false, 
            timer: 1500,
          });
          this.router.navigate(['/consentimiento']);
        },
        (error) => {
          console.error('Error al validar el DNI', error);
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Error ',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      );
    }else {
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'Por favor ingresa un DNI válido',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }

}
