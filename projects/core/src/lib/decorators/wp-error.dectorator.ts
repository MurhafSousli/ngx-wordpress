import { WordPress } from '../wordpress.service';

export function WpError() {

  return function (target: any, name: string) {
    const selectorFnName = '__' + name + '__selector';

    const createSelect = () => {
      const wp = WordPress.wp;
      if (!wp) {
        throw new Error('CollectionFactory not connected to WordPress!');
      }
      return wp.error;
    };

    const createSelector = () => {
      return null;
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
