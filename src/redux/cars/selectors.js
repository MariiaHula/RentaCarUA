import { createSelector } from '@reduxjs/toolkit';

export const selectAllCars = state => state.cars.cars.allCars;
export const selectFilteredCars = state => state.cars.cars.filteredCars;

export const selectIsLoading = state => state.cars.cars.isLoading;
export const selectErrors = state => state.cars.cars.errors;

export const selectFavorites = state => state.cars.favorites;
export const selectOneCar = state => state.cars.oneCar;

export const selectFilter = state => state.filter.filter;

export const selectFilteredByAllParams = createSelector(
  [selectAllCars, selectFilter],
  (cars, filter) => {
    if (Object.keys(filter).length === 0 && filter.constructor === Object) {
      return cars;
    } else {
      return cars.filter(car => {
        const mileageInRange =
          (car.mileage >= filter.from || filter.from === 0) &&
          (car.mileage <= filter.to || filter.to === 0);

        console.log(filter.from);
        console.log(filter.to);
        console.log(mileageInRange);
        const rentalPriceValid =
          !filter.priceOneOur ||
          parseFloat(car.rentalPrice.replace('$', '')) <= filter.priceOneOur;

        const carBrandMatches =
          !filter.carBrand || car.make === filter.carBrand;

        return mileageInRange && rentalPriceValid && carBrandMatches;
      });
    }
  }
);
