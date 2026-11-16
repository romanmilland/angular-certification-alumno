import { Component, inject, OnInit, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs';
import { UserService } from '../../features/services/user-service';
import { User } from '../../users/user.model';


@Component({
  imports: [],
  selector: 'app-dashboard',
  styleUrl: './dashboard.scss',
  templateUrl: './dashboard.html',
})
export class Dashboard implements OnInit{

  private readonly route = inject(ActivatedRoute);
  private readonly userService = inject(UserService);

  private user = signal<User | undefined>(undefined);

  readonly id = toSignal(
    this.route.paramMap.pipe(
      map(params => params.get('id')),
      filter((id): id is string => id !== null),
      map(id => parseInt(id))
    ),
    { initialValue: -1}
  );

  ngOnInit(): void {
    this.userService.getUser(this.id()).subscribe({
      next: res => {
        this.user.set(res);
      },
      error: err => {}
    })
  }

}
