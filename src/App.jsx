import React, { useEffect } from 'react';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Favorites from './pages/Favorites';
import { useDispatch } from 'react-redux';
import { fetchDataThunk } from './redux/cars/operations';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="catalog" element={<Catalog />} />
      <Route path="favorites" element={<Favorites />} />
      <Route path="*" element={<Home />} />
    </Route>
  )
);

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchDataThunk());
  }, [dispatch]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
