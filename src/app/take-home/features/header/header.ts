import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { UserService } from '../services/user-service';

@Component({
  imports: [RouterLink],
  selector: 'app-header',
  styleUrl: './header.scss',
  templateUrl: './header.html',
})
export class Header {

  private readonly authService = inject(AuthService);
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);

  readonly user = this.userService.user;

  onLogout(): void {
    this.authService.logout();
    this.userService.refreshCurrentUser();
    this.router.navigate(['/project/home']);
  }

}
