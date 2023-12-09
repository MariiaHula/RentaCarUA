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
  selectFilteredByAllParams,
  selectFilteredCars,
  selectIsLoading,
} from '../redux/cars/selectors';
import { removeFromFavorites, addToFavorites } from '../redux/cars/slice';
import { useLocation } from 'react-router-dom';
import Line from '../assests/svg/line.svg?react';

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
  const allCarsData = useSelector(selectFilteredByAllParams);

  const { carBrand, priceOneOur, from, to } = filter;

  useEffect(() => {
    if (!filteredCarsList || filteredCarsList.length === 0) {
      dispatch(paginationFilteredDataThunk({ currentPage }));
    }
  }, [dispatch, filteredCarsList, currentPage]);

  useEffect(() => {
    if (currentPage > 1) {
      dispatch(paginationFilteredDataThunk({ currentPage }));
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
      {allCarsData.length === 0 ? (
        <p>Sorry, no matches</p>
      ) : (
        <>
          <ul className="grid-rows-4 flex flex-wrap gap-[30px]">
            {(carBrand || priceOneOur || from || to
              ? allCarsData
              : displayCars
            )?.map(car => (
              <li
                className="bg-[#ffffff] flex flex-col justify-center w-[274px] h-[426px] rounded-[14px] relative"
                key={car.id}
              >
                <button onClick={() => handleFavoriteClick(car.id)}>
                  {favorites.includes(car.id)
                    ? 'Remove from Favorites'
                    : 'Add to Favorites'}
                </button>
                <div className="flex items-center justify-center w-[274px] h-[274px] rounded-[14px] overflow-hidden mb-[14px] mr-0 ml-0">
                  <img
                    className="w-full h-full object-cover m-0"
                    src={
                      car.img
                        ? `${car.img}`
                        : 'https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-1.jpg'
                    }
                    alt={car.make}
                  />
                </div>
                <div className="flex flex-col max-w-[461px] items-center">
                  <div className="flex items-between justify-between w-full  mb-[8px]">
                    <p className="w-fit mt-[-1.00px] [font-family:'Manrope-Medium',Helvetica] font-medium text-transparent text-[18px] tracking-[0] leading-[24px] whitespace-nowrap">
                      <span className="text-[#121417]"> {car.make} </span>
                      <span className="text-[#3470ff]">{car.model}</span>
                      <span className="text-[#121417]">, {car.year}</span>
                    </p>
                    <p className=" w-fit mt-[-1.00px] [font-family:'Manrope-Medium',Helvetica] font-medium text-transparent text-[18px] tracking-[0] leading-[24px] whitespace-nowrap]">
                      <span className="text-[#121417] mr-[14px]">
                        {car.rentalPrice}
                      </span>
                    </p>
                  </div>
                  <div className="flex flex-col w-[277px] h-[40px] items-start gap-[4px]  mb-[28px]">
                    <div className="inline-flex items-center justify-center gap-[6px]  flex-[0_0_auto]">
                      <div className="w-fit mt-[-1.00px] [font-family:'Manrope-Regular',Helvetica] font-normal text-[#12141780] text-[12px] tracking-[0] leading-[18px] whitespace-nowrap">
                        {car.address.split(',')[1].trim()}
                      </div>
                      <Line />
                      <div className="w-fit mt-[-1.00px] [font-family:'Manrope-Regular',Helvetica] font-normal text-[#12141780] text-[12px] tracking-[0] leading-[18px] whitespace-nowrap">
                        Ukraine
                      </div>
                      <Line />
                      <div className="w-fit mt-[-1.00px] [font-family:'Manrope-Regular',Helvetica] font-normal text-[#12141780] text-[12px] tracking-[0] leading-[18px] whitespace-nowrap">
                        {car.rentalCompany}
                      </div>
                      <Line />
                      <div className="w-fit mt-[-1.00px] [font-family:'Manrope-Regular',Helvetica] font-normal text-[#12141780] text-[12px] tracking-[0] leading-[18px] whitespace-nowrap">
                        {car.type}
                      </div>
                      <Line />
                    </div>
                    <div className="inline-flex items-center justify-center gap-[6px]  flex-[0_0_auto]">
                      <div className="w-fit mt-[-1.00px] [font-family:'Manrope-Regular',Helvetica] font-normal text-[#12141780] text-[12px] tracking-[0] leading-[18px] whitespace-nowrap">
                        {car.make}
                      </div>
                      <Line />
                      <div className="inline-flex items-center justify-center gap-[6px]  flex-[0_0_auto]">
                        <div className="w-fit mt-[-1.00px] [font-family:'Manrope-Regular',Helvetica] font-normal text-[#12141780] text-[12px] tracking-[0] leading-[18px] whitespace-nowrap">
                          {car.id}
                        </div>
                        <Line />
                        <div className="flex w-[110px] items-baseline gap-[6px] ">
                          <div className="w-fit mt-[-1.00px] [font-family:'Manrope-Regular',Helvetica] font-normal text-[#12141780] text-[12px] tracking-[0] leading-[18px] whitespace-nowrap">
                            {car.accessories[0]}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleChooseCar(car.id)}
                    className="gap-0 flex-row justify-center items-center h-[40px] bg-[#3470ff] px-11 py-3.5 rounded-xl flex w-full"
                  >
                    <div className="w-fit mt-[-1,00px] text-white text-[14px] tracking-[0] leading-5 [font-family:'Manrope-SemiBold', Helvetica] whitespace-nowrap">
                      Learn More
                    </div>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
      {displayCars.length < displayCars.length - 1 &&
        !carBrand &&
        !priceOneOur &&
        !from &&
        !to && (
          <button onClick={handleLoadMoreCkick} disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Load More'}
          </button>
        )}
      {isOpen && (
        <Modal closeModal={closeModal}>
          <CarCard closeModal={closeModal} carId={carDetails} />
        </Modal>
      )}
    </>
  );
};
export default CarPreviewList;
// <ul>
//   {displayCars?.map(car => (
//     <li key={car.id}>
//       <button onClick={() => handleFavoriteClick(car.id)}>
//         {favorites.includes(car.id)
//           ? 'Remove from Favorites'
//           : 'Add to Favorites'}
//       </button>
//       <div>
//         <img
//           src={
//             car.img
//               ? `${car.img}`
//               : `https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-1.jpg`
//           }
//           alt={car.make}
//         />
//         <h1>
//           {car.make}
//           {car.model}, {car.year}
//         </h1>
//         <h1>{car.rentalPrice}</h1>
//       </div>
//       <div>
//         <p>{car.address}</p>
//         <p>Ukraine</p>
//         <p>{car.rentalCompany}</p>
//         <p>{car.type}</p>
//         <p>{car.make}</p>
//         <p>{car.id}</p>
//         <p>{car.accessories[0]}</p>
//       </div>
//       <button type="button" onClick={() => handleChooseCar(car.id)}>
//         Learn More
//       </button>
//     </li>
//   ))}
// </ul>;
