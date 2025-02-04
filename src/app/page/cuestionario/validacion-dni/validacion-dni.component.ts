import { Component, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { ClienteService } from '../../../api/cliente.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-validacion-dni',
  imports: [FontAwesomeModule, CommonModule, FormsModule, RouterLink],
  templateUrl: './validacion-dni.component.html',
})
export class ValidacionDniComponent {
  faSearch = faSearch;

  clientes: any[] = [];
  filteredClientes: any[] = [];
  searchTerm: string = '';
  isDniSelected: boolean = false

  clienteService = inject(ClienteService);
  router = inject(Router)
  user: any

  ngOnInit() {
    this.getClientes()
  }
 

  getClientes(): void {
    this.clienteService.getCustomers().subscribe(
      (data) => {
        this.clientes = data;
        console.log(this.filteredClientes)
      },
      (error) => {
        console.error(error);
      }
    );
  }

  filterClientes() {
    if (this.isDniSelected) {
      this.isDniSelected = false;
      return;
    }
    console.log('Buscando:', this.searchTerm);
    console.log('Clientes disponibles:', this.clientes);
    if (this.searchTerm.trim() === '') {
      this.filteredClientes = [];
    } else {
      this.filteredClientes = this.clientes.filter((cliente) =>
        cliente.DniClie.toString().includes(this.searchTerm.trim())
      );
    }
    console.log('Clientes filtrados:', this.filteredClientes);
  }
  
  
  selectDni(dni: string) {
    this.searchTerm = dni.toString(); 
    this.isDniSelected = true;
    this.filteredClientes = [];
  }

  submitDni() {
    const term = this.searchTerm ? this.searchTerm.toString().trim() : ''; // Convertir a string si no lo es
    if (term !== '') {
      console.log(term);
  
      this.clienteService.getByDni(term).subscribe(
        (response) => {
          Swal.fire({
            title: 'Éxito',
            text: 'Cliente encontrado correctamente.',
            icon: 'success',
            confirmButtonText: 'Continuar',
          }).then(() => {
            localStorage.setItem('cliente', JSON.stringify(response.clientes));
            console.log(response.clientes);
            this.router.navigate(['/cuestionario']);
          });
        },
        (error) => {
          Swal.fire({
            title: 'Error',
            text: error.error?.message || 'Hubo un problema al enviar el DNI.',
            icon: 'error',
            confirmButtonText: 'Intentar nuevamente',
          });
          console.error('Error al enviar el DNI:', error);
        }
      );
    } else {
      Swal.fire({
        title: 'Advertencia',
        text: 'Por favor, ingresa un DNI válido antes de continuar.',
        icon: 'warning',
        confirmButtonText: 'Aceptar',
      });
    }
  }
  
}
