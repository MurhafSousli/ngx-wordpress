export interface WpUser {
  id?: string | number;
  username?: string;
  name?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  url?: string;
  description?: string;
  link?: string;
  nickname?: string;
  locale?: string;
  slug?: string;
  roles?: string[];
  registered_date?: string;
  capabilities?: any;
  extra_capabilities?: any;
  avatar_urls?: {
    24?: string,
    48?: string,
    96?: string
  };
  meta?: any[];
  _links?: any;
}
