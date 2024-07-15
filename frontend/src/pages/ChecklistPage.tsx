import mockCategories from '@/_mock/checklist.json';
import ChecklistCategory from '@/components/checklist/ChecklistCategory';
import FaceIcon from '@/components/FaceMark/FaceIcon';
import FaceIconButton from '@/components/FaceMark/FaceIconButton';
import Header from '@/components/Header';
import Tab from '@/components/Tab';

const ChecklistPage = () => {
  const categories: ChecklistCategory[] = mockCategories;
  return (
    <>
      <Header />
      <Tab />
      {categories.map(category => (
        <ChecklistCategory key={category.categoryId} category={category} />
      ))}

      <FaceIcon fill={true} emotion="bad" />
      <FaceIconButton emotion="bad" />
      {/* <FaceMark>
/      <FaceMark.Header >
      <FaceMark.Icon>
      <FaceMark.Footer>
      </FaceMark> 
      */}
    </>
  );
};

export default ChecklistPage;
