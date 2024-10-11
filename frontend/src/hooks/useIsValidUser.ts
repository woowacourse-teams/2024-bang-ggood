import { useEffect, useState } from 'react';

import { getIsUserValid } from '@/apis/user';

const useIsValidUser = () => {
  const [isValidUser, setIsValidUser] = useState(false);

  useEffect(() => {
    const fetchIsUserValid = async () => {
      const data = await getIsUserValid();
      return data;
    };

    fetchIsUserValid()
      .then(result => {
        console.log('result', result);
      })
      .catch(err => {});
  }, []);

  return { isValidUser };
};

export default useIsValidUser;
