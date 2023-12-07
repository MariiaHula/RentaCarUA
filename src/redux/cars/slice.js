import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  fetchCarByIdThunk,
  fetchDataThunk,
  paginationFilteredDataThunk,
} from './operations';

const initialState = {
  cars: {
    allCars: [],
    filteredCars: [],
  },
  favorites: [],
  oneCar: null,
  isLoading: false,
  errors: null,
};

const slice = createSlice({
  name: 'cars',
  initialState,
  reducers: {
    addToFavorites: (state, { payload }) => {
      const carId = payload;
      if (!state.favorites.includes(carId)) {
        state.favorites.push(carId);
      }
    },
    removeFromFavorites: (state, { payload }) => {
      const carId = payload;
      state.favorites = state.favorites.filter(id => id !== carId);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchDataThunk.fulfilled, (state, { payload }) => {
        state.cars.allCars = payload;
      })
      .addCase(paginationFilteredDataThunk.fulfilled, (state, { payload }) => {
        state.cars.filteredCars = [...state.cars.filteredCars, ...payload];
      })
      .addCase(fetchCarByIdThunk.fulfilled, (state, { payload }) => {
        state.oneCar = payload;
      })
      .addMatcher(
        isAnyOf(
          fetchDataThunk.pending,
          fetchCarByIdThunk.pending,
          paginationFilteredDataThunk.pending
        ),
        state => {
          state.isLoading = true;
          state.errors = null;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchDataThunk.rejected,
          fetchCarByIdThunk.rejected,
          paginationFilteredDataThunk.rejected
        ),
        (state, { payload }) => {
          state.isLoading = false;
          state.errors = payload;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchDataThunk.fulfilled,
          fetchCarByIdThunk.fulfilled,
          paginationFilteredDataThunk.fulfilled
        ),
        state => {
          state.isLoading = false;
          state.errors = null;
        }
      );
  },
});

export const { addToFavorites, removeFromFavorites } = slice.actions;
export const carsReducer = slice.reducer;
