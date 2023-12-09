import FilterForm from '../components/FilterForm';
import CarPreviewList from '../components/CarPreviewList';

const Catalog = () => {
  return (
    <div className="flex flex-col w-full px-[120px] items-center justify-center max-w-[1440px]">
      <FilterForm />
      <CarPreviewList />
    </div>
  );
};

export default Catalog;
