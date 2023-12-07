import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCarByIdThunk } from '../redux/cars/operations';
import { selectOneCar } from '../redux/cars/selectors';

const CarCard = ({ closeModal, carId }) => {
  const dispatch = useDispatch();
  const car = useSelector(selectOneCar);

  useEffect(() => {
    if (carId) {
      dispatch(fetchCarByIdThunk(carId));
    }
  }, [dispatch, carId]);

  return (
    <>
      {!car ? (
        <p>Loading...</p>
      ) : (
        <div>
          <button onClick={closeModal}>Close</button>
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
              {car.make} {car.model}, {car.year}
            </h1>
          </div>
          <div>
            <p>{car.address}</p>
            <p>Ukraine</p>
            <p>ID: {carId}</p>
            <p>Year: {car.year}</p>
            <p>Type: {car.type}</p>
            <p>Fuel Consumption: {car.fuelConsumption}</p>
            <p>Engine size: {car.engineSize}</p>
          </div>
          <h2>Description:</h2>
          <p>{car.description}</p>
          <h2>Accessories and functionalities:</h2>
          <ul>
            {car.accessories.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <ul>
            {car.functionalities.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <h2>Rental Conditions:</h2>
          <ul>
            {car.rentalConditions.split('\n').map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <p>Mileage: {car.mileage}</p>
          <p>Price: {car.rentalPrice}</p>

          <a href="+380730000000">Rental car</a>
        </div>
      )}
    </>
  );
};

export default CarCard;

CarCard.propTypes = {
  carId: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};
