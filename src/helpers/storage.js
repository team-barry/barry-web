const TOKEN_TYPE = 'token_type';
const ACCESS_TOKEN = 'access_token';

export function setAuth(user) {
  localStorage.setItem(TOKEN_TYPE, user.token_type);
  localStorage.setItem(ACCESS_TOKEN, user.access_token);
};

export function removeAuth() {
  localStorage.removeItem(TOKEN_TYPE);
  localStorage.removeItem(ACCESS_TOKEN);
}

export function getAuth() {
  const token_type = localStorage.getItem(TOKEN_TYPE)
  const access_token = localStorage.getItem(ACCESS_TOKEN)
  return {
    token_type,
    access_token
  };
}
