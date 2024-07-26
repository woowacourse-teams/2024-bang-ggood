import '@testing-library/jest-dom';

import { ThemeProvider } from '@emotion/react';
import { render, screen } from '@testing-library/react';

import ChecklistQuestion from '@/components/NewChecklist/ChecklistQuestion/ChecklistQuestion';
import theme from '@/styles/theme';

const mockQuestion = {
  questionId: 1,
  title: '이 서비스는 어떠셨나요?',
  subtitle: '서비스에 대한 간단한 피드백을 주세요',
};

const mockAddAnswer = jest.fn();
const mockDeleteAnswer = jest.fn();
const mockQuestionSelectedAnswer = jest.fn();

const renderWithTheme = (children: React.ReactNode) => {
  return render(<ThemeProvider theme={theme}>{children}</ThemeProvider>);
};

describe('ChecklistQuestion 테스트', () => {
  beforeEach(() => {
    renderWithTheme(
      <ChecklistQuestion
        questionSelectedAnswer={mockQuestionSelectedAnswer}
        question={mockQuestion}
        addAnswer={mockAddAnswer}
        deleteAnswer={mockDeleteAnswer}
      />,
    );
  });
  test('모든 선택 옵션(좋아요, 평범해요, 좋아요)이 렌더링 된다.', () => {
    expect(screen.getByText('별로에요')).toBeInTheDocument();
    expect(screen.getByText('평범해요')).toBeInTheDocument();
    expect(screen.getByText('좋아요')).toBeInTheDocument();
  });
});
