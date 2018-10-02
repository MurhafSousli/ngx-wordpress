import { State, Action, StateContext } from '@ngxs/store';
import { WordPress, WpCollectionRef, WpQuery, WpCollectionState } from '@ngx-wordpress/core';
import { switchMap, tap } from 'rxjs/operators';

export class GetCollection {
  static readonly type = '[WP_COLLECTION] Get';

  constructor(public key: string, public endpoint: string, public query?: WpQuery) {
  }
}

export class GetCollectionSuccess {
  static readonly type = '[WP_COLLECTION] GetSuccess';

  constructor(public key: string, public state: WpCollectionState) {
  }
}

export class GetCollectionFailed {
  static readonly type = '[WP_COLLECTION] GetFailed';

  constructor(public key: string, public state: WpCollectionState) {
  }
}

export class MoreCollection {
  static readonly type = '[WP_COLLECTION] More';

  constructor(public key: string) {
  }
}

export class MoreCollectionSuccess {
  static readonly type = '[WP_COLLECTION] MoreSuccess';

  constructor(public key: string, public state: WpCollectionState) {
  }
}

export class MoreCollectionFailed {
  static readonly type = '[WP_COLLECTION] GetFailed';

  constructor(public key: string, public state: WpCollectionState) {
  }
}

@State<any>({
  name: 'collection',
  defaults: {}
})
export class CollectionState {

  /**
   * Collection Instances
   */
  instances = new Map<string, WpCollectionRef>();

  constructor(private wp: WordPress) {
  }

  @Action(GetCollection)
  getCollection(ctx: StateContext<any>, payload: GetCollection) {

    // Get an instance by key if it already exists otherwise create a new one
    const wpCollection: WpCollectionRef = this.instances.has(payload.key)
      ? this.instances.get(payload.key)
      : this.instances
        .set(payload.key, this.wp.collection(payload.endpoint))
        .get(payload.key);

    return wpCollection.get(payload.query).pipe(
      switchMap((state: WpCollectionState) =>
        ctx.dispatch(state.error
          ? new GetCollectionFailed(payload.key, state)
          : new GetCollectionSuccess(payload.key, state))
      )
    );
      // .subscribe();
  }

  @Action(MoreCollection)
  moreCollection(ctx: StateContext<any>, payload: MoreCollection) {
    if (this.instances.has(payload.key)) {
      const wpCollection: WpCollectionRef = this.instances.get(payload.key);

      return wpCollection.more().pipe(
        switchMap((state: WpCollectionState) =>
          ctx.dispatch(state.error
            ? new MoreCollectionFailed(payload.key, state)
            : new MoreCollectionSuccess(payload.key, state))
        )
      );
        // .subscribe();
    }
  }

  // @Action([GetCollectionSuccess, GetCollectionFailed, MoreCollectionSuccess, MoreCollectionFailed])
  // setCollectionResponse(ctx: StateContext<any>, payload: GetCollectionSuccess | GetCollectionFailed | MoreCollectionSuccess | MoreCollectionFailed) {
  //   console.log(`[Should set ${payload.key}]`, payload.state);
  //   ctx.patchState({[`${payload.key}`]: payload.state});
  // }
  @Action([GetCollectionSuccess])
  testCollectionResponse(ctx: StateContext<any>, payload: GetCollectionSuccess) {
    console.log(`[GetCollectionSuccess ${payload.key}]`, payload.state);
    ctx.patchState({[payload.key]: payload.state});
  }
  @Action([MoreCollectionSuccess])
  test2CollectionResponse(ctx: StateContext<any>, payload: MoreCollectionSuccess) {
    console.log(`[MoreCollectionSuccess ${payload.key}]`, payload.state);
    ctx.patchState({[payload.key]: payload.state});
  }
}
