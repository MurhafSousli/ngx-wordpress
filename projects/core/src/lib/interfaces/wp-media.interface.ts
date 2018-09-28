export interface WpMedia {
  id: number;
  date: Date;
  slug: string;
  type: string;
  link: string;
  title: string;
  author: number;
  caption: any;
  alt_text: string;
  media_type: string;
  mime_type: string;
  media_details: WpMediaDetails;
  source_url: string;
  _links: any;
}

export interface WpMediaDetails {
  width: number;
  height: number;
  file: string;
  sizes: WpMediaSizes;
  image_meta: WpImageMeta;
}

export interface WpMediaSize {
  file: string;
  width: number;
  height: number;
  mime_type: string;
  source_url: string;
}

export interface WpMediaSizes {
  [key: string]: WpMediaSize;
  thumbnail?: WpMediaSize;
  medium?: WpMediaSize;
  full?: WpMediaSize;
}

export interface WpImageMeta {
  aperture: string;
  credit: string;
  camera: string;
  caption: string;
  created_timestamp: string;
  copyright: string;
  focal_length: string;
  iso: string;
  shutter_speed: string;
  title: string;
  orientation: string;
  keywords: any[];
}

