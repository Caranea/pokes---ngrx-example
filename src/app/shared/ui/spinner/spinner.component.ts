import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [CommonModule],
  template:
    '<div class="spinner"><div></div><div></div><div></div><div></div></div>',
  styleUrl: './spinner.component.scss',
})
export class SpinnerComponent {}
