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
import { ValidationErrorComponent } from "../validation-error/validation-error.component";

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
      DocUsu: this.user.DocUsu,
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
    if(!this.userForm.valid) {
      this.userForm.markAllAsTouched();
      this.userForm.markAsDirty();
      return;
    }

      this.userService.updateProfile(this.userForm.value, this.user.CodUsu).subscribe(
        (data) => {
          console.log(data);
        },
        (error) => {
          console.error('Error al actualizar el perfil', error);
        }
      )

  }

  faXMark = faXmark;
  faSave = faSave;
}
