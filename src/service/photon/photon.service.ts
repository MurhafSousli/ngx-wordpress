import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';
import { WpPost } from '../../classes/wp-post.class';
import { Helper } from '../../classes/helper.functions';

@Injectable()
export class PhotonService {

    constructor(private config: ConfigService) {
    }

    getImage(post: WpPost, photonKey: string) {
        if (!post) {
            console.warn('[Photon]: post is undefined');
            return;
        }
        if (!photonKey) {
            console.warn('[Photon]: queryName is not registered!');
            return;
        }
        if (!this.config.photonArgs[photonKey]) {
            console.warn(`[Photon]: "${photonKey}" is not registered, make sure the key is defined in the module`);
            return;
        }
        if (!post.featuredMedia() || !post.get('_embedded')) {
            console.warn(`[Photon]: the post "${post.title().substring(0, 9)}..." does not have featured image`);
            return;
        }

        const photonArgs = this.config.photonArgs[photonKey];
        const featuredImage = post.get('_embedded')['wp:featuredmedia'][0];
        return `https://i0.wp.com/${this.config.domain}/wp-content/uploads/${featuredImage.media_details.file}?${photonArgs}`;
    }

    /**
     * get image using photon
     * @params {WpPost, string, any}
     */
    getByArgs(post: WpPost, photonArgs) {
        if (!post) {
            console.warn('[Photon]: post is undefined');
            return;
        }
        if (!photonArgs) {
            console.warn(`[Photon]: photonArgs is undefined`);
            return;
        }
        if (!post.featuredMedia() || !post.get('_embedded')) {
            console.warn(`[Photon]: the post "${post.title().substring(0, 9)}..." does not have featured image`);
            return;
        }

        let query = Helper.serialize(photonArgs);
        let featuredImage = post.get('_embedded')['wp:featuredmedia'][0];
        return `https://i0.wp.com/${this.config.domain}/wp-content/uploads/${featuredImage.media_details.file}?${query}`;
    }

}
