/** default endpoints */
export var WpEndpoint;
(function (WpEndpoint) {
    WpEndpoint.discover = '/wp-json/';
    WpEndpoint.posts = '/wp-json/wp/v2/posts/';
    WpEndpoint.users = '/wp-json/wp/v2/users/';
    WpEndpoint.categories = '/wp-json/wp/v2/categories/';
    WpEndpoint.tags = '/wp-json/wp/v2/tags';
    WpEndpoint.pages = '/wp-json/wp/v2/pages/';
    WpEndpoint.comments = '/wp-json/wp/v2/comments/';
    WpEndpoint.media = '/wp-json/wp/v2/media/';
    WpEndpoint.statuses = '/wp-json/wp/v2/statuses/';
    WpEndpoint.taxonomies = '/wp-json/wp/v2/taxonomies/';
    WpEndpoint.types = '/wp-json/wp/v2/types/';
    WpEndpoint.authentication = '/wp-json/wp/v2/users/me?_envelope';
})(WpEndpoint || (WpEndpoint = {}));
//# sourceMappingURL=wp-endpoints.js.map