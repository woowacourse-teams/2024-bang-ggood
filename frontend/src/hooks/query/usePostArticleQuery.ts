import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { postArticle } from '@/apis/article';
import { ROUTE_PATH } from '@/constants/routePath';
import useToast from '@/hooks/useToast';

const usePostArticleQuery = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: postArticle,
    onSuccess: () => {
      showToast({ message: '아티클 등록 완료!' });
      navigate(ROUTE_PATH.admin);
    },
  });
};

export default usePostArticleQuery;
