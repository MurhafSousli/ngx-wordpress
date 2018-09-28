export interface WpCollectionState<T = any> {
  data?: T;
  loading?: boolean;
  error?: any;
  pagination?: WpPagination;
}

/**
 * Pagination class holds the current collection response pagination and links
 */
export class WpPagination {
  currentPage?: number;
  totalPages?: number;
  totalObjects?: number;
  hasPrev?: boolean;
  hasMore?: boolean;
}

export class WpQuery {
  search?: string;
  page?: number;
  per_page?: number;
  _embed?: boolean;
  filter?: any;
  post_status?: string;
  perm?: any;
  orderby?: string;
  meta_key?: string;
  meta_value?: string;
  meta_query?: any;
  meta_value_num?: number;
  meta_compare?: string;
  post_type?: string;
  order?: string;
  author?: string | number | string[] | number[];
  categories?: any;
  tags?: any;
  // use 'user_nicename' - NOT name.
  author_name?: string;
  author__in?: number[];
  author__not_in?: number[];
}
