import React from 'react';
import FilterForm from '../components/FilterForm';
import CarPreviewList from '../components/CarPreviewList';
const Favorites = () => {
  return (
    <div>
      <FilterForm />
      <CarPreviewList />
    </div>
  );
};

export default Favorites;
