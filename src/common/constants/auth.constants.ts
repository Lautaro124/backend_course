import { CookieOptions } from 'express';

export const MAX_AGE = 24 * 60 * 60 * 1000; // 24 horas
export const HTTP_ONLY = true;
export const SECURE = process.env.NODE_ENV === 'production';
export const SAME_SITE = 'none';
export const COOKIE_NAME = process.env.COOKIE_NAME || 'token';

export const COOKIE_OPTIONS: CookieOptions = {
  maxAge: MAX_AGE,
  httpOnly: HTTP_ONLY,
  secure: SECURE,
  sameSite: SAME_SITE,
};
