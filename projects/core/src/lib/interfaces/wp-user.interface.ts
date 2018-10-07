export interface WpUser {
  id?: string | number;
  name?: string;
  url?: string;
  link?: string;
  description?: string;
  slug?: string;
  avatar_urls?: {
    24?: string,
    48?: string,
    96?: string
  };
  meta?: any[];
  _links?: any;
}
