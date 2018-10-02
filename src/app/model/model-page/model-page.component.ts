import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ClrLoadingState } from '@clr/angular';
import { WpModel, WpModelRef } from '@ngx-wordpress/core';

@Component({
  selector: 'app-model-page',
  templateUrl: './model-page.component.html',
  styleUrls: ['./model-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModelPageComponent {

  @WpModel('posts') posts: WpModelRef;
  id = 17;
  getLoading: ClrLoadingState = ClrLoadingState.DEFAULT;
  createLoading: ClrLoadingState = ClrLoadingState.DEFAULT;
  updateLoading: ClrLoadingState = ClrLoadingState.DEFAULT;
  deleteLoading: ClrLoadingState = ClrLoadingState.DEFAULT;

  createDialog = false;
  updateDialog = false;
  deleteDialog = false;

  get() {
    this.getLoading = ClrLoadingState.LOADING;
    this.posts.get(this.id).subscribe(res => {
      this.getLoading = res.error
        ? ClrLoadingState.ERROR
        : ClrLoadingState.SUCCESS;
    });
  }

  create(body: any) {
    this.createDialog = false;
    this.createLoading = ClrLoadingState.LOADING;
    this.posts.create(body).subscribe(res => {
      this.createLoading = res.error
        ? ClrLoadingState.ERROR
        : ClrLoadingState.SUCCESS;
    });
  }

  update(body: any) {
    this.updateDialog = false;
    this.updateLoading = ClrLoadingState.LOADING;
    this.posts.update(this.id, body).subscribe(res => {
      this.updateLoading = res.error
        ? ClrLoadingState.ERROR
        : ClrLoadingState.SUCCESS;
    });
  }

  delete() {
    this.deleteDialog = false;
    this.deleteLoading = ClrLoadingState.LOADING;
    this.posts.delete(this.id).subscribe(res => {
      this.deleteLoading = res.error
        ? ClrLoadingState.ERROR
        : ClrLoadingState.SUCCESS;
    });
  }

}
