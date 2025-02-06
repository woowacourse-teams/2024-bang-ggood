import useInputs from '@/hooks/useInputs';
import { ArticlePostForm } from '@/types/article';

const useArticleForm = () => {
  const {
    values: form,
    onChange,
    setValues,
  } = useInputs<ArticlePostForm>({
    title: '',
    keyword: '',
    summary: '',
    thumbnail: '',
    content: '# 여기에 아티클을 작성해주세요',
  });

  const setForm = (field: keyof ArticlePostForm, value: string | number) => {
    setValues(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  return {
    form,
    onChange,
    setForm,
  };
};

export default useArticleForm;
