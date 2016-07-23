import {User} from "../user/user.model";

export interface IPost {
  id:string;
  slug:string;
  name:string;
  tags:any;
  categories:any;
  date:string;
  modified:string;
  type:string;
  featured_media:number;
  comment_status:boolean;
  ping_status:boolean;
  sticky:boolean;
  format:string;
  title:any;
  content:any;
  excerpt:any;
  author:any;
  _embedded:any;
}

export class Post {

  constructor(public post) {
  }

  id():string{
    if(this.post.id) return this.post.id;
  }

  title():string {
    if(this.post.title) return this.post.title.rendered;
  }

  content():string {
    if(this.post.content) return this.post.content.rendered;
  }

  date():string{
    if(this.post.date) return this.post.date;
  }

  categories():any {
    if (this.post._embedded && this.post._embedded['wp:term'][0])
      return this.post._embedded['wp:term'][0];
  }

  tags():any {
    if (this.post._embedded && this.post._embedded['wp:term'][1])
      return this.post._embedded['wp:term'][1];
  }

  excerpt():string {
    if(this.post.excerpt) return this.post.excerpt.rendered;
  }

  author():User {
    if(this.post._embedded)  return <User>this.post._embedded.author;
  }

  /** featuredMedia(): check if has featured image, return false | number */
  featuredMedia():boolean | number {
    if(this.post.featured_media)  return +this.post.featured_media;
  }

  /**
   * get post featured image url
   * @params {string} size - 
   */
  featuredImageUrl(size:string):string {
    if (this.featuredMedia() && this.post._embedded) {

      var featuredImage = this.post._embedded['wp:featuredmedia'][0];
      if (featuredImage) {
        if (featuredImage.media_details.sizes[size]) {
          return featuredImage.media_details.sizes[size].source_url;
        }
        else {
          /** if the desired size was not found, return the full size */
          return featuredImage.media_details.sizes["full"].source_url;
        }
      }
    }
  }

}

interface thumbnail {
  file:string;
  height:string;
  width:string;
  mime_type:string;
  source_url:string;
}

