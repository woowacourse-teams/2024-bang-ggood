import { useState } from 'react';

import mockCategories from '@/_mock/checklist.json';
import ChecklistCategory from '@/components/checklist/ChecklistCategory';

interface AccordianOpen {
  categoryId: number;
  isOpen: boolean;
}

export const AccordianPage = () => {
  const categories: ChecklistCategory[] = mockCategories;

  const [accordianOpen, setAccordianOpen] = useState<AccordianOpen[]>(
    categories.map(category => ({
      categoryId: category.categoryId,
      isOpen: true,
    })),
  );

  const onToggleCategoryOpen = (id: number) => {
    const newAccordianOpen = accordianOpen.map(category => {
      return category.categoryId === id ? { ...category, isOpen: !category.isOpen } : category;
    });

    setAccordianOpen(newAccordianOpen);
  };

  const isAccordianOpen = (id: number) => {
    const target = accordianOpen.filter(category => category.categoryId === id);
    return target[0].isOpen;
  };

  return (
    <div>
      {categories.map(category => (
        <ChecklistCategory
          key={category.categoryId}
          category={category}
          toggleOpen={() => {
            onToggleCategoryOpen(category.categoryId);
          }}
          isAccordianOpen={isAccordianOpen(category.categoryId)}
        />
      ))}
    </div>
  );
};
