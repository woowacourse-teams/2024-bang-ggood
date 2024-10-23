const CLIENT_ID = process.env.CLIENT_ID;

export const KAKAO_AUTH_URL = (redirectUri: string) =>
  `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${redirectUri}&response_type=code&prompt=login`;
