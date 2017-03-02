import {ConfigService} from '../config/config.service';
import {WpPost} from '../../classes/wp-post.class';
import {Helper} from '../../classes/helper.functions';

export class PhotonService {

    constructor(private config: ConfigService) {

    }

    getImage(post: WpPost, queryName?: string) {
        if (this.config.domain && post.featuredMedia() && post.get('_embedded')) {

            if (this.config.photonQueries[queryName]) {

                console.log(this.config.photonQueries[queryName]);
                let featuredImage = post.get('_embedded')['wp:featuredmedia'][0];

                return 'https://i0.wp.com/' + this.config.domain + '/wp-content/uploads/' +
                    `${featuredImage.media_details.file}?${this.config.photonQueries[queryName]}`;

            } else {
                console.error(`[Photon]: queryName is not registered, make sure you set your query first`);
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
            console.log(query);
            let featuredImage = post.get('_embedded')['wp:featuredmedia'][0];
            return `https://i0.wp.com/${domain}/wp-content/uploads/${featuredImage.media_details.file}?${query}`;
        } else {
            console.error('[Photon]: invalid request');
        }
    }
}
