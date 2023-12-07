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
    isLoading: false,
    errors: null,
  },
  favorites: [],
  oneCar: null,
};

const slice = createSlice({
  name: 'cars',
  initialState,
  // reducers: {
  //   favoritesCars: (state, { payload }) => {
  //     state.cars.favorites = payload.id;
  //   },
  // },
  extraReducers: builder => {
    builder
      .addCase(fetchDataThunk.fulfilled, (state, { payload }) => {
        state.cars.allCars = payload;
      })
      .addCase(paginationFilteredDataThunk.fulfilled, (state, { payload }) => {
        state.cars.filteredCars = payload;
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
          state.cars.isLoading = true;
          state.cars.errors = null;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchDataThunk.rejected,
          fetchCarByIdThunk.rejected,
          paginationFilteredDataThunk.rejected
        ),
        (state, { payload }) => {
          state.cars.isLoading = false;
          state.cars.errors = payload;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchDataThunk.fulfilled,
          fetchCarByIdThunk.fulfilled,
          paginationFilteredDataThunk.fulfilled
        ),
        state => {
          state.cars.isLoading = false;
          state.cars.errors = null;
        }
      );
  },
});

export const { favoritesCars } = slice.actions;
export const carsReducer = slice.reducer;
