import { WpUser } from './wp-user.interface';
import { WpTerm } from './wp-term.interface';

export class Post {
  id?: number;
  slug?: string;
  name?: string;
  title?: string | any;
  content?: string | any;
  excerpt?: string | any;
  featured_media?: number;
  tags?: WpTerm[] | number[];
  categories?: WpTerm[] | number[];
  author?: WpUser | number | number[];
  status?: WpStatus;
  format?: WpFormat;
  comment_status?: WpToggleStatus;
  ping_status?: WpToggleStatus;
  date?: string;
  date_gmt?: string;
  modified?: string;
  modified_gmt?: string;
  link?: string;
  type?: string;
  sticky?: boolean;
  guid?: any;
  _embedded?: any;
}

export enum WpFormat {
  standard = 'standard',
  aside = 'aside',
  image = 'image',
  video = 'video',
  quote = 'quote',
  link = 'link',
  gallery = 'gallery',
  audio = 'audio'
}

export enum WpStatus {
  publish = 'publish',
  pending = 'publish',
  draft = 'draft'
}

export enum WpToggleStatus {
  'open' = 'open',
  'closed' = 'closed'
}
