import { PostcodeConstructor } from '@/types/address';

const loadPostcode = (scriptUrl: string) => {
  return new Promise<PostcodeConstructor>((resolve, reject) => {
    if (window.daum?.Postcode) {
      resolve(window.daum.Postcode);
      return;
    }

    const script = document.createElement('script');
    script.src = scriptUrl;
    script.async = true;

    script.onload = () => {
      if (window.daum?.Postcode) {
        resolve(window.daum.Postcode);
      } else {
        reject(new Error('Failed to load Daum postcode script'));
      }
    };

    script.onerror = () => reject(new Error('Failed to load Daum postcode script'));
    document.body.appendChild(script);
  });
};

export default loadPostcode;
