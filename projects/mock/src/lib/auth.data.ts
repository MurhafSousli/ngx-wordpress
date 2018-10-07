export const tokenData = {
  token: 'fake-jwt-token',
  user_email: 'admin@my-wordpress-site.com',
  user_nicename: 'admin',
  user_display_name: 'Murhaf Sousli'
};

export const validateTokenData = {
  code: 'jwt_auth_valid_token',
  data: {
    status: 200
  }
};

export const unAuthorizedData = {
  code: 'rest_not_logged_in',
  message: 'You are not currently logged in.',
  data: {
    status: 401
  }
};
