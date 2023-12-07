import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  setCarBrand,
  setFrom,
  setPriceOneOur,
  setTo,
} from '../redux/filter/slice';
import { fetchDataThunk } from '../redux/cars/operations';
import { selectAllCars } from '../redux/cars/selectors';

const FilterForm = () => {
  const [selectedCar, setSelectedCar] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');
  const [fromValue, setFromValue] = useState('');
  const [toValue, setToValue] = useState('');
  const dispatch = useDispatch();
  const cars = useSelector(selectAllCars);

  const makeArray = Array.from(new Set(cars.map(car => car.make)));
  const priceArray = Array.from(new Set(cars.map(car => car.rentalPrice)));

  useEffect(() => {
    dispatch(fetchDataThunk());
  }, [dispatch]);

  const handleCarChange = e => {
    setSelectedCar(e.target.value);
  };

  const handlePriceChange = e => {
    setSelectedPrice(e.target.value);
  };

  const handleFromChange = e => {
    setFromValue(e.target.value);
  };

  const handleToChange = e => {
    setToValue(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(setCarBrand(selectedCar));
    dispatch(setPriceOneOur(selectedPrice));
    dispatch(setFrom(fromValue));
    dispatch(setTo(toValue));
    reset();
  };

  const reset = () => {
    setSelectedCar('');
    setSelectedPrice('');
    setFromValue('');
    setToValue('');
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="cars">Car brand:</label>
          <select
            name="cars"
            id="cars"
            value={selectedCar}
            onChange={handleCarChange}
          >
            {makeArray?.map((make, index) => (
              <option key={index}>{make}</option>
            ))}
          </select>
          <label htmlFor="price">Price/ 1 hour:</label>
          <select
            name="price"
            id="price"
            value={selectedPrice}
            onChange={handlePriceChange}
          >
            {priceArray?.map((price, index) => (
              <option key={index}>{price}</option>
            ))}
          </select>

          <label htmlFor="from">From:</label>
          <input
            type="number"
            name="from"
            id="from"
            value={fromValue}
            onChange={handleFromChange}
            placeholder="From"
            autoComplete="off"
          />
          <label htmlFor="to">To:</label>
          <input
            type="number"
            name="to"
            id="to"
            value={toValue}
            onChange={handleToChange}
            placeholder="To"
            autoComplete="off"
          />
          <button type="submit">Search</button>
        </form>
      </div>
    </>
  );
};

export default FilterForm;
