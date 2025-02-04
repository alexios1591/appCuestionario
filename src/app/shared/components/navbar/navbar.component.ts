import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'; 

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']  
})
export class NavbarComponent {
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
}
