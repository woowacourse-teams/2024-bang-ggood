const CLIENT_ID = process.env.CLIENT_ID;
const REDIRECT_URI_ROOT = process.env.REDIRECT_URI_ROOT;
const REDIRECT_URI_WRITE = process.env.REDIRECT_URI_WRITE;

export const KAKAO_AUTH_URL_ROOT = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI_ROOT}&response_type=code&prompt=login`;
export const KAKAO_AUTH_URL_WRITE = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI_WRITE}&response_type=code&prompt=login`;
