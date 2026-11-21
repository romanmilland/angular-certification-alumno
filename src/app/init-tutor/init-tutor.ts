import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { APP_VARIANT } from '../config/app-variant';

@Component({
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  selector: 'app-init-tutor',
  styleUrl: './init-tutor.scss',
  templateUrl: './init-tutor.html',
})
export class InitTutor {
  readonly isTeacher = APP_VARIANT === 'teacher';
}
