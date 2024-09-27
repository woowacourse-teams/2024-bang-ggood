type ScriptType = 'kakaoMap' | 'daumAddress';

/* eslint-disable @typescript-eslint/no-explicit-any */

const scripts = {
  kakaoMap: {
    url: `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.KAKAO_MAP_KEY}&autoload=false&libraries=services`,
    loaded: false,
  },
  daumAddress: {
    url: '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js',
    loaded: false,
  },
};

const loadExternalScriptWithCallback = (scriptType: ScriptType, callback: () => void) => {
  const scriptInfo = scripts[scriptType];

  if (!scriptInfo) {
    throw new Error('지원되지 않는 스크립트 타입입니다.');
  }

  if (scriptInfo.loaded) {
    callback();
    return;
  }

  const script = document.createElement('script');
  script.src = scriptInfo.url;
  script.async = true;
  script.onload = () => {
    scriptInfo.loaded = true;
    if (callback) callback();
  };
  script.onerror = error => {
    console.error(`스크립트 로드에 실패했습니다: ${scriptType}`, error);
  };

  document.head.appendChild(script);
};

export default loadExternalScriptWithCallback;
