import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCarByIdThunk } from '../redux/cars/operations';
import { selectOneCar } from '../redux/cars/selectors';
import Close from '../assests/svg/close.svg?react';
import Line from '../assests/svg/line.svg?react';

const CarCard = ({ closeModal, carId }) => {
  const [height, setHeight] = useState(window.innerHeight);
  const dispatch = useDispatch();
  const car = useSelector(selectOneCar);

  useEffect(() => {
    if (carId) {
      dispatch(fetchCarByIdThunk(carId));
    }
  }, [dispatch, carId]);

  useEffect(() => {
    const handleResize = () => {
      setHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      {!car ? (
        <p>Loading...</p>
      ) : (
        <div
          className={`bg-[#ffffff] flex flex-col max-w-[541px] p-[36px] rounded-[14px] relative select ${
            height < 752
              ? 'overflow-y-auto max-h-[600px]'
              : 'overflow-hidden max-h-[752px]'
          } `}
        >
          <div className="">
            <button
              className="absolute w-[24px] h-[24px] top-[16px] right-[16px]"
              onClick={closeModal}
            >
              <Close />
            </button>
            <div className="flex items-center justify-center max-w-[460px] max-h-[248px] rounded-[14px] overflow-hidden mb-[14px]">
              <img
                className="max-w-full max-h-full object-cover"
                src={
                  car.img
                    ? `${car.img}`
                    : `https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-1.jpg`
                }
                alt={car.make}
              />
            </div>

            <div className="flex flex-col max-w-[461px] items-start gap-[14px] ">
              <div className="flex flex-col w-[277px] h-[72px] items-start gap-[8px] ">
                <p className=" w-fit mt-[-1.00px] [font-family:'Manrope-Medium',Helvetica] font-medium text-transparent text-[18px] tracking-[0] leading-[24px] whitespace-nowrap">
                  <span className="text-[#121417]"> {car.make} </span>
                  <span className="text-[#3470ff]">{car.model}</span>
                  <span className="text-[#121417]">, {car.year}</span>
                </p>
                <div className="flex flex-col w-[277px] h-[40px] items-start gap-[4px] ">
                  <div className="inline-flex items-center justify-center gap-[6px]  flex-[0_0_auto]">
                    <div className=" w-fit mt-[-1.00px] [font-family:'Manrope-Regular',Helvetica] font-normal text-[#12141780] text-[12px] tracking-[0] leading-[18px] whitespace-nowrap">
                      {car.address.split(',')[1].trim()}
                    </div>
                    <Line />
                    <div className=" w-fit mt-[-1.00px] [font-family:'Manrope-Regular',Helvetica] font-normal text-[#12141780] text-[12px] tracking-[0] leading-[18px] whitespace-nowrap">
                      Ukraine
                    </div>
                    <Line />

                    <div className=" w-fit mt-[-1.00px] [font-family:'Manrope-Regular',Helvetica] font-normal text-[#12141780] text-[12px] tracking-[0] leading-[18px] whitespace-nowrap">
                      Id: {carId}
                    </div>
                    <Line />
                    <div className=" w-fit mt-[-1.00px] [font-family:'Manrope-Regular',Helvetica] font-normal text-[#12141780] text-[12px] tracking-[0] leading-[18px] whitespace-nowrap">
                      Year: {car.year}
                    </div>
                    <Line />
                    <div className=" w-fit mt-[-1.00px] [font-family:'Manrope-Regular',Helvetica] font-normal text-[#12141780] text-[12px] tracking-[0] leading-[18px] whitespace-nowrap">
                      Type: {car.type}
                    </div>
                  </div>
                  <div className="inline-flex items-center justify-center gap-[6px]  flex-[0_0_auto]">
                    <div className=" w-fit mt-[-1.00px] [font-family:'Manrope-Regular',Helvetica] font-normal text-[#12141780] text-[12px] tracking-[0] leading-[18px] whitespace-nowrap">
                      Fuel Consumption: {car.fuelConsumption}
                    </div>
                    <Line />
                    <div className="flex w-[110px] items-baseline gap-[6px] ">
                      <div className=" w-fit mt-[-1.00px] [font-family:'Manrope-Regular',Helvetica] font-normal text-[#12141780] text-[12px] tracking-[0] leading-[18px] whitespace-nowrap">
                        Engine Size: {car.engineSize}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <p className=" w-[461px] [font-family:'Manrope-Regular',Helvetica] font-normal text-[#121417] text-[14px] tracking-[0] leading-[20px] mb-[24px]">
                {car.description}
              </p>
            </div>
            <div className="flex flex-col max-w-[461px] items-start gap-[8px] mb-[24px]">
              <div className="w-fit mt-[-1.00px] [font-family:'Manrope-Medium',Helvetica] font-medium text-[#121417] text-[14px] tracking-[0] leading-[20px] whitespace-nowrap">
                Accessories and functionalities:
              </div>
              <div className=" gap-[4px] flex flex-col w-[461px] items-start">
                <ul className="flex flex-wrap items-center gap-[6px]">
                  {car.accessories.map((item, index) => (
                    <li key={index} className="flex items-center gap-[6px]">
                      <div className="w-fit mt-[-1.00px] [font-family:'Manrope-Regular',Helvetica] font-normal text-[#12141780] text-[12px] tracking-[0] leading-[18px] whitespace-nowrap">
                        {item}
                      </div>
                      {index !== car.accessories.length - 1 && <Line />}
                    </li>
                  ))}
                </ul>
                <ul className="flex flex-wrap items-center gap-[6px]">
                  {car.functionalities.map((item, index) => (
                    <li key={index} className="flex items-center gap-[6px]">
                      <div className="w-fit mt-[-1.00px] [font-family:'Manrope-Regular',Helvetica] font-normal text-[#12141780] text-[12px] tracking-[0] leading-[18px] whitespace-nowrap">
                        {item}
                      </div>
                      {index !== car.functionalities.length - 1 && <Line />}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex flex-col w-[461px] h-[100px] items-start gap-[8px] mb-[24px]">
              <div className=" w-fit mt-[-1.00px] [font-family:'Manrope-Medium',Helvetica] font-medium text-[#121417] text-[14px] tracking-[0] leading-[20px] whitespace-nowrap">
                Rental Conditions:
              </div>
              <div className=" h-[72px] gap-[8px] flex flex-col w-[461px] items-start  ">
                <ul className="h-[72px] gap-[8px] flex w-[361px] items-start  flex-wrap ">
                  {car.rentalConditions.split('\n').map((condition, index) => {
                    if (condition.includes(':')) {
                      const [title, value] = condition.split(': ');
                      return (
                        <li
                          key={index}
                          className="flex  h-[32px] items-start gap-[8px] "
                        >
                          <div className="inline-flex items-center justify-center gap-[8px] px-[14px] py-[7px]  flex-[0_0_auto] bg-[#f9f9f9] rounded-[35px]">
                            <p className=" w-fit mt-[-1.00px] [font-family:'Montserrat-Regular',Helvetica] font-normal text-transparent text-[12px] tracking-[-0.24px] leading-[18px] whitespace-nowrap">
                              <span className="text-[#363535]">{title}: </span>
                              <span className="[font-family:'Montserrat-SemiBold',Helvetica] font-semibold text-[#3470ff]">
                                {value}
                              </span>
                            </p>
                          </div>
                        </li>
                      );
                    } else {
                      return (
                        <li
                          key={index}
                          className="flex h-[32px] items-start gap-[8px] "
                        >
                          <div className="inline-flex items-center justify-center gap-[10px] px-[14px] py-[7px]  flex-[0_0_auto] bg-[#f9f9f9] rounded-[35px]">
                            <div className=" w-fit mt-[-1.00px] [font-family:'Manrope-Regular',Helvetica] font-normal text-[#363535] text-[12px] tracking-[0] leading-[18px] whitespace-nowrap">
                              {condition}
                            </div>
                          </div>
                        </li>
                      );
                    }
                  })}
                  <li className="inline-flex items-center justify-center gap-[8px] px-[14px] py-[7px]  flex-[0_0_auto] bg-[#f9f9f9] rounded-[35px]">
                    <p className=" w-fit mt-[-1.00px] [font-family:'Montserrat-Regular',Helvetica] font-normal text-transparent text-[12px] tracking-[-0.24px] leading-[18px] whitespace-nowrap">
                      <span className="text-[#363535]">Mileage: </span>
                      <span className="[font-family:'Montserrat-SemiBold',Helvetica] font-semibold text-[#3470ff]">
                        {String(car.mileage).replace(/(\d)(?=\d)/, '$1,')}
                      </span>
                    </p>
                  </li>
                  <li className="inline-flex items-center justify-center gap-[8px] px-[14px] py-[7px]  flex-[0_0_auto] mr-[-94.00px] bg-[#f9f9f9] rounded-[35px]">
                    <p className=" w-fit mt-[-1.00px] [font-family:'Montserrat-Regular',Helvetica] font-normal text-transparent text-[12px] tracking-[-0.24px] leading-[18px] whitespace-nowrap">
                      <span className="text-[#363535]">Price: </span>
                      <span className="[font-family:'Montserrat-SemiBold',Helvetica] font-semibold text-[#3470ff]">
                        {car.rentalPrice}
                      </span>
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="max-w-[168px]">
            <a
              href="tel:+380730000000"
              className="inline-block items-center justify-center px-[50px] py-[12px] bg-[#3470ff] rounded-[12px] text-white text-[14px] font-semibold tracking-[0] leading-[20px] whitespace-nowrap"
            >
              <span className="font-semibold text-white text-[14px] tracking-[0] leading-[20px] whitespace-nowrap">
                Rental car
              </span>
            </a>
          </div>
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
