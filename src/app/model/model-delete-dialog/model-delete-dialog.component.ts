import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-model-delete-dialog',
  templateUrl: './model-delete-dialog.component.html',
  styleUrls: ['./model-delete-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModelDeleteDialogComponent {
  @Input() open: boolean;
  @Input() id: string;
  @Output() delete = new EventEmitter();
  @Output() close = new EventEmitter();
}
