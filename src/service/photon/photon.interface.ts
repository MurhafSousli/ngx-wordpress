import {WpPost} from '../../classes/wp-post.class';

export interface PhotonInterface {
  getImage(post: WpPost, photonKey: string): string;
  getByArgs(post: WpPost, photonArgs): string;
}


