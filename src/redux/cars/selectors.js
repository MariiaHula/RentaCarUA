export const selectAllCars = state => state.cars.cars.allCars;
export const selectFilteredCars = state => state.cars.cars.filteredCars;

export const selectIsLoading = state => state.cars.cars.isLoading;
export const selectErrors = state => state.cars.cars.errors;

export const selectFavorites = state => state.cars.favorites;
export const selectOneCar = state => state.cars.oneCar;

export const selectFilter = state => state.filter.filter;
