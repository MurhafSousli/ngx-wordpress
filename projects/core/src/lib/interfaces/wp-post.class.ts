import { Post } from './wp-post.interface';

export class WpPost extends Post {
  constructor(post: Post, filters: any) {
    super();
    // Loop over filters
    const filteredProps = {};
    Object.keys(filters).map((key: string) => filteredProps[key] = filters[key](post, key));
    // Set WpPost properties
    Object.assign(this, {...post, ...filteredProps});
  }
}
