import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-home',
  styleUrl: './home.scss',
  templateUrl: './home.html',
})
export class Home implements OnInit {
  private readonly router = inject(Router);

  ngOnInit(): void {
    if (localStorage.getItem('isLogged')) {
      this.router.navigate(['/project/dashboard']);
    }
  }
}
