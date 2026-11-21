import { Component, inject, signal } from '@angular/core';
import { form, FormField, required } from '@angular/forms/signals';
import { Router } from '@angular/router';
import { AuthService } from '../../../features/services/auth-service';
import { User } from '../../../users/user.model';

@Component({
  imports: [FormField],
  selector: 'app-login',
  styleUrl: './login.scss',
  templateUrl: './login.html',
})
export class Login {

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router)

  private notUser = signal<boolean>(false)
  private loginModel = signal<Omit<User, 'id' | 'role'>>({
    name: '',
    email: '',
  })

  loginForm = form(this.loginModel, (schemaPath)=>{
    required(schemaPath.name, {message: 'Nombre requerido'});
    required(schemaPath.email, {message: 'Correo requerido'});
  })

  // Enviar 
  onSubmit(event: Event){
    event.preventDefault()

    this.notUser.set(false);
    const credencials = this.loginModel();

   this.authService.login(credencials).subscribe({
    next: user => {
      this.router.navigate(['./project/dashboard']);
    },
    error: err => {
      this.notUser.set(true);
    }
   });
    
  };

};
