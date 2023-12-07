import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filter: {
    carBrand: '',
    priceOneOur: '',
    from: null,
    to: null,
  },
};

const slice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCarBrand: (state, { payload }) => {
      console.log(payload);
      state.filter.carBrand = payload;
    },
    setPriceOneOur: (state, { payload }) => {
      console.log(payload);
      state.filter.priceOneOur = payload;
    },
    setFrom: (state, { payload }) => {
      console.log(payload);
      state.filter.from = payload;
    },
    setTo: (state, { payload }) => {
      console.log(payload);
      state.filter.to = payload;
    },
  },
});

export const { setCarBrand, setPriceOneOur, setFrom, setTo } = slice.actions;
export const filterReducer = slice.reducer;
