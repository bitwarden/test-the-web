import { CookieOptions } from "express-serve-static-core";

export const ROUTES = {
  IDENTITY: "/identity",
  LOGIN: "/login",
  PAYMENT: "/payment",
  SEARCH: "/search",
};

export const QUERY_PARAMS = {
  HIDE_PAGINATION: "docusaurus-data-hide-pagination",
  HIDE_HEADER: "docusaurus-data-hide-header",
};

export const COOKIE_OPTIONS: CookieOptions = {
  sameSite: "strict",
  secure: true,
  maxAge: 1000 * 60 * 5,
};

export const STORED_VALUE_KEYS = {
  REFERRER_REQUEST_BODY: "referrerRequestBody",
  REQUEST_RESPONSE_BODY: "requestResponseBody",
} as const;
