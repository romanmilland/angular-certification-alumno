import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { User, UserRole } from '../../users/user.model';
import { UserService } from '../services/user-service';

@Component({
  imports: [RouterLink],
  selector: 'app-list-user',
  styleUrl: './list-user.scss',
  templateUrl: './list-user.html',
})
export class ListUser implements OnInit{

  private readonly userService = inject(UserService);
  
  private userRole = signal<UserRole>('Viewer');
  private userList = signal<User[]>([]);

  ngOnInit(): void {

    this.userRole.set(this.userService?.role() || 'Viewer')
    console.log('role', this.userRole());
    
    this.getUsers()
  }

  deleteUser(id: number){
    this.userService.removeUser(id).subscribe({
      next: user => {
        console.log('Usuario borrado: ', user);
        this.userList.update(users =>
          users.filter(user => user.id !== id)
        );
      },
      error: err => {
        console.log('No se ha podido borrar', err);
        
      }
    })
  }

  getUsers(){
    this.userService.getUsers().subscribe({
      next: users => {
        this.userList.set(users)
      },
      error: err => {
        console.log('Error ', err);
      }})
  }

}
