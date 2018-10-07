import { WpUser } from '@ngx-wordpress/core';

export const usersAuthData: {username: string, password: string}[] = [
  {
    username: 'admin',
    password: '0000'
  },
  {
    username: 'demoadmin',
    password: '1234'
  }
];

export const usersData: WpUser[] = [
  {
    id: 1,
    name: 'Murhaf Sousli',
    url: '',
    description: '',
    link: 'https://my-wordpress-site.com/author/admin/',
    slug: 'admin',
    avatar_urls: {
      '24': 'https://secure.gravatar.com/avatar/56cfeed2f08834a396d7862b8b8a2107?s=24&d=mm&r=g',
      '48': 'https://secure.gravatar.com/avatar/56cfeed2f08834a396d7862b8b8a2107?s=48&d=mm&r=g',
      '96': 'https://secure.gravatar.com/avatar/56cfeed2f08834a396d7862b8b8a2107?s=96&d=mm&r=g'
    },
    meta: [],
    _links: {
      self: [
        {
          href: 'https://my-wordpress-site.com/wp-json/wp/v2/users/1'
        }
      ],
      collection: [
        {
          href: 'https://my-wordpress-site.com/wp-json/wp/v2/users'
        }
      ]
    }
  },
  {
    id: 2,
    name: 'Pavel Ciorici',
    url: '',
    description: '',
    link: 'https://my-wordpress-site.com/author/demoadmin/',
    slug: 'demoadmin',
    avatar_urls: {
      '24': 'https://secure.gravatar.com/avatar/a2c20358cff8a7162927df1441e0826e?s=24&d=mm&r=g',
      '48': 'https://secure.gravatar.com/avatar/a2c20358cff8a7162927df1441e0826e?s=48&d=mm&r=g',
      '96': 'https://secure.gravatar.com/avatar/a2c20358cff8a7162927df1441e0826e?s=96&d=mm&r=g'
    },
    meta: [],
    _links: {
      self: [
        {
          href: 'https://my-wordpress-site.com/wp-json/wp/v2/users/2'
        }
      ],
      collection: [
        {
          href: 'https://my-wordpress-site.com/wp-json/wp/v2/users'
        }
      ]
    }
  }
];
