import { Component } from '@angular/core';
import { ClienteService } from '../../api/cliente.service';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../../shared/components/modal/modal.component';

@Component({
  selector: 'app-home',
  imports: [FontAwesomeModule, ModalComponent, CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  clientes: any[] = [];
  filteredClientes: any[] = [];
  dniSearch: string = '';
  user: any = null;

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.getUserFromLocalStorage();
    if (this.user && this.user.CodUsu) {
      this.getClientes(this.user.CodUsu);
    } else {
      console.error('Usuario no encontrado en localStorage o mal formado');
    }
  }

  getUserFromLocalStorage(): void {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (Array.isArray(parsedUser) && parsedUser.length > 0) {
          this.user = parsedUser[0];
        } else {
          this.user = parsedUser; // Maneja casos donde no sea un arreglo
        }
      } catch (error) {
        console.error('Error al parsear usuario de localStorage', error);
      }
    }
  }

  
  getClientes(codUsu: number): void {
    this.clienteService.getAll(codUsu).subscribe(
      (data) => {
        this.clientes = data.map((cliente: any) => ({
          ...cliente,
          DniClie: String(cliente.DniClie || ''),
        }));
        this.filteredClientes = this.clientes;
        console.log(this.clientes);
      },
      (error) => {
        console.error('Error al obtener los clientes', error);
      }
    );
  }

  filterClientes(): void {
    if (this.dniSearch.trim() === '') {
      this.filteredClientes = this.clientes;
    } else {
      this.filteredClientes = this.clientes.filter((cliente) => {
        const dniClie = String(cliente.DniClie || '');
        return dniClie.includes(this.dniSearch.trim());
      });
    }
  }

  faDownload = faDownload;

  clienteSeleccionado: any = null;
  mostrarModal = false;

  abrirModal(cliente: any) {
    this.clienteSeleccionado = cliente;
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.clienteSeleccionado = null;
  }
}
