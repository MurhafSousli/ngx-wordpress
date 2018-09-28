export interface WpUser {
  id?: string;
  name?: string;
  url?: string;
  description?: string;
  slug?: string;
  avatar_urls?: {
    24?: string,
    48?: string,
    96?: string
  };
  _links?: any;
}
