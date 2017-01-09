export var WpQueryArgs = (function () {
    function WpQueryArgs(options) {
        this.author = options.author || undefined;
        this.context = options.context || undefined;
        this.filter = options.filter || undefined;
        this.order = options.order || undefined;
        this.orderby = options.orderby || undefined;
        this.page = options.page || undefined;
        this.per_page = options.per_page || undefined;
        this.search = options.search || undefined;
        this.status = options.status || undefined;
        this._embed = options._embed || undefined;
    }
    return WpQueryArgs;
}());
//# sourceMappingURL=wp-query.class.js.map