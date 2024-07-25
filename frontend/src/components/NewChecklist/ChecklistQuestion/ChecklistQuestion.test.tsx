import '@testing-library/jest-dom';

import { ThemeProvider } from '@emotion/react';
import { fireEvent, render, screen } from '@testing-library/react';

import ChecklistQuestion from '@/components/NewChecklist/ChecklistQuestion/ChecklistQuestion';
import theme from '@/styles/theme';

const mockQuestion = {
  questionId: 1,
  title: '이 서비스는 어떠셨나요?',
  subtitle: '서비스에 대한 간단한 피드백을 주세요',
};

const mockAddAnswer = jest.fn();
const mockDeleteAnswer = jest.fn();

const renderWithTheme = (children: React.ReactNode) => {
  return render(<ThemeProvider theme={theme}>{children}</ThemeProvider>);
};

describe('ChecklistQuestion 테스트', () => {
  beforeEach(() => {
    renderWithTheme(
      <ChecklistQuestion question={mockQuestion} addAnswer={mockAddAnswer} deleteAnswer={mockDeleteAnswer} />,
    );
  });
  test('모든 선택 옵션(좋아요, 평범해요, 좋아요)이 렌더링 된다.', () => {
    expect(screen.getByText('별로에요')).toBeInTheDocument();
    expect(screen.getByText('평범해요')).toBeInTheDocument();
    expect(screen.getByText('좋아요')).toBeInTheDocument();
  });

  test('감정 옵션을 클릭하면, 해당 옵션으로 정답이 입력되고 다시 한번 더 누르면 취소된다.', () => {
    const badOption = screen.getByText('별로에요');
    fireEvent.click(badOption);

    expect(mockAddAnswer).toHaveBeenCalledWith({ questionId: 1, newAnswer: 1 });
    expect(mockDeleteAnswer).not.toHaveBeenCalled();

    fireEvent.click(badOption);

    expect(mockDeleteAnswer).toHaveBeenCalledWith(1);
  });

  test('감정 옵션을 클릭하고 다른 감정옵션을 클릭하면 마지막에 누른 옵션으로 선택된다.', () => {
    const badOption = screen.getByText('별로에요');
    const goodOption = screen.getByText('좋아요');

    fireEvent.click(badOption);
    expect(mockAddAnswer).toHaveBeenCalledWith({ questionId: 1, newAnswer: 1 });

    fireEvent.click(goodOption);
    expect(mockAddAnswer).toHaveBeenCalledWith({ questionId: 1, newAnswer: 3 });
    expect(mockDeleteAnswer).toHaveBeenCalledWith(1);

    expect(badOption.parentElement).toHaveAttribute('data-filled', 'false');
    expect(goodOption.parentElement).toHaveAttribute('data-filled', 'true');
  });
});
