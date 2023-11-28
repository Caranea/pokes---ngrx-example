import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../../ui/spinner/spinner.component';

export interface IModal {
  title: string;
  data: { [key: string]: any };
}
@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, SpinnerComponent],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  @Output() close = new EventEmitter();
  @Input({ required: true }) data: IModal | undefined;

  keys: unknown[] = [];
  imageLoaded = false;

  onClose() {
    this.close.emit(null);
  }

  getKeys() {
    const data = this.data?.data;
    return this.keys as Array<keyof typeof data>;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.keys = Object.keys(changes['data'].currentValue.data);
  }

  getType(value: unknown) {
    return typeof value;
  }

  isNested(value: unknown) {
    return Array.isArray(value);
  }

  onImageLoad() {
    this.imageLoaded = true;
  }
}
