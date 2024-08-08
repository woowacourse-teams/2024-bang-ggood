import { useState } from 'react';

const useModalOpen = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const modalOpen = () => {
    setIsModalOpen(true);
  };

  const modalClose = () => {
    setIsModalOpen(false);
  };

  return { isModalOpen, modalOpen, modalClose };
};

export default useModalOpen;
