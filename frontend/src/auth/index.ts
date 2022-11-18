import { setCookie, destroyCookie, parseCookies } from 'nookies';

export const TOKEN_KEY = '@scali-mini-app-financeiro';

export const isAuthenticated = () => {
  const cookies = parseCookies();

  return !!cookies[TOKEN_KEY];
}

export const getToken = () => {
  const cookies = parseCookies();
  return cookies[TOKEN_KEY];
}

export const login = (token: string) => {
  setCookie(null, TOKEN_KEY, token, {
    maxAge: 24 * 60 * 60
  });
}

export const logout = () => {
  destroyCookie(null, TOKEN_KEY);
}