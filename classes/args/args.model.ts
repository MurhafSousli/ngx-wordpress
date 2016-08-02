export class QueryArgs {

  author:string;
  context:any;
  filter:any;
  order:string;
  orderby:string;
  page:number;
  per_page:number;
  search:string;
  status:any;
  _embed:boolean;

  constructor(options:{
    author?:string;
    context?:any;
    filter?:any;
    order?:string;
    orderby?:string;
    page?:number;
    per_page?:number;
    search?:string;
    status?:any;
    _embed?:boolean;
  } = {}) {

    this.author = options.author;
    this.context = options.context;
    this.filter = options.filter;
    this.order = options.order;
    this.orderby = options.orderby;
    this.page = options.page;
    this.per_page = options.per_page;
    this.search = options.search;
    this.status = options.status;
    this._embed = options._embed;
  }
}
