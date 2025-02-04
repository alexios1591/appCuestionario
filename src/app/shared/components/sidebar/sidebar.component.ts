import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faBars,
  faCoffee,
  faEdit,
  faHome,
  faSquare,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { ModalEditPerfilComponent } from '../modal-edit-perfil/modal-edit-perfil.component';
@Component({
  selector: 'app-sidebar',
  imports: [
    FontAwesomeModule,
    RouterLink,
    CommonModule,
    ModalEditPerfilComponent,
  ],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  faCoffe = faCoffee;
  faSquare = faSquare;
  faHome = faHome;
  faBars = faBars;
  faUser = faUser;
  faEdit = faEdit;

  isOpenModal = false;

  user: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
      console.log(this.user);
    }
  }

  logout(): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Deseas cerrar sesión',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('user');
        this.user = null;
        this.router.navigate(['/login']);
        Swal.fire('¡Cerrado!', 'Has cerrado sesión correctamente.', 'success');
      }
    });
  }

  isActive(route: string): boolean {
    return this.router.url === route;
  }

  open() {
    this.isOpenModal = true;
  }
  cerrarModal() {
    this.isOpenModal = false;
  }
}
