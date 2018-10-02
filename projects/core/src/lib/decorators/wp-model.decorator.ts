import { WordPress } from '../wordpress.service';

export function WpModel(endpoint?: string) {

  return function (target: any, name: string) {
    const selectorFnName = '__' + name + '__selector';

    const createSelect = x => {
      const wp = WordPress.wp;
      if (!wp) {
        throw new Error('ModelFactory not connected to WordPress!');
      }
      return wp.model(x);
    };

    const createSelector = () => {
      return endpoint;
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
