import { Inject, Injectable, Optional } from '@angular/core';
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { MOCK_CONFIG, WpMockConfig } from './mock.token';

import { WordPress, WpUser } from '@ngx-wordpress/core';
// Import mock data
import { usersAuthData, usersData } from './users.data';
import { postsData } from './posts.data';
import { tokenData, unAuthorizedData, validateTokenData } from './auth.data';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

  config: WpMockConfig = {
    delay: 1000,
    postsData: postsData,
    usersData: usersData,
    usersAuthData: usersAuthData
  };

  constructor(@Optional() @Inject(MOCK_CONFIG) config: WpMockConfig, private wp: WordPress) {
    this.config = {...this.config, ...config};
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // array in local storage for registered users
    const users: WpUser[] = usersData;

    // wrap in delayed observable to simulate server api call
    return (of(null).pipe(
        mergeMap(() => {
          // authenticate
          if (request.url.endsWith(this.wp.config.authUrl) && request.method === 'POST') {
            // find if any user matches login credentials
            const filteredUsers = this.config.usersAuthData.filter(user => {
              return (
                user.username === request.body.username &&
                user.password === request.body.password
              );
            });

            if (filteredUsers.length) {
              return of(new HttpResponse({status: 200, body: tokenData}));
            } else {
              // else return 400 bad request
              return throwError({
                error: {message: 'Username or password is incorrect'}
              });
            }
          }

          if (request.url.endsWith(this.wp.config.validateAuthUrl) && request.method === 'POST') {
            return of(new HttpResponse({status: 200, body: validateTokenData}));
          }

          if (request.url.endsWith(this.wp.config.restUrl + 'users/me') && request.method === 'GET') {
            const body = this.config.usersData.filter((user: WpUser) => user.slug === request.body.username);
            return of(new HttpResponse({status: 200, body: body}));
          }

          // get users
          if (request.url.endsWith(this.wp.config.restUrl + '/users') && request.method === 'GET') {
            // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
            if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
              return of(new HttpResponse({status: 200, body: users}));
            } else {
              // return 401 not authorised if token is null or invalid
              return throwError({error: unAuthorizedData});
            }
          }

          // get user by id
          if (request.url.match(/\/users\/\d+$/) && request.method === 'GET') {
            // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
            if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
              // find user by id in users array
              const urlParts = request.url.split('/');
              const id = parseInt(urlParts[urlParts.length - 1]);
              const matchedUsers = usersData.filter((user: WpUser) => user.id === id);
              const body = matchedUsers.length ? matchedUsers[0] : null;

              return of(new HttpResponse({status: 200, body: body}));
            } else {
              // return 401 not authorised if token is null or invalid
              return throwError({error: unAuthorizedData});
            }
          }
          // pass through any requests not handled above
          return next.handle(request);
        })
      )
      // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
        .pipe(materialize())
        .pipe(delay(this.config.delay))
        .pipe(dematerialize())
    );
  }
}

export const fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};


/**

 // register user
 if (request.url.endsWith('/users/register') && request.method === 'POST') {
  // get new user object from post body
  let newUser = request.body;

  // validation
  let duplicateUser = users.filter(user => {
    return user.username === newUser.username;
  }).length;
  if (duplicateUser) {
    return throwError({
      error: {
        message:
          'Username "' + newUser.username + '" is already taken'
      }
    });
  }

  // save new user
  newUser.id = users.length + 1;
  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));

  // respond 200 OK
  return of(new HttpResponse({status: 200}));
}

 // delete user
 if (request.url.match(/\/users\/\d+$/) && request.method === 'DELETE') {
  // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
  if (
    request.headers.get('Authorization') === 'Bearer fake-jwt-token'
  ) {
    // find user by id in users array
    let urlParts = request.url.split('/');
    let id = parseInt(urlParts[urlParts.length - 1]);
    for (let i = 0; i < users.length; i++) {
      let user = users[i];
      if (user.id === id) {
        // delete user
        users.splice(i, 1);
        localStorage.setItem('users', JSON.stringify(users));
        break;
      }
    }

    // respond 200 OK
    return of(new HttpResponse({status: 200}));
  } else {
    // return 401 not authorised if token is null or invalid
    return throwError({error: {message: 'Unauthorised'}});
  }
}
 */
