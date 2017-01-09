import { WpUser } from "./wp-user.interface";
export declare class WpPost {
    post: any;
    constructor(post: any);
    id: () => string;
    title: () => string;
    content: () => string;
    excerpt: () => string;
    date: () => string;
    type: () => string;
    categories: () => any;
    tags: () => any;
    author: () => WpUser;
    /** featuredMedia(): check if has featured image, return false | number */
    featuredMedia: () => number | boolean;
    /**
     * get post featured image url
     * @params {string} size -
     */
    featuredImageUrl: (size: string) => string;
}
