import { State, Action, StateContext } from '@ngxs/store';
import { WordPress, WpModelState, WpModelRef } from '@ngx-wordpress/core';
import { tap } from 'rxjs/operators';

export class GetModel {
  static type = '[WP_MODEL] Get';

  constructor(public key: string, public endpoint: string, public id: number) {
    GetModel.type = `[WP_MODEL] Get [${key}]`;
  }
}

export class GetModelSuccess {
  static readonly type = '[WP_MODEL] GetSuccess';

  constructor(state: WpModelState) {
  }
}

export class GetModelFailed {
  static readonly type = '[WP_MODEL] GetFailed';

  constructor(state: WpModelState) {
  }
}

export class CreateModel {
  static readonly type = '[WP_MODEL] Create';
}

export class CreateModelSuccess {
  static readonly type = '[WP_MODEL] Create';
}

export class CreateModelFailed {
  static readonly type = '[WP_MODEL] Create';
}

export class UpdateModel {
  static readonly type = '[WP_MODEL] Update';
}

export class UpdateModelSuccess {
  static readonly type = '[WP_MODEL] Update';
}

export class UpdateModelFailed {
  static readonly type = '[WP_MODEL] Update';
}

export class DeleteModel {
  static readonly type = '[WP_MODEL] Delete';
}

export class DeleteModelSuccess {
  static readonly type = '[WP_MODEL] Delete';
}

export class DeleteModelFailed {
  static readonly type = '[WP_MODEL] Delete';
}

@State<WpModelState>({
  name: 'wp',
  defaults: {}
})
export class ModelState {

  /**
   * Model Instances
   */
  instances = new Map<string, WpModelRef>();

  constructor(private wp: WordPress) {
  }

  @Action(GetModel)
  get(ctx: StateContext<WpModelState>, payload: GetModel) {
    // Check if WpModelRef exists
    const wpModel: WpModelRef = this.instances.has(payload.key)
      ? this.instances.get(payload.key)
      : this.instances.set(payload.key, this.wp.model(payload.endpoint)).get(payload.key);

    return wpModel.get(payload.id).pipe(
      tap((state: WpModelState) =>
        ctx.dispatch(state.error
          ? new GetModelFailed(state)
          : new GetModelSuccess(state)
        )
      )
    );
  }

  @Action([GetModelSuccess, GetModelFailed])
  setCollectionResponse(ctx: StateContext<any>, payload) {
    ctx.setState(payload);
  }

  // @Action(CreateModel)
  // create({getState, setState}, payload) {
  //   this.wpModel = this.wp.model(payload.endpoint);
  //   return this.wpModel.create(payload.body).pipe(
  //     tap(state => {
  //       setState(state);
  //       this.wpModel.destroy();
  //     })
  //   );
  // }
  //
  // @Action(UpdateModel)
  // update({getState, setState}, payload) {
  //   this.wpModel = this.wp.model(payload.endpoint);
  //   return this.wpModel.create(payload.body).pipe(
  //     tap(state => {
  //       setState(state);
  //       this.wpModel.destroy();
  //     })
  //   );
  // }
  //
  // @Action(DeleteModel)
  // more({getState, setState}, payload) {
  //   this.wpModel = this.wp.model(payload.endpoint);
  //   return this.wpModel.delete(payload.id).pipe(
  //     tap(state => {
  //       setState(state);
  //       this.wpModel.destroy();
  //     })
  //   );
  // }
}
