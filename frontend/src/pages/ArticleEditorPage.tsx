import styled from '@emotion/styled';
import MarkdownEditor from '@uiw/react-markdown-editor';
import { useState } from 'react';

import Button from '@/components/_common/Button/Button';
import FormField from '@/components/_common/FormField/FormField'; // 예시로 주신 FormField 컴포넌트 사용
import DesktopLayout from '@/components/_common/layout/DesktopLayout';
import usePostArticleQuery from '@/hooks/query/usePostArticleQuery';
import { flexColumn, flexRow, flexSpaceBetween, title2 } from '@/styles/common';

const ArticleEditorPage = () => {
  const [title, setTitle] = useState('');
  const [keyword, setKeyword] = useState('');
  const [summary, setSummary] = useState('');
  const [thumbnail] = useState('');
  const [content, setContent] = useState('# 여기에 아티클을 작성해주세요');

  const { mutate: addArticle } = usePostArticleQuery();

  const handleSubmit = () => {
    addArticle({
      title,
      content,
      keyword,
      thumbnail,
      summary,
    });
  };

  return (
    <>
      <S.Header>
        <S.HeaderContents>
          <S.Title>방끗 Article Editor</S.Title>

          {/* 저장 버튼 */}
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
          {/* 제목 폼 필드 */}
          <FormField>
            <FormField.Label label="아티클 제목" htmlFor="title" required />
            <FormField.Input
              placeholder="제목을 입력하세요"
              onChange={e => setTitle(e.target.value)}
              name="title"
              id="title"
              value={title}
            />
          </FormField>

          {/* 키워드 폼 필드 */}
          <FormField>
            <FormField.Label label="키워드" htmlFor="keyword" required />
            <FormField.Input
              placeholder="키워드를 입력하세요"
              onChange={e => setKeyword(e.target.value)}
              name="keyword"
              id="keyword"
              value={keyword}
            />
          </FormField>

          {/* 요약 폼 필드 */}
          <FormField>
            <FormField.Label label="요약" htmlFor="summary" required />
            <FormField.Input
              placeholder="요약을 입력하세요"
              onChange={e => setSummary(e.target.value)}
              name="summary"
              id="summary"
              value={summary}
            />
          </FormField>

          {/* MarkdownEditor로 content 작성 */}
          <div style={{ marginBottom: '20px' }}>
            <MarkdownEditor
              value={content}
              height="70vh"
              onChange={value => setContent(value)}
              visible={true}
              enablePreview={true}
            />
          </div>
        </S.Form>
      </DesktopLayout>
    </>
  );
};

export default ArticleEditorPage;

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
