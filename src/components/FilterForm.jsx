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

import Arrow from '../assests/svg/arrow.svg?react';

const FilterForm = () => {
  const [selectedCar, setSelectedCar] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');
  const [isFromSpanVisible, setIsFromSpanVisible] = useState(true);
  const [isToSpanVisible, setIsToSpanVisible] = useState(true);
  const [fromValue, setFromValue] = useState('');
  const [toValue, setToValue] = useState('');
  const [isArrowRotatedCar, setIsArrowRotatedCar] = useState(false);
  const [isArrowRotatedTo, setIsArrowRotatedTo] = useState(false);

  const dispatch = useDispatch();
  const cars = useSelector(selectAllCars);

  const makeArray = Array.from(new Set(cars.map(car => car.make)));
  const prices = cars
    .map(car => parseFloat(car.rentalPrice.replace('$', '')))
    .filter(price => !isNaN(price));
  const priceArray = Array.from(new Set(prices)).sort((a, b) => a - b);

  useEffect(() => {
    dispatch(fetchDataThunk());
  }, [dispatch]);

  const handleCarChange = selected => {
    setSelectedCar(selected);
    setIsArrowRotatedCar(false);
  };

  const handlePriceChange = selected => {
    setSelectedPrice(selected);
    setIsArrowRotatedTo(false);
  };

  const handleFromChange = e => {
    const value = e.target.value;
    if (parseInt(value) >= 0) {
      setFromValue(parseInt(value));
    }
  };

  const handleToChange = e => {
    const value = e.target.value;
    if (parseInt(value) >= 0 || value >= parseInt(fromValue)) {
      setToValue(parseInt(value));
    }
  };

  const handleSubmit = e => {
    setIsFromSpanVisible(true);
    setIsToSpanVisible(true);
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
      <div className="flex justify-center items-center h-full mb-[50px]">
        <form onSubmit={handleSubmit} className=" mt-16 flex">
          <div className="flex items-end gap-[18px]">
            <div className="brand gap-2 flex-col items-start p-0 flex">
              <span className="relative text-sm font-medium text-[#8a8a89] [font-family:'Manrope-Regular',Helvetica] text-left leading-[18px]">
                Car brand
              </span>
              <div className="relative">
                <div className="relative">
                  <div
                    className="gap-8 flex-row w-[224px] h-[48px] items-start bg-[#f7f7fb] px-[18px] py-3.5 rounded-[14px] flex [font-family:'Manrope-Medium',Helvetica] text-[#121417] text-[18px] "
                    onClick={() => setIsArrowRotatedCar(!isArrowRotatedCar)}
                  >
                    {selectedCar ? selectedCar : 'Enter the text'}
                    <span
                      className={`absolute right-[18px] top-[12px] ${
                        isArrowRotatedCar ? 'rotate-180' : ''
                      }`}
                    >
                      <Arrow className="w-[24px] h-[24px]" />
                    </span>
                  </div>
                  {isArrowRotatedCar && (
                    <ul className="z-10 select overflow-y-auto overflow-x-hidden absolute px-[18px] py-[14px] bg-white w-[224px] max-h-[272px] rounded-[14px] overflow-hidden border border-solid border-[#1214170d]">
                      {makeArray?.map((make, index) => (
                        <li
                          key={index}
                          onClick={() => handleCarChange(make)}
                          className="[font-family:'Manrope-Medium',Helvetica] text-[16px] text-[#12141733] "
                        >
                          {make}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
            <div className="brand gap-2 flex-col items-start p-0 flex">
              <span className="price1Hour text-sm font-medium text-[#8a8a89] text-left leading-[18px] [font-family:'Manrope-Regular',Helvetica]">
                Price/ 1 hour
              </span>
              <div className="relative">
                <div className="select-container">
                  <div
                    className="gap-8 flex-row flex-nowrap w-[125px] h-[48px] items-start bg-[#f7f7fb] px-[18px] py-3.5 rounded-[14px] flex [font-family:'Manrope-Medium',Helvetica] text-[#121417] text-[18px] "
                    onClick={() => setIsArrowRotatedTo(!isArrowRotatedTo)}
                  >
                    {selectedPrice ? selectedPrice : 'To $'}
                    <span
                      className={`absolute right-[18px] top-[12px] ${
                        isArrowRotatedTo ? 'rotate-180' : ''
                      }`}
                    >
                      <Arrow className="w-[24px] h-[24px]" />
                    </span>
                  </div>
                  {isArrowRotatedTo && (
                    <ul className="z-10 select overflow-y-auto overflow-x-hidden absolute px-[18px] py-[14px] bg-white w-[125px] max-h-[188px] rounded-[14px] overflow-hidden border border-solid border-[#1214170d]">
                      {priceArray?.map((price, index) => (
                        <li
                          key={index}
                          onClick={() => handlePriceChange(price)}
                          className="[font-family:'Manrope-Medium',Helvetica] text-[16px] text-[#12141733] "
                        >
                          {price}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
            <div className=" gap-2 flex-col items-start p-0 flex">
              <label
                htmlFor="mileage"
                className="price1Hour text-sm font-medium text-[#8a8a89] [font-family:'Manrope-Regular',Helvetica] text-left leading-[18px]"
              >
                Сar mileage / km
              </label>
              <div className="flex flex-row relative">
                <input
                  className=" gap-8 flex-row max-w-[160px] h-[48px] items-start bg-[#f7f7fb] px-[18px] py-3.5 rounded-l-[14px] flex border-r-[1px]"
                  name="from"
                  id="mileage"
                  value={fromValue}
                  onChange={handleFromChange}
                  autoComplete="off"
                  type="text"
                  onFocus={() => setIsFromSpanVisible(false)}
                  onBlur={() => setIsFromSpanVisible(!fromValue)}
                />
                {isFromSpanVisible && (
                  <span className="left-[24px] top-[12px] absolute [font-family:'Manrope-Medium',Helvetica] text-[#121417] text-[18px] ">
                    From
                  </span>
                )}
                <input
                  className="gap-8 flex-row max-w-[160px] h-[48px] items-start bg-[#f7f7fb]  px-[18px] py-3.5 rounded-r-[14px] flex"
                  name="to"
                  value={toValue}
                  onChange={handleToChange}
                  autoComplete="off"
                  type="text"
                  onFocus={() => setIsToSpanVisible(false)}
                  onBlur={() => setIsToSpanVisible(!toValue)}
                />
                {isToSpanVisible && (
                  <span className="right-[115px] top-[12px] absolute [font-family:'Manrope-Medium',Helvetica] text-[#121417] text-[18px] ">
                    To
                  </span>
                )}
              </div>
            </div>
            <button
              type="submit"
              className="gap-0 flex-row justify-center items-center h-[48px] bg-[#3470ff] px-11 py-3.5 rounded-xl flex "
            >
              <div className="w-fit mt-[-1,00px] text-white text-[14px] tracking-[0] leading-5 [font-family:'Manrope-SemiBold', Helvetica] whitespace-nowrap">
                Search
              </div>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default FilterForm;
