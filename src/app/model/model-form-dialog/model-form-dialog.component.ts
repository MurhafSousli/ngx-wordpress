import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-model-form-dialog',
  templateUrl: './model-form-dialog.component.html',
  styleUrls: ['./model-form-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModelFormDialogComponent {

  @Input() open: boolean;
  @Input() id: string;
  @Input() data: any = {
    title: '',
    content: ''
  };
  @Output() create = new EventEmitter();
  @Output() close = new EventEmitter();
}
