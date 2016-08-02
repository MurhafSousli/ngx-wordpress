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
  }) {
    this.author = options.author || null;
    this.context = options.context || null;
    this.filter = options.filter || null;
    this.order = options.order || null;
    this.orderby = options.orderby || null;
    this.page = options.page || null;
    this.per_page = options.per_page || null;
    this.search = options.search || null;
    this.status = options.status || null;
    this._embed = options._embed || null;
  }
}
