import { createSlice } from '@reduxjs/toolkit';

export const toInt = stringValue => {
  let intValue = 0;
  if (Number(stringValue)) {
    intValue = parseInt(stringValue);
  }
  return intValue;
};

const initialState = {
  filter: {
    carBrand: '',
    priceOneOur: '',
    from: 0,
    to: 0,
  },
};

const slice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCarBrand: (state, { payload }) => {
      state.filter.carBrand = payload;
    },
    setPriceOneOur: (state, { payload }) => {
      state.filter.priceOneOur = payload;
    },
    setFrom: (state, { payload }) => {
      state.filter.from = toInt(payload);
    },
    setTo: (state, { payload }) => {
      state.filter.to = toInt(payload);
    },
  },
});

export const { setCarBrand, setPriceOneOur, setFrom, setTo } = slice.actions;
export const filterReducer = slice.reducer;
