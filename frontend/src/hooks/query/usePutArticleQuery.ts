import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { putArticle } from '@/apis/article';
import { ROUTE_PATH } from '@/constants/routePath';
import useToast from '@/hooks/useToast';
import { ArticlePostForm } from '@/types/article';

const usePutArticleQuery = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();

  return useMutation<Response, Error, { article: ArticlePostForm; articleId: number }>({
    mutationFn: putArticle,
    onSuccess: () => {
      showToast({ message: '아티클 수정 완료!' });
      navigate(ROUTE_PATH.admin);
    },
  });
};

export default usePutArticleQuery;
