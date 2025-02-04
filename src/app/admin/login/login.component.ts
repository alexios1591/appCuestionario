import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../api/auth/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [ReactiveFormsModule, CommonModule, RouterLink]
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private loginService: LoginService) {
    this.loginForm = this.fb.group({
      NomUsu: ['', [Validators.required]],
      PassUsu: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
      console.log(loginData.PassUsu);

      this.loginService.login(loginData.NomUsu, loginData.PassUsu).subscribe(
        (data) => {
          console.log(data);
          localStorage.setItem('user', JSON.stringify(data.user));

          // Mostrar un toast de éxito
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Inicio de sesión exitoso',
            showConfirmButton: false,
            timer: 1500,
          });

          this.router.navigate(['/admin']);
        },
        (error) => {
          console.error('Error al iniciar sesión', error);

          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Error al iniciar sesión',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      );

      console.log('Datos enviados:', loginData);
    } else {
      console.log('Formulario inválido');

      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'Por favor, completa todos los campos correctamente',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }
}
