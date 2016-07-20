import {User} from "./user.model";

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
  title;
  content;
  excerpt;
  author;
  _embedded;
}

export class Post {

  constructor(public post) {
  }
  id(){
    return this.post.id;
  }
  title() {
    return this.post.title.rendered;
  }

  content() {
    return this.post.content.rendered;
  }
  date(){
    return this.post.date;
  }
  categories() {
    if (this.post._embedded && this.post._embedded['wp:term'][0])
      return this.post._embedded['wp:term'][0];
  }

  tags() {
    if (this.post._embedded && this.post._embedded['wp:term'][1])
      return this.post._embedded['wp:term'][1];
  }

  excerpt():string {
    return this.post.excerpt.rendered;
  }

  author():User {
    return <User>this.post._embedded.author;
  }

  featuredMedia() {
    return +this.post.featured_media;
  }

  featuredImageUrl(size) {
    if (this.featuredMedia() && this.post._embedded) {

      var featuredImage = this.post._embedded['wp:featuredmedia'][0];
      if (featuredImage) {
        if (featuredImage.media_details.sizes[size]) {
          return featuredImage.media_details.sizes[size].source_url;
        }
        else {
          return featuredImage.media_details.sizes[thumbnailSize.Full].source_url;
        }
      }
    }
  }

}

export enum thumbnailSize{
  Large = <any>"large",
  Medium = <any>"medium",
  Small = <any> "small",
  Full = <any>'full'
}

interface thumbnail {
  file:string;
  height:string;
  width:string;
  mime_type:string;
  source_url:string;
}

