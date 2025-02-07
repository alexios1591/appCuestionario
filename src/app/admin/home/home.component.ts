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
  currentPage = 1;
  lastPage = 1;
  maxVisiblePages = 7;

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.getUserFromLocalStorage();
    if (this.user && this.user.CodUsu) {
      this.getClientes(this.user.CodUsu, this.currentPage);
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

  getClientes(codUsu: number, currentPage: number): void {
    this.clienteService.getAll(codUsu, currentPage).subscribe(
      (data) => {
        this.clientes = data.data.map((cliente: any) => ({
          ...cliente,
          DniClie: String(cliente.DniClie || ''),
        }));

        this.currentPage = data.current_page;
        this.lastPage = data.last_page;

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

  get pages(): (number | string)[] {
    const pages: (number | string)[] = [];

    const middleCount = this.maxVisiblePages - 4;
    let left = Math.max(2, this.currentPage - Math.floor(middleCount / 2));
    let right = Math.min(this.lastPage - 1, left + middleCount - 1);

    if (this.currentPage <= Math.ceil(middleCount / 2) + 1) {
      left = 2;
      right = Math.min(this.lastPage - 1, middleCount + 1);
    }

    if (this.currentPage >= this.lastPage - Math.ceil(middleCount / 2) - 1) {
      right = this.lastPage - 1;
      left = Math.max(2, this.lastPage - middleCount);
    }

    if (left > 2) {
      pages.push(1, '...');
    } else {
      pages.push(1);
      right++;
    }

    if (right >= this.lastPage - 1) {
      left--;
    }

    for (let i = left; i <= right; i++) {
      pages.push(i);
    }

    if (right < this.lastPage - 1) {
      pages.push('...', this.lastPage);
    } else {
      pages.push(this.lastPage);
    }

    return pages;
  }

  goToPage(page: number | string) {
    if (typeof page === 'string' || page < 1 || page > this.lastPage) return;
    this.currentPage = page;
    this.getClientes(this.user.CodUsu, this.currentPage);
  }
}
