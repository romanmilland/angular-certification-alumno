import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { User, UserRole } from '../../users/user.model';
import { UserService } from '../services/user-service';
import { ToastComponent } from '../toast/toast';
import { Toast } from '../toast/toast.model';

@Component({
  imports: [RouterLink, ToastComponent],
  selector: 'app-list-user',
  styleUrl: './list-user.scss',
  templateUrl: './list-user.html',
})
export class ListUser implements OnInit {

  private readonly userService = inject(UserService);
  private toastTimer: number | null = null;

  protected userRole = signal<UserRole>('Viewer');
  protected userList = signal<User[]>([]);
  protected showDeleteModal = signal(false);
  protected userToDeleteId = signal<number | null>(null);
  protected toast = signal<Toast | null>(null);

  ngOnInit(): void {
    this.userRole.set(this.userService?.role() || 'Viewer')
    this.getUsers()
  }

  openDeleteModal(id: number): void {
    this.userToDeleteId.set(id);
    this.showDeleteModal.set(true);
  }

  cancelDelete(): void {
    this.showDeleteModal.set(false);
    this.userToDeleteId.set(null);
  }

  confirmDelete(): void {
    const id = this.userToDeleteId();
    if (id === null) return;
    this.userService.removeUser(id).subscribe({
      next: () => {
        this.userList.update(users => users.filter(u => u.id !== id));
        this.cancelDelete();
        this.showToast({ message: 'Usuario eliminado correctamente.', type: 'success' });
      },
      error: () => {
        this.cancelDelete();
        this.showToast({ message: 'No se ha podido eliminar el usuario.', type: 'error' });
      },
    });
  }

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
