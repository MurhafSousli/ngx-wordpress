export var WpPost = (function () {
    function WpPost(post) {
        var _this = this;
        this.post = post;
        this.id = function () {
            if (_this.post.id)
                return _this.post.id;
        };
        this.title = function () {
            if (_this.post.title)
                return _this.post.title.rendered;
        };
        this.content = function () {
            if (_this.post.content)
                return _this.post.content.rendered;
        };
        this.excerpt = function () {
            /** filter excerpt from the links */
            if (_this.post.excerpt)
                return _this.post.excerpt.rendered.replace(/<a\b[^>]*>(.*?)<\/a>/i, "");
        };
        this.date = function () {
            if (_this.post.date)
                return _this.post.date;
        };
        this.type = function () {
            if (_this.post.type)
                return _this.post.type;
        };
        this.categories = function () {
            if (_this.post._embedded && _this.post._embedded['wp:term']) {
                return _this.post._embedded['wp:term'][0];
            }
        };
        this.tags = function () {
            if (_this.post._embedded && _this.post._embedded['wp:term'])
                return _this.post._embedded['wp:term'][1];
        };
        this.author = function () {
            if (_this.post._embedded)
                return _this.post._embedded.author;
        };
        /** featuredMedia(): check if has featured image, return false | number */
        this.featuredMedia = function () {
            if (_this.post.featured_media)
                return +_this.post.featured_media;
        };
        /**
         * get post featured image url
         * @params {string} size -
         */
        this.featuredImageUrl = function (size) {
            if (_this.featuredMedia() && _this.post._embedded) {
                var featuredImage = _this.post._embedded['wp:featuredmedia'][0];
                if (featuredImage) {
                    if (featuredImage.media_details.sizes[size]) {
                        return featuredImage.media_details.sizes[size].source_url;
                    }
                    else {
                        /** if the desired size was not found, return the full size */
                        return featuredImage.media_details.sizes["full"].source_url;
                    }
                }
            }
        };
    }
    return WpPost;
}());
//# sourceMappingURL=wp-post.class.js.map