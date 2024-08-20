const CLIENT_ID = process.env.CLIENT_ID;
const REDIRECT_URI = process.env.DEV_MODE !== 'on' ? process.env.REDIRECT_URI : process.env.REDIRECT_URI_LOCAL;

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&prompt=login`;
