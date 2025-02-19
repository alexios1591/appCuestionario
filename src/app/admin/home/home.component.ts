import { Component } from '@angular/core';
import { ClienteService } from '../../api/cliente.service';
import {
  faDownload,
  faFilePdf,
  faFileExcel,
  faPlus,
  faFileAlt,
  faEdit
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { RouterModule } from '@angular/router';
import { environment } from '../../../environments/environment';
import { ModalClientComponent } from '../../shared/components/modal-client/modal-client.component';

@Component({
  selector: 'app-home',
  imports: [
    FontAwesomeModule,
    ModalComponent,
    CommonModule,
    FormsModule,
    RouterModule,
    ModalClientComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  clientes: any[] = [];
  dniSearch: string = '';
  user: any = null;
  currentPage = 1;
  lastPage = 1;
  total = 0;
  maxVisiblePages = 7;

  environment = environment;

  faDownload = faDownload;
  faFilePdf = faFilePdf;
  faFileExcel = faFileExcel;
  faPlus = faPlus;
  faFileAlt = faFileAlt;
  faEdit = faEdit;

  clienteSeleccionado: any = null;
  mostrarModal = false;

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.getUserFromLocalStorage();
    if (this.user && this.user.CodUsu) {
      this.getClientes();
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

  getClientes(): void {
    this.clienteService
      .getAll(this.user.CodUsu, this.currentPage, this.dniSearch.trim())
      .subscribe(
        (data) => {
          this.clientes = data.data.map((cliente: any) => ({
            ...cliente,
            DniClie: String(cliente.DniClie || ''),
          }));

          this.currentPage = data.current_page;
          this.lastPage = data.last_page;
          this.total = data.total;
        },
        (error) => {
          console.error('Error al obtener los clientes', error);
        }
      );
  }

  filterClientes(): void {
    this.getClientes();
  }

  abrirModal(cliente: any) {
    this.clienteSeleccionado = cliente;
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.clienteSeleccionado = null;
  }

  showModalQuestionnaire = false;

  openModalQuestionnaire(cliente: any) {
    this.clienteSeleccionado = cliente;
    this.showModalQuestionnaire = true;
  }

  closeModalQuestionnaire() {
    this.showModalQuestionnaire = false;
    this.clienteSeleccionado = null;
  }

  get pages(): (number | string)[] {
    const pages: (number | string)[] = [];

    if (this.lastPage > this.maxVisiblePages) {
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
    } else {
      for (let i = 1; i <= this.lastPage; i++) {
        pages.push(i);
      }
    }

    return pages;
  }

  goToPage(page: number | string) {
    if (typeof page === 'string' || page < 1 || page > this.lastPage) return;
    this.currentPage = page;
    this.getClientes();
  }
}
