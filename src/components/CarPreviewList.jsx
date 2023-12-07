import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { paginationFilteredDataThunk } from '../redux/cars/operations';
import { useModal } from '../hooks/useModal';
import Modal from './Modal';
import CarCard from './CarCard';
import {
  selectAllCars,
  selectFavorites,
  selectFilter,
  selectFilteredCars,
  selectIsLoading,
} from '../redux/cars/selectors';
import { removeFromFavorites, addToFavorites } from '../redux/cars/slice';
import { useLocation } from 'react-router-dom';

const CarPreviewList = () => {
  const location = useLocation();
  const [newFavoritesList, setNewFavoritesList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [carDetails, setCarDetails] = useState('');
  const { isOpen, closeModal, openModal } = useModal();
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);
  const filteredCarsList = useSelector(selectFilteredCars);
  const isLoading = useSelector(selectIsLoading);
  const favorites = useSelector(selectFavorites);
  const carsForFiltration = useSelector(selectAllCars);

  useEffect(() => {
    if (!filteredCarsList || filteredCarsList.length === 0) {
      dispatch(
        paginationFilteredDataThunk({
          carBrand: filter.carBrand,
          currentPage,
        })
      );
    }
  }, [dispatch, filter.carBrand, filteredCarsList, currentPage]);

  useEffect(() => {
    if (currentPage > 1) {
      dispatch(
        paginationFilteredDataThunk({
          carBrand: filter.carBrand,
          currentPage: currentPage,
        })
      );
    }
  }, [dispatch, currentPage, filter.carBrand]);

  const handleChooseCar = id => {
    setCarDetails(id);
    openModal();
  };

  const handleFavoriteClick = carId => {
    if (favorites.includes(carId)) {
      dispatch(removeFromFavorites(carId));
    } else {
      dispatch(addToFavorites(carId));
    }
  };

  const handleLoadMoreCkick = () => {
    setCurrentPage(prev => prev + 1);
  };

  useEffect(() => {
    if (location.pathname === '/favorites') {
      const filteredFavorites = carsForFiltration.filter(item =>
        favorites.includes(item.id)
      );

      setNewFavoritesList(filteredFavorites);
    }
  }, [dispatch, location.pathname, carsForFiltration, favorites]);

  const displayCars =
    location.pathname === '/catalog' ? filteredCarsList : newFavoritesList;

  return (
    <>
      <ul>
        {displayCars?.map(car => (
          <li key={car.id}>
            <button onClick={() => handleFavoriteClick(car.id)}>
              {favorites.includes(car.id)
                ? 'Remove from Favorites'
                : 'Add to Favorites'}
            </button>
            <div>
              <img
                src={
                  car.img
                    ? `${car.img}`
                    : `https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-1.jpg`
                }
                alt={car.make}
              />
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
      <button onClick={handleLoadMoreCkick} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Load More'}
      </button>
      {isOpen ? (
        <Modal closeModal={closeModal}>
          <CarCard closeModal={closeModal} carId={carDetails} />
        </Modal>
      ) : null}
    </>
  );
};

export default CarPreviewList;
