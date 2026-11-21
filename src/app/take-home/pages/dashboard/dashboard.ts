import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../features/services/user-service';
import { User } from '../../users/user.model';


@Component({
  imports: [RouterLink],
  selector: 'app-dashboard',
  styleUrl: './dashboard.scss',
  templateUrl: './dashboard.html',
})
export class Dashboard implements OnInit{

  // private readonly route = inject(ActivatedRoute);
  // private readonly userService = inject(UserService);
  private readonly userService = inject(UserService);

  private user = signal<User | undefined>(undefined);

  // readonly id = toSignal(
  //   this.route.paramMap.pipe(
  //     map(params => params.get('id')),
  //     filter((id): id is string => id !== null),
  //     map(id => parseInt(id))
  //   ),
  //   { initialValue: -1}
  // );

  ngOnInit(): void {
  
    this.user.set(this.userService.user());
    
    // this.userService.getUser(this.id()).subscribe({
    //   next: res => {
    //     this.user.set(res);
    //   },
    //   error: err => {}
    // })
  }

}
