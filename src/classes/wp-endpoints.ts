/** default endpoints */
export module WpEndpoint {
  export const discover: string = '/wp-json/';
  export const posts: string = '/wp-json/wp/v2/posts/';
  export const revisions: string = '/wp-json/wp/v2/revisions';
  export const users: string = '/wp-json/wp/v2/users/';
  export const categories: string = '/wp-json/wp/v2/categories/';
  export const tags: string = '/wp-json/wp/v2/tags';
  export const pages: string = '/wp-json/wp/v2/pages/';
  export const comments: string = '/wp-json/wp/v2/comments/';
  export const media: string = '/wp-json/wp/v2/media/';
  export const statuses: string = '/wp-json/wp/v2/statuses/';
  export const taxonomies: string = '/wp-json/wp/v2/taxonomies/';
  export const types: string = '/wp-json/wp/v2/types/';
  export const authentication: string = '/wp-json/wp/v2/users/me?_envelope';
}
