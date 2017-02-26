export interface IPost{
  id: string;
  slug: string;
  name: string;
  tags: any;
  categories: any;
  date: string;
  date_gmt: string;
  modified: string;
  modified_gmt: string;
  link: string;
  type: string;
  featured_media: number;
  comment_status: boolean;
  ping_status: boolean;
  sticky: boolean;
  format: string;
  title: any;
  content: any;
  excerpt: any;
  author: any;
  _embedded: any;
}
