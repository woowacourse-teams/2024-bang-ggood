import { useCallback, useEffect, useRef, useState } from 'react';

import Button from '@/components/_common/Button/Button';
import Modal from '@/components/_common/Modal/Modal';
import loadPostcode from '@/components/NewChecklist/AddressModal/loadPostcode';
import { Address, Postcode, PostcodeOptions } from '@/types/address';

declare global {
  interface Window {
    daum?: {
      Postcode: new (options: PostcodeOptions) => Postcode;
    };
  }
}

const scriptUrl = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';

const DaumAddressModal = () => {
  const postcodeContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    loadPostcode(scriptUrl).catch(error => {
      console.error('Failed to load Daum postcode script:', error);
    });
  }, []);

  const openPostcodeEmbed = useCallback(() => {
    setIsOpen(true);
    if (window.daum?.Postcode && postcodeContainerRef.current) {
      new window.daum.Postcode({
        width: '100%',
        height: '600px',
        oncomplete: (data: Address) => {
          // TODO: 위도, 경도까지 보내주기
          console.log(data); // 검색 결과 데이터 출력
        },
      }).embed(postcodeContainerRef.current, { q: '' });
    } else {
      console.error('Daum Postcode is not loaded yet');
    }
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button size="small" color="dark" label="주소찾기" isSquare={true} onClick={openPostcodeEmbed} />
      <Modal position="bottom" isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Modal.body>
          <div ref={postcodeContainerRef} style={{ width: '100%' }} />
        </Modal.body>
      </Modal>
    </>
  );
};

export default DaumAddressModal;
