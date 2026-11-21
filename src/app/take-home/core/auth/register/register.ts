import { Component, inject, OnInit, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { form, FormField, required } from '@angular/forms/signals';
import { ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs';
import { UserService } from '../../../features/services/user-service';
import { User } from '../../../users/user.model';

@Component({
  imports: [FormField],
  selector: 'app-register',
  styleUrl: './register.scss',
  templateUrl: './register.html',
})
export class Register implements OnInit{

  private readonly userService = inject(UserService);
  private readonly route = inject(ActivatedRoute);

  private notUser = signal<boolean>(false)

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
    required(schemaPath.name, {message: 'Nombre requerido'});
    required(schemaPath.email, {message: 'Correo requerido'});
    required(schemaPath.role, {message: 'Correo requerido'});
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
        next: user => {
          
          console.log('Uusario creado');
          console.log(user);
          
        },
        error: err => {}
      })
    }else{
      this.userService.updateUser(credencials).subscribe({
        next: user => {
          console.log('Usuario actualizado');
          console.log(user);
          
        },
        error: err => {}
      })
    }
    
  };

}
