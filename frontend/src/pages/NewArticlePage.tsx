import styled from '@emotion/styled';
import MarkdownEditor from '@uiw/react-markdown-editor';

import Button from '@/components/_common/Button/Button';
import FormField from '@/components/_common/FormField/FormField';
import DesktopLayout from '@/components/_common/layout/DesktopLayout';
import usePostArticleQuery from '@/hooks/query/usePostArticleQuery';
import useArticleForm from '@/hooks/useArticleForm';
import { flexColumn, flexRow, flexSpaceBetween, title2 } from '@/styles/common';

const NewArticlePage = () => {
  const { form, onChange: onFormChange, setForm } = useArticleForm();
  const { mutate: addArticle } = usePostArticleQuery();

  const handleSubmit = () => {
    addArticle(form);
  };

  return (
    <>
      <S.Header>
        <S.HeaderContents>
          <S.Title>방끗 Article Editor - 추가하기</S.Title>
          <Button type="submit" label="저장" isSquare color="dark" onClick={handleSubmit} size="small" />
        </S.HeaderContents>
      </S.Header>
      <DesktopLayout>
        <S.Form
          onSubmit={e => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <FormField>
            <FormField.Label label="아티클 제목" htmlFor="title" required />
            <FormField.Input
              placeholder="제목을 입력하세요"
              onChange={onFormChange}
              name="title"
              id="title"
              value={form.title}
            />
          </FormField>

          <FormField>
            <FormField.Label label="키워드" htmlFor="keyword" required />
            <FormField.Input
              placeholder="키워드를 입력하세요"
              onChange={onFormChange}
              name="keyword"
              id="keyword"
              value={form.keyword}
            />
          </FormField>

          <FormField>
            <FormField.Label label="요약" htmlFor="summary" required />
            <FormField.Input
              placeholder="요약을 입력하세요"
              onChange={onFormChange}
              name="summary"
              id="summary"
              value={form.summary}
            />
          </FormField>

          <FormField>
            <FormField.Label label="썸네일" htmlFor="thumbnail" required />
            <FormField.Input
              placeholder="썸네일 사진 url를 입력하세요"
              onChange={onFormChange}
              name="thumbnail"
              id="thumbnail"
              value={form.thumbnail}
            />
          </FormField>

          <div style={{ marginBottom: '20px' }}>
            <MarkdownEditor
              value={form.content}
              height="70vh"
              onChange={value => setForm('content', value)}
              visible={true}
              enablePreview={true}
            />
          </div>
        </S.Form>
      </DesktopLayout>
    </>
  );
};

export default NewArticlePage;

const S = {
  Header: styled.header`
    ${flexRow}
    justify-content: center;
    width: 100vw;
    height: 50px;
    border-bottom: 1px solid ${({ theme }) => theme.palette.grey200};
    box-sizing: border-box;
    margin-bottom: 20px;
  `,
  HeaderContents: styled.div`
    width: 120rem;
    ${flexRow}
    ${flexSpaceBetween}
    align-items: center;
  `,
  Title: styled.h1`
    ${title2}
  `,
  Form: styled.form`
    ${flexColumn}
    gap: 20px;
  `,
};
