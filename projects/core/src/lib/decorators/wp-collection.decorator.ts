import { WordPress } from '../wordpress.service';
import { WpQuery } from '../collection';

export function WpCollection(endpoint: string, query?: WpQuery) {
  return function (target: any, name: string) {

    const selectorFnName = '__' + name + '__selector';

    const createSelect = (res: { endpoint: string, query: WpQuery }) => {
      const wp = WordPress.wp;
      if (!wp) {
        throw new Error('CollectionFactory not connected to WordPress!');
      }
      return wp.collection(res.endpoint, res.query);
    };

    const createSelector = () => ({endpoint, query});

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

