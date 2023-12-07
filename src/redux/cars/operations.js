// import { createAsyncThunk } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import instance from 'axios';

const axios = instance.create({
  baseURL: 'https://657082ff09586eff66418808.mockapi.io/',
});

export const fetchDataThunk = createAsyncThunk(
  'fetchAll',
  async (_, thunkApi) => {
    try {
      const { data } = await axios.get('advert');
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const paginationFilteredDataThunk = createAsyncThunk(
  'paginationFilteredData',
  async (carBrand, thunkApi) => {
    try {
      if (carBrand) {
        const { data } = await axios.get('advert', {
          params: {
            make: carBrand,
            page: 1,
            limit: 12,
          },
        });
        return data;
      } else {
        const { data } = await axios.get('advert', {
          params: {
            page: 1,
            limit: 12,
          },
        });
        return data;
      }
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const fetchCarByIdThunk = createAsyncThunk(
  'fetchOneCarById',
  async (id, thunkApi) => {
    try {
      const { data } = await axios.get(`advert/${id}`);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
