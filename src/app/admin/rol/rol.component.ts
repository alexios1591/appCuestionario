import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  faDownload,
  faPlus,
  faSave,
  faTrash,
  faXmarkCircle,
} from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { UserService } from '../../api/user.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rol',
  imports: [FontAwesomeModule, CommonModule, ReactiveFormsModule],
  templateUrl: './rol.component.html',
})
export class RolComponent {
  usuarioRoles: any[] = [];
  isOpenModal = false;
  successMessage = '';
  errorMessage = '';
  user: any[] = [];
  roles: any[] = [];
  admi: any;

  rolForm!: FormGroup;

  get CodUsuFb() {
    return this.rolForm.controls['CodUsu'];
  }
  get CodRolFb() {
    return this.rolForm.controls['CodRol'];
  }

  constructor(private userService: UserService, private fb: FormBuilder) {
    this.rolForm = fb.group({
      CodUsu: [null, [Validators.required]],
      CodRol: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getUsuarioRoles();
    this.getUser();
    this.getRoles();
    this.getAdmi();
  }

  getAdmi(){
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.admi = JSON.parse(storedUser);
      console.log(this.admi.CodUsu);
    }
  }

  getUsuarioRoles(): void {
    this.userService.usuarioRoles().subscribe(
      (data) => {
        this.usuarioRoles = data;
        console.log(this.usuarioRoles);
      },
      (error) => {
        console.error('Error al obtener los clientes', error);
      }
    );
  }

  faDownload = faDownload;
  faPlus = faPlus;
  faXMark = faXmarkCircle;
  faSave = faSave;
  faTrash = faTrash;

  openModal() {
    this.isOpenModal = true;
  }

  closeModal() {
    this.isOpenModal = false;
    this.successMessage = '';
    this.errorMessage = '';
  }

  getUser() {
    this.userService.getAll().subscribe(
      (data) => {
        this.user = data.user;
      },
      (error) => {
        console.error('Error al obtener los usuarios', error);
      }
    );
  }

  getRoles() {
    this.userService.getRoles().subscribe(
      (data) => {
        this.roles = data;
      },
      (error) => {
        console.error('Error al obtener los roles', error);
      }
    );
  }

  onSubmit() {
    if (!this.rolForm.valid) {
      this.rolForm.markAllAsTouched();
      this.rolForm.markAsDirty();
      return;
    }
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
  
    
    console.log(this.admi.codUsu);
    this.userService
      .createRoles(this.rolForm.value, codUsu)
      .subscribe(
        (data) => {
          console.log(data);
          this.getUsuarioRoles();
          this.successMessage = 'Rol creado correctamente.';
          this.closeModal();
          Swal.fire({
            icon: 'success',
            title: '¡Éxito!',
            text: 'Rol creado correctamente.',
          });
        },
        (error) => {
          console.error(error);
          this.errorMessage = 'Ocurrió un error al crear el rol.';
          Swal.fire({
            position: 'top-end',
            text: error.error.message,
            icon: 'error',
            showConfirmButton: false,
            timer: 3000,
          });
        }
      );
  }

  delete(id: number) {
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
  
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás recuperar este usuario una vez eliminado.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteRoles(id, codUsu).subscribe(
          (data) => {
            Swal.fire('Eliminado', data.message, 'success');
            console.log(data);
            this.getUsuarioRoles();
          },
          (error) => {
            Swal.fire('Error', error.error.message, 'error');
          }
        );
      }
    });
  }
}
