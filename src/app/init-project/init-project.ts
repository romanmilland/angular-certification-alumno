import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from '../take-home/features/footer/footer';
import { Header } from '../take-home/features/header/header';

@Component({
  imports: [RouterOutlet, Header, Footer],
  selector: 'app-init-project',
  styleUrl: './init-project.scss',
  templateUrl: './init-project.html',
})
export class InitProject {
}
