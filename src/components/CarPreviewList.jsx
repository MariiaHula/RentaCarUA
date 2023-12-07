import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { paginationFilteredDataThunk } from '../redux/cars/operations';
import { useModal } from '../hooks/useModal';
import Modal from './Modal';
import CarCard from './CarCard';
import { selectFilter, selectFilteredCars } from '../redux/cars/selectors';

const CarPreviewList = () => {
  const [carDetails, setCarDetails] = useState('');
  const { isOpen, closeModal, openModal } = useModal();
  const filter = useSelector(selectFilter);
  const filteredCarsList = useSelector(selectFilteredCars);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(paginationFilteredDataThunk(filter.carBrand));
  }, [dispatch, filter]);

  const handleChooseCar = id => {
    setCarDetails(id);
    openModal();
  };

  return (
    <>
      <ul>
        {filteredCarsList?.map(car => (
          <li key={car.id}>
            <div>
              <img src={car.img} alt={car.make} />
              <h1>
                {car.make}
                {car.model}, {car.year}
              </h1>
              <h1>{car.rentalPrice}</h1>
            </div>
            <div>
              <p>{car.address}</p>
              <p>Ukraine</p>
              <p>{car.rentalCompany}</p>
              <p>{car.type}</p>
              <p>{car.make}</p>
              <p>{car.id}</p>
              <p>{car.accessories[0]}</p>
            </div>
            <button type="button" onClick={() => handleChooseCar(car.id)}>
              Learn More
            </button>
          </li>
        ))}
      </ul>
      {isOpen ? (
        <Modal closeModal={closeModal}>
          <CarCard closeModal={closeModal} carId={carDetails} />
        </Modal>
      ) : null}
    </>
  );
};

export default CarPreviewList;
