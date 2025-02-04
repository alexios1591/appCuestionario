import { Component } from '@angular/core';
import { UserService } from '../../api/user.service';
import {
  faDownload,
  faPlus,
  faSave,
  faTrash,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2'; // Importar SweetAlert2


@Component({
  selector: 'app-user',
  imports: [FontAwesomeModule, ReactiveFormsModule, CommonModule],
  templateUrl: './user.component.html',
})
export class UserComponent {
  users: any[] = [];
  isOpenModal = false;
  successMessage = '';
  errorMessage = '';

  userForm!: FormGroup;

  constructor(private userService: UserService, private fb: FormBuilder) {
    this.userForm = fb.group({
      NomUsu: [null, [Validators.required, Validators.minLength(2)]],
      AppUsu: [null, [Validators.required, Validators.minLength(2)]],
      ApmUsu: [null, [Validators.required, Validators.minLength(2)]],
      DocUsu: [null, [Validators.required, Validators.pattern(/^\d{8,10}$/)]],
      EmaUsu: [null, [Validators.required, Validators.email]],
      CelUsu: [null, [Validators.required, Validators.pattern(/^\d{9,12}$/)]],
      sexUsu: [null, [Validators.required]],
      FnaUsu: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getUSers();
  }

  getUSers(): void {
    const storedUser = localStorage.getItem('user');
        if (!storedUser) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se encontró información del usuario. Por favor, inténtalo nuevamente.',
          });
          return;
        }
      
        const user = JSON.parse(storedUser);
        const codUsu = user?.CodUsu;
      
        if (!codUsu) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'El usuario no tiene un código asignado.',
          });
          return;
        }
    this.userService.getAllUser(codUsu).subscribe(
      (data) => {
        this.users = data.user;
        console.log(this.users);
      },
      (error) => {
        console.error('Error al obtener los clientes', error);
      }
    );
  }

  faDownload = faDownload;
  faPlus = faPlus;
  faXMark = faXmark;
  faSave = faSave;
  faTrash = faTrash

  openModal() {
    this.isOpenModal = true;
  }

  closeModal() {
    this.isOpenModal = false;
    this.successMessage = ''; 
    this.errorMessage = '';
  }

  onSubmit() {
    if (!this.userForm.valid) {
      this.userForm.markAllAsTouched();
      this.userForm.markAsDirty();
      return;
    }

    this.userService.insert(this.userForm.value).subscribe(
      (data) => {
        console.log(data);
        this.getUSers();
        this.successMessage = 'Usuario insertado correctamente.';
        this.closeModal();
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Usuario insertado correctamente.',
        });
      },
      (error) => {
        console.error(error);
        this.errorMessage = 'Ocurrió un error al insertar el usuario.';
        Swal.fire({
            position: 'top-end',
            text: error.error.message,
            icon: 'error',
            showConfirmButton: false,
            timer: 3000 
        });
      }
    );  
  }
  getError(controlName: string): string {
    const control = this.userForm.get(controlName);
    if (control?.hasError('required')) {
      return 'Este campo es obligatorio.';
    }
    if (control?.hasError('minlength')) {
      return 'Debe tener al menos 2 caracteres.';
    }
    if (control?.hasError('email')) {
      return 'Debe ser un correo válido.';
    }
    if (control?.hasError('pattern')) {
      return 'Formato inválido.';
    }
    return '';
  }

  delete(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás recuperar este usuario una vez eliminado.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.delete(id).subscribe(
          (data) => {
            Swal.fire(
              'Eliminado',
              data.message,
              'success'
            );
            console.log(data)
            this.getUSers();
          },
          (error) => {
            Swal.fire(
              'Error',
              error.error.message,
              'error'
            );
          }
        );
      }
    });
  }
  
}
