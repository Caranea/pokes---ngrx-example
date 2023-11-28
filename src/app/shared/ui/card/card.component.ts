import { Component, EventEmitter, Input, Output } from '@angular/core';

import { CommonModule } from '@angular/common';

interface ICard {
  title?: string;
  data?: string | number | boolean | undefined;
  actionTitle?: string;
}
@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input({ required: true }) card!: ICard;
  @Output() action = new EventEmitter();

  onAction() {
    this.action.emit(this.card.data);
  }
}
