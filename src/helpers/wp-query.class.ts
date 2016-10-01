export class WpQueryArgs {

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
    this.author = options.author || undefined;
    this.context = options.context || undefined;
    this.filter = options.filter || undefined;
    this.order = options.order || undefined;
    this.orderby = options.orderby || undefined;
    this.page = options.page || undefined;
    this.per_page = options.per_page || undefined;
    this.search = options.search || undefined;
    this.status = options.status || undefined;
    this._embed = options._embed || undefined;
  }
}
