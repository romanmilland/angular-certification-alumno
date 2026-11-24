import { Component, input } from '@angular/core';
import { Toast } from './toast.model';

@Component({
  selector: 'app-toast',
  styleUrl: './toast.scss',
  templateUrl: './toast.html',
})
export class ToastComponent {
  readonly toast = input<Toast | null>(null);
}
