import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CuestionarioService } from '../../../api/cuestionario.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cuestionario',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './cuestionario.component.html',
})
export class CuestionarioComponent {
  form: FormGroup;
  cliente: any;
  usuario: any;

  cuestionarioService = inject(CuestionarioService)
  router = inject(Router)

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      Pre1: ['', Validators.required],
      Pre2: ['', Validators.required],
      Pre3: ['', Validators.required],
      Pre4: ['', Validators.required],
      Pre5: ['', Validators.required],
      Pre6: ['', Validators.required],
      Pre7: ['', Validators.required],
      Pre8: ['', Validators.required],
      Pre9: ['', Validators.required],
      Pre10: ['', Validators.required],
      Pre11: ['', Validators.required],
      Pre12: ['', Validators.required],
      Pre13: ['', Validators.required],
      ObsPre: ['', Validators.required]
    });
  }
  
  ngOnInit(): void {
    const clienteData = localStorage.getItem('cliente');
    const usuario = localStorage.getItem('usuario'); 
    if (clienteData) {
      this.cliente = JSON.parse(clienteData);
      console.log('Datos del cliente:', this.cliente);
    }
    if (usuario) {
      this.usuario = JSON.parse(usuario);
      console.log('Datos del cliente:', this.cliente);
    }

  }

  onSubmit(): void {
    if (this.form.valid) {
      
      const CodClie = this.cliente[0]?.CodClie; 
      const CodUsu = this.usuario?.CodUsu
      const formData = {
        ...this.form.value,
        CodUsu,     
        CodClie,     
      };
      console.log(formData)
      this.cuestionarioService.insert(formData).subscribe(
        (data) => {
          console.log(data)
          Swal.fire({
                    icon: 'success',
                    title: '¡Éxito!',
                    text: 'Cuestionario guardado correctamente.',
                  });
          this.router.navigate(['/'])
        },
        (error) => {
          Swal.fire({
            icon: 'success',
            title: '¡Éxito!',
            text: 'Cuestionario guardado correctamente.',
          });
        }
      )
    } else {
      Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Formulario invalido.',
              });
    }
  }
}
