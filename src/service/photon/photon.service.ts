import { ConfigService } from '../config/config.service';
import { WpPost } from '../../classes/wp-post.class';
import { Helper } from '../../classes/helper.functions';

export class PhotonService {

    constructor(private config: ConfigService) {

    }

    getImage(post: WpPost, queryName?: string) {
        if (this.config.domain && post.featuredMedia() && post.get('_embedded')) {

            if (this.config.photonQueries[queryName]) {

                let featuredImage = post.get('_embedded')['wp:featuredmedia'][0];
                return 'https://i0.wp.com/' + this.config.domain + '/wp-content/uploads/' +
                    `${featuredImage.media_details.file}?${this.config.photonQueries[queryName]}`;

            } else if (this.config.domain) {
                console.error(`[Photon]: queryName is not registered, make sure you set your query first`);
            }
            else if (post.featuredMedia()) {
                console.warn(`[Photon] "${post.title().substring(0, 9)}..." does not have featured image`);
            }
            else {
                console.warn(`[Photon] Your WP post object doesn't have _embedded properties `);
            }
        }
    }

    /**
     * get image using photon
     * @params {WpPost, string, any}
     */
    getByQuery(post: WpPost, domain, queryArgs) {
        if (domain && queryArgs && post.featuredMedia() && post.get('_embedded')) {

            let query = Helper.serialize(queryArgs);
            let featuredImage = post.get('_embedded')['wp:featuredmedia'][0];
            return `https://i0.wp.com/${domain}/wp-content/uploads/${featuredImage.media_details.file}?${query}`;
        } else if (this.config.domain) {
            console.error(`[Photon]: queryName is not registered, make sure you set your query first`);
        }
        else if (post.featuredMedia()) {
            console.warn(`[Photon] "${post.title().substring(0, 9)}..." does not have featured image`);
        }
        else {
            console.warn(`[Photon] Your WP post object doesn't have _embedded properties `);
        }
    }
}
