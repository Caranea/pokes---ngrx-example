import { Component, EventEmitter, Output } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-form.component.html',
  styleUrl: './search-form.component.scss',
})
export class SearchFormComponent {
  @Output() submit = new EventEmitter();
  colors = ['', 'red', 'yellow', 'blue'];

  model = {
    name: '',
    color: '',
  };

  submitData(data: { [key: string]: string }) {
    this.submit.emit(data);
  }

  clearColor() {
    this.model.color = '';
    this.submitData({ color: this.model.color });
  }
}
