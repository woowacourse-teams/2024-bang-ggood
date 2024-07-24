import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { getCategory, postCategory } from '@/apis/category';
import { CloseIcon, LampIcon } from '@/assets/assets';
import Badge from '@/components/common/Badge/Badge';
import Button from '@/components/common/Button/Button';
import Header from '@/components/common/Header/Header';
import Layout from '@/components/common/layout/Layout';
import { flexColumn, flexRow, title2 } from '@/styles/common';
import { Category } from '@/types/category';

const MAX_SELECT_CATEGORY_COUNT = 3;

const CategoryChoosePage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategory = async () => {
      const categories = await getCategory();
      setCategories(categories);
    };
    fetchCategory();
  }, []);

  const handleClick = (id: number) => {
    setSelectedCategory(prev => {
      if (prev.includes(id)) {
        return prev.filter(category => category !== id);
      } else if (prev.length < MAX_SELECT_CATEGORY_COUNT) {
        return [...prev, id];
      }
      return prev;
    });
  };

  const handleSubmit = () => {
    const addCategory = async () => {
      await postCategory(selectedCategory);
      navigate('/');
    };
    addCategory();
  };

  return (
    <>
      <Header
        left={
          <Link to="/">
            <CloseIcon />
          </Link>
        }
      />
      <Layout>
        <S.Wrapper>
          <S.Content>
            <S.TitleSection>
              <S.Title>
                방을 선택할 때 <br />
                {`중요한 요소를 최대 ${MAX_SELECT_CATEGORY_COUNT}개 선택해주세요!`}
              </S.Title>
              <S.SubTitle>선택하신 기준을 통해 최적의 방을 추천해드려요.</S.SubTitle>
            </S.TitleSection>
            <S.ButtonWrapper>
              {categories.map(category => (
                <Badge
                  key={category.categoryId}
                  label={category.categoryName}
                  type="button"
                  onClick={() => handleClick(category.categoryId)}
                  isSelected={selectedCategory.includes(category.categoryId)}
                />
              ))}
            </S.ButtonWrapper>
          </S.Content>
          <S.IconWrapper>
            <LampIcon />
          </S.IconWrapper>
          {selectedCategory.length === 0 ? (
            <Button type="full" label="넘어가기" color="light" onClick={() => navigate('/')} />
          ) : (
            <Button type="full" label="완료" color="dark" onClick={handleSubmit} />
          )}
        </S.Wrapper>
      </Layout>
    </>
  );
};

export default CategoryChoosePage;

const S = {
  Wrapper: styled.div`
    ${flexColumn}
    justify-content: space-around;
    height: 80vh;
    padding: 4px;
  `,
  Content: styled.div`
    ${flexColumn}
    gap: 40px;
  `,
  TitleSection: styled.div`
    margin-top: 30px;

    ${flexColumn}
    letter-spacing: 0.05rem;
  `,
  Title: styled.h1`
    ${title2}
    line-height: 1.4rem;
  `,
  SubTitle: styled.span`
    margin-top: 10px;

    font-size: ${({ theme }) => theme.text.size.medium};
  `,
  ButtonWrapper: styled.div`
    display: flex;

    width: 90%;
    height: auto;
    flex-wrap: wrap;
    gap: 15px 10px;
  `,
  IconWrapper: styled.div`
    ${flexRow}
    padding: 16px;
    justify-content: flex-end;
  `,
};
