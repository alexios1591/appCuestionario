import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSave, faXmark } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../../../api/user.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ValidationErrorComponent } from '../validation-error/validation-error.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-edit-perfil',
  imports: [FontAwesomeModule, ReactiveFormsModule, ValidationErrorComponent],
  templateUrl: './modal-edit-perfil.component.html',
})
export class ModalEditPerfilComponent {
  @Output() close = new EventEmitter<void>();
  preguntas: any;
  userForm!: FormGroup;

  user: any;

  ngOnInit(): void {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
    }
    this.userForm.patchValue({
      NomUsu: this.user.NomUsu,
      AppUsu: this.user.AppUsu,
      ApmUsu: this.user.ApmUsu,
      DocUsu: String(this.user.DocUsu),
      EmaUsu: this.user.EmaUsu,
      CelUsu: this.user.CelUsu,
    });
  }

  get NomUsuFb() {
    return this.userForm.controls['NomUsu'];
  }
  get AppUsuFb() {
    return this.userForm.controls['AppUsu'];
  }
  get ApmUsuFb() {
    return this.userForm.controls['ApmUsu'];
  }
  get DocUsuFb() {
    return this.userForm.controls['DocUsu'];
  }
  get EmaUsuFb() {
    return this.userForm.controls['EmaUsu'];
  }
  get CelUsuFb() {
    return this.userForm.controls['CelUsu'];
  }

  constructor(private userService: UserService, private fb: FormBuilder) {
    this.userForm = fb.group({
      NomUsu: [null, [Validators.required, Validators.minLength(2)]],
      AppUsu: [null, [Validators.required, Validators.minLength(2)]],
      ApmUsu: [null, [Validators.required, Validators.minLength(2)]],
      DocUsu: [null, [Validators.required, Validators.pattern(/^\d{8,10}$/)]],
      EmaUsu: [null, [Validators.required, Validators.email]],
      CelUsu: [null, [Validators.required, Validators.pattern(/^\d{9,12}$/)]],
    });
  }

  closeModal() {
    this.close.emit();
  }

  onSubmit(): void {
    if (!this.userForm.valid) {
      this.userForm.markAllAsTouched();
      this.userForm.markAsDirty();
      return;
    }
    Swal.fire({
      title: 'Guardando...',
      text: 'Por favor, espere.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    this.userService
      .updateProfile(this.userForm.value, this.user.CodUsu)
      .subscribe(
        (data) => {
          Swal.fire({
            position: 'top-end',
            text: 'Perfil actualizado correctamente.',
            icon: 'success',
            showConfirmButton: false,
            timer: 1000,
          });

          this.closeModal();
        },
        (error) => {
          Swal.fire({
            position: 'top-end',
            text: 'Error al actualizar el perfil.',
            icon: 'error',
            showConfirmButton: false,
            timer: 1000,
          });
        }
      );
  }

  faXMark = faXmark;
  faSave = faSave;
}
