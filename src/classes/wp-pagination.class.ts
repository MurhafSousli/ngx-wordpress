/**
 * Pagination class holds the current collection response pagination and links
 */
export class WpPagination {
  /** Pagination holds the navigation data and links provided from WP API response header*/
  constructor(public currentPage = 1,
    public totalPages = 0,
    public totalObjects = 0,
    public links?: any) {

  }

  get hasMore(): boolean {
    return this.currentPage < this.totalPages;
  }

  get hasPrev(): boolean {
    return this.currentPage > 1;
  }
}
