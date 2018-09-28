import { WordPress } from '../wordpress.service';
import { WpQuery } from '../collection/wp-collection.interface';

export function WpCollection(endpoint: string, query?: WpQuery) {
  return function (target: any, name: string) {
    const selectorFnName = '__' + name + '__selector';

    const createSelect = (res: {endpoint: string, query: WpQuery}) => {
      const wp = WordPress.wp;

      if (!wp) {
        throw new Error('CollectionFactory not connected to WordPress!');
      }

      console.log(res, endpoint);

      return wp.collection(res.endpoint, res.query);
      // Extend component's destroy event
      // const destroy = target['ngOnDestroy'];
      // target['ngOnDestroy'] = function () {
      //   typeof destroy === 'function' && destroy.apply(this, arguments);
      //   collection.destroy();
      // };
    };

    const createSelector = () => {
      return {endpoint, query};
    };

    if (delete target[name]) {
      Object.defineProperty(target, selectorFnName, {
        writable: true,
        enumerable: false,
        configurable: true
      });

      Object.defineProperty(target, name, {
        get: function () {
          return this[selectorFnName] || (this[selectorFnName] = createSelect.apply(this, [createSelector()]));
        },
        enumerable: true,
        configurable: true
      });
    }
  };
}

