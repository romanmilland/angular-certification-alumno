import { Component, inject, OnInit, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { email, form, FormField, minLength, required } from '@angular/forms/signals';
import { ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs';
import { UserService } from '../../../features/services/user-service';
import { ToastComponent } from '../../../features/toast/toast';
import { Toast } from '../../../features/toast/toast.model';
import { User } from '../../../users/user.model';

@Component({
  imports: [FormField, ToastComponent],
  selector: 'app-register',
  styleUrl: './register.scss',
  templateUrl: './register.html',
})
export class Register implements OnInit{

  private readonly userService = inject(UserService);
  private readonly route = inject(ActivatedRoute);
  private toastTimer: number | null = null;

  private notUser = signal<boolean>(false)
  protected toast = signal<Toast | null>(null);

  readonly id = toSignal(
    this.route.paramMap.pipe(
      map(params => params.get('id')),
      filter((id): id is string => id !== null),
      map(id => parseInt(id))
    ),
    { initialValue: -1}
  );

  private registerModel = signal<User>({
    id: -1,
    name: '',
    email: '',
    role: 'Viewer',
  });

  registerForm = form(this.registerModel, (schemaPath)=>{
    required(schemaPath.name, {message: 'El nombre es obligatorio'});
    minLength(schemaPath.name, 3, {message: 'El nombre debe tener al menos 3 caracteres'});
    required(schemaPath.email, {message: 'El correo es obligatorio'});
    email(schemaPath.email, {message: 'El correo debe tener un formato válido'});
    required(schemaPath.role, {message: 'El rol es obligatorio'});
  });

  protected readonly userRole = this.userService.role;

  ngOnInit(): void {
    if (this.id() === -1) return;

    this.userService.getUser(this.id()).subscribe({
      next: user => {
        this.registerModel.set({
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        });
      },
      error: err => console.error(err)
    });
  }

  onSubmit(event: Event){
    event.preventDefault()

    this.notUser.set(false);
    const credencials = this.registerModel();
    
    if(this.id() === -1){
      this.userService.addUser(credencials).subscribe({
        next: () => {
          this.showToast({ message: 'Usuario creado correctamente.', type: 'success' });
        },
        error: () => {
          this.showToast({ message: 'No se ha podido crear el usuario.', type: 'error' });
        }
      })
    }else{
      this.userService.updateUser(credencials).subscribe({
        next: () => {
          this.showToast({ message: 'Usuario actualizado correctamente.', type: 'success' });
        },
        error: () => {
          this.showToast({ message: 'No se ha podido actualizar el usuario.', type: 'error' });
        }
      })
    }
    
  };

  private showToast(toast: Toast): void {
    if (this.toastTimer !== null) {
      clearTimeout(this.toastTimer);
    }
    this.toast.set(toast);
    this.toastTimer = setTimeout(() => {
      this.toast.set(null);
      this.toastTimer = null;
    }, 3500);
  }

}
