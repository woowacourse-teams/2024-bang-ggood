export const API_URL =
  process.env.DEV_MODE === 'api'
    ? process.env.API_URL_DEV
    : process.env.DEV_MODE === 'on'
      ? process.env.API_URL_LOCAL
      : process.env.API_URL;
