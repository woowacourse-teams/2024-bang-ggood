import { useState } from 'react';

import { ArticlePostForm } from '@/types/article';

const useArticleForm = () => {
  const [form, setForm] = useState<ArticlePostForm>({
    title: '',
    keyword: '',
    summary: '',
    thumbnail: '',
    content: '# 여기에 아티클을 작성해주세요',
  });

  const setField = (field: keyof ArticlePostForm, value: string) => {
    setForm(prevForm => ({
      ...prevForm,
      [field]: value,
    }));
  };

  return {
    form,
    setField,
  };
};

export default useArticleForm;
