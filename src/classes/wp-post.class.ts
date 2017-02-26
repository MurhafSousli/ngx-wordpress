import { WpUser } from './wp-user.interface';
import { WpMedia } from './wp-media.interface';
import { IPost } from './post.interface';

export class WpPost {

  constructor(private post: IPost) {
  }

  get(property: string) {
    if (this.post[property]) {
      return this.post[property];
    }
  }

  id(): string {
    if (this.post.id) {
      return this.post.id;
    }
  }

  slug(): string {
    if (this.post.slug) {
      return this.post.slug;
    }
  }

  title(): string {
    if (this.post.title) {
      return this.post.title.rendered;
    }
  }

  content(): string {
    if (this.post.content) {
      return this.post.content.rendered;
    }
  }

  excerpt(): string {
    /** filter excerpt from the links */
    if (this.post.excerpt) {
      return (<string>this.post.excerpt.rendered).replace(/<a\b[^>]*>(.*?)<\/a>/i, '');
    }
  }

  date(): string {
    if (this.post.date) {
      return this.post.date;
    }
  }

  link(): string {
    if (this.post.link) {
      return this.post.link;
    }
  }

  type(): string {
    if (this.post.type) {
      return this.post.type;
    }
  }

  categories(): any {
    if (this.post._embedded && this.post._embedded['wp:term']) {
      return this.post._embedded['wp:term'][0];
    }
  }

  format(): string {
    if (this.post.format) {
      return this.post.format;
    }
  }

  tags(): any {
    if (this.post._embedded && this.post._embedded['wp:term']) {
      return this.post._embedded['wp:term'][1];
    }
  }

  author(): WpUser {
    if (this.post._embedded) {
      return <WpUser>this.post._embedded.author;
    }
  }

  /** featuredMedia(): check if has featured image, return false | number */
  featuredMedia(): boolean | number {
    if (this.post.featured_media) {
      return +this.post.featured_media;
    }
  }

  /**
   * get post featured image url
   * @params {string} size -
   */
  featuredImageUrl(size: string): string {
    if (this.featuredMedia() && this.post._embedded) {

      let featuredImage: WpMedia = this.post._embedded['wp:featuredmedia'][0];
      if (featuredImage) {
        /** Get featuredImage of size (size) */
        if (featuredImage.media_details.sizes[size]) {
          return featuredImage.media_details.sizes[size].source_url;
        }
        /** If featuredImage size is invalid, return the original one */
        else {
          /** if the desired size was not found, return the full size */
          return featuredImage.media_details.sizes['full'].source_url;
        }
      }
    }
  }
}
